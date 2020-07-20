exports.commands = [
    "coinflip",
    "eightball",
    "mock"
];

exports.coinflip = {
    description: "Flips a coin",
    usage: "!coinflip",
    aliases: ["coinflip"],
    process: (bot, message, options) => {
        message.channel.send(Math.random() > 0.5 ? "Heads" : "Tails")
            .catch(console.err);
    }
};

const eightballOptions = [
    "It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes – definitely.",
    "You may rely on it.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to yes.",
    "Reply hazy, try again.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don't count on it.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Very doubtful."
];

exports.eightball = {
    description: "",
    usage: "!8ball <question>",
    aliases: ["8ball", "eightball"],
    process: (bot, message, options) => {
        message.channel.send(eightballOptions[Math.floor(Math.random() * eightballOptions.length)])
            .catch(console.err);
    }
};

exports.mock = {
    description: "Mock your friends for the stupid stuff they say",
    usage: "!mock <text>",
    aliases: ["mock"],
    process: (bot, message, options) => {
        if (options.length <= 0) {
            message.reply(`Usage: \`${this.mock.usage}\``);
            return;
        }

        const mocked = options.split("").map(x => Math.random() > 0.5 ? x.toLowerCase() : x.toUpperCase()).join("");

        message.channel.send(`${mocked}`)
            .then(message.channel.send("<a:jcMock:651834007171891217>")
                .catch(console.err))
            .catch(console.err);
    }
};
