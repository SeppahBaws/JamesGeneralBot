const Discord = require("discord.js");

exports.commands = [
    "pickRandom",
    "poll"
];

const splitOptions = (options) => {
    return options.split("\"").map(item => item.trim()).filter(item => item !== "");
}

exports.pickRandom = {
    description: "Picks one of the provided options",
    usage: "!random \"<option one>\" \"<option two>\" ...",
    aliases: ["random"],
    process: (bot, message, options) => {
        if (options.length <= 0) {
            message.reply(`Usage: \`${this.pickRandom.usage}\``);
            return;
        }

        const items = splitOptions(options);
        message.channel.send(`My choice: ${items[Math.floor(Math.random() * items.length)]}`)
            .catch(console.error);
    }
};

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

exports.poll = {
    description: "Start a poll",
    usage: "!poll \"<title>\" \"<option one>\" \"<option two>\"",
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
}