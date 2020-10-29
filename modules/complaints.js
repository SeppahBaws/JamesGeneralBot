exports.commands = [
    "complaints"
];

exports.complaints = {
    description: "Takes care of a specific complaint that you might have",
    usage: "!complaint <complaint>",
    aliases: ["complaint"],
    process: (bot, message, options) => {
        if (message.channel.id !== "616746684868853819") {
            return;
        }

        message.channel.send(`Thank you for your complaint. We care deeply for our community and we take every complaint very seriously.
Your complaint has been received and we are currently processing it.`)
            .then(message.channel.send("https://tenor.com/view/printer-shredder-gif-10519066")
                .catch(console.err))
            .catch(console.err);
    }
};
