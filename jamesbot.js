require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();

const eventTypes = require("./core/types").eventTypes;

const modules = [
    require("./modules/fun"),
    require("./modules/gary"),
    require("./modules/userEmbeds"),
    require("./modules/voting"),
    require("./modules/complaints"),
    require("./modules/poll"),
    require("./modules/acHalloweenComp"),
];

const version = "WIP v0.2.0";

const isDevMode = process.env.DEV_ENABLED;
const devServer = process.env.DEV_SERVER;

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
    updateActivity();
});

const updateActivity = () => {
    client.user.setActivity(version);
    console.log("Updated activity!");
    setTimeout(updateActivity, 600000);
};

client.on("message", msg => {
    if (msg.author.bot) {
        // Don't handle messages from bots
        return;
    }

    // Fire off listeners
    for (const idx in modules) {
        if (!modules[idx].listeners) {
            continue; // if this module doesn't have any listeners, just continue.
        }

        for (let i = 0; i < modules[idx].listeners.length; i++) {
            if (modules[idx][modules[idx].listeners[i]].on === eventTypes.CHANNEL_MESSAGE_ADD &&  // Check if the listener type is CHANNEL_MESSAGE_ADD
                modules[idx][modules[idx].listeners[i]].channel === msg.channel.id) {  // Check if the channel id matches
                modules[idx][modules[idx].listeners[i]].process(client, msg);
            }
        }
    }

    if (msg.content.charAt(0) !== "!") {
        // Not a command, skip
        return;
    }

    const command = msg.content.substr(1).split(" ")[0].toLowerCase();
    const options = msg.content.substr(1 + command.length + 1);

    if (command === "help") {
        handleHelpCommand(msg, options);
        return;
    }

    // Fire off commands
    for (const idx in modules) {
        if (!modules[idx].commands) {
            continue; // if this module doesn't have any commands, just continue.
        }
        
        for (let i = 0; i < modules[idx].commands.length; i++) {
            if (modules[idx][modules[idx].commands[i]].aliases.includes(command)) {
                modules[idx][modules[idx].commands[i]].process(client, msg, options);
                console.log(`${msg.author.username}#${msg.author.discriminator} used command ${command} in #${msg.channel.name}`);
                return;
            }
        }
    }
});

client.on("messageReactionAdd", async(reaction, user) => {
    // Don't handle reactions added by bots
    if (user.bot) {
        return;
    }

    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch(error) {
            console.error(error);
            return;
        }
    }

    for (const idx in modules) {
        if (!modules[idx].listeners) {
            continue;
        }

        for (let i = 0; i < modules[idx].listeners.length; i++) {
            if (modules[idx][modules[idx].listeners[i]].on === eventTypes.MESSAGE_REACTION_ADD) {  // Check if the listener type is MESSAGE_REACTION_ADD
                modules[idx][modules[idx].listeners[i]].process(client, reaction, user);
            }
        }
    }
});

const handleHelpCommand = (msg, options) => {
    if (options.length > 0) {
        for (const idx in modules) {
            if (!modules[idx].commands) {
                continue; // if this module doesn't have any commands, just continue.
            }

            for (let i = 0; i < modules[idx].commands.length; i++) {
                if (modules[idx][modules[idx].commands[i]].aliases.includes(options)) {
                    showHelp(msg, modules[idx][modules[idx].commands[i]]);
                    return;
                }
            }
        }

        msg.reply(`The command \`${options}\` wasn't found! Type \`!help\` to see a list of commands.`);
    } else {
        const commands = modules.map(e => e.commands).filter(e => e).flat(Infinity);
        const embed = new Discord.MessageEmbed()
            .setTitle("Here's a list of all the commands:")
            .setColor("#7289DA")
            .setDescription(commands.map(cmd => `${cmd}`).join("\n"));

        msg.channel.send(embed);
    }
};

const showHelp = (msg, command) => {
    const embed = new Discord.MessageEmbed()
        .setTitle(`${command.aliases[0]} command usage`)
        .setColor("#7289DA")
        .setDescription(`\`${command.usage}\`\n\nAliases: ${command.aliases.map(c => `\`${c}\``).join(", ")}`);
    msg.channel.send(embed);
};

client.login(process.env.DISCORD_TOKEN);
