exports.commands = [
    "random"
];

const splitOptions = (options) => {
    return options.split("\"").map(item => item.trim()).filter(item => item !== "");
}

exports.random = {
    description: "Picks one of the provided options",
    usage: "!random \"<option one>\" \"<option two>\" ...",
    aliases: ["random"],
    process: (bot, message, options) => {
        if (options.length <= 0) {
            message.reply(`Usage: \`${this.random.usage}\``);
            return;
        }

        const items = splitOptions(options);
        message.channel.send(`My choice: ${items[Math.floor(Math.random() * items.length)]}`)
            .catch(console.error);
    }
};
