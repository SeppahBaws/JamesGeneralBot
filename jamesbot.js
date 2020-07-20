require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();

const modules = [
    require("./modules/fun"),
    require("./modules/userEmbeds"),
];

const version = "WIP v0.1.0";

const isDevMode = process.env.DEV_ENABLED;
const devServer = process.env.DEV_SERVER;

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity(version);
});

client.on("message", msg => {
    if (msg.author.bot) {
        // Don't handle messages from bots
        return;
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

    for (const idx in modules) {
        for (let i = 0; i < modules[idx].commands.length; i++) {
            if (modules[idx][modules[idx].commands[i]].aliases.includes(command)) {
                modules[idx][modules[idx].commands[i]].process(client, msg, options);
                return;
            }
        }
    }

    if (isDevMode && msg.guild.id === devServer) {
        switch (command)
        {
        // case "random":
        //     PickRandomModule.run(client, msg, options);
        //     break;
        }
    }
});

const handleHelpCommand = (msg, options) => {
    if (options.length > 0) {
        for (const idx in modules) {
            for (let i = 0; i < modules[idx].commands.length; i++) {
                if (modules[idx][modules[idx].commands[i]].aliases.includes(options)) {
                    showHelp(msg, modules[idx][modules[idx].commands[i]]);
                    return;
                }
            }
        }

        msg.reply(`The command \`${options}\` wasn't found! Type \`!help\` to see a list of commands.`);
    } else {
        const commands = modules.map(e => e.commands).flat(Infinity);
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
