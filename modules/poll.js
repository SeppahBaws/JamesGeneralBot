const Discord = require("discord.js");
const eventTypes = require("../core/types").eventTypes;

exports.commands = [
    "poll"
];

exports.listeners = [
    "pollReactionListener"
];
    
const pollReactions = [
    "1️⃣",
    "2️⃣",
    "3️⃣",
    "4️⃣",
    "5️⃣",
    "6️⃣",
    "7️⃣",
    "8️⃣",
    "9️⃣",
    "🔟"
];

const makePollDescription = (poll) => {
    let description = "";

    // Index 
    let index = 0;
    poll.options.map(option => {
        description += `${pollReactions[index]} ${option}` + "\n\n";
        index++;
    });

    return description;
};

const addReactions = async(poll, amount) => {
    try {
        for (let i = 0; i < amount; i++) {
            await poll.react(pollReactions[i]);
        }
    } catch(error) {
        console.log(error);
    }
};

const splitOptions = (options) => {
    return options.split("\"").map(item => item.trim()).filter(item => item !== "");
}

exports.poll = {
    description: "Start a single choice poll",
    usage: "!poll \"<title>\" \"<option one>\" \"<option two>\" ...",
    aliases: ["poll"],
    process: (bot, message, options) => {
        if (options.length <= 0) {
            message.reply(`Usage: \`${this.poll.usage}\``);
            return;
        }
        
        const elements = splitOptions(options);

        const poll = {
            question: elements[0],
            options: elements.slice(1),
        };

        if (poll.options.length <= 1) {
            message.reply("You need at least two items to have a poll!\nMake sure you request your poll as follows: `!poll \"question\" \"option1\" \"option2\" ...`");
            return;
        }

        if (poll.options.length > 10) {
            message.reply("You can't have more than 10 options, sorry!");
            return;
        }

        console.log(`poll created by ${message.author.username} --`, poll);

        const embed = new Discord.MessageEmbed()
            .setTitle(elements[0])
            .setAuthor(message.author.username)
            .setTimestamp()
            .setDescription(makePollDescription(poll))
            .setColor("#7289DA");

        message.channel.send(embed)
            .then(pollMsg => {
                addReactions(pollMsg, poll.options.length);
            })
            .catch(console.err);
    }
};

exports.pollReactionListener = {
    on: eventTypes.MESSAGE_REACTION_ADD,
    process: (bot, reaction, user) => {
        // Check if the message comes from the bot
        if (bot.user !== reaction.message.author) {
            console.log("Message does not come from JamesBot.");
            return;
        }

        // Check if the message has an embed
        if (reaction.message.embeds.length !== 1) {
            console.log("message does not have *one* embed");
            return;
        }

        // Check if the message has :one: and :two: as reactions
        if (!reaction.message.reactions.cache.has(pollReactions[0]) ||
            !reaction.message.reactions.cache.has(pollReactions[1])) {

            console.log(`message does not have ${pollReactions[0]} or ${pollReactions[1]} as reactions!`);
            return;
        }

        // remove reactions that have not been added by JamesBot
        if (reaction.users.cache.get(bot.user.id)) {
            // JamesBot has also reacted with this, so we can just return here.
            return;
            
        }

        console.log(reaction);

        // TODO: remove this reaction.
        reaction.remove()
            .catch(console.error);
    }
};
