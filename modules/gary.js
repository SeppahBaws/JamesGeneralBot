exports.commands = [
    "gary"
];

const garys = [
    "<:gary:726177026838626315>",
    "<:garyKink:726793392868163614>",
    "<:alsoGary:726178899394035763>",
    "<:anothergary:726494391308517405>",
    "<:evilgary:726494391690068018>"
];

exports.gary = {
    description: "",
    usage: "!gary",
    aliases: ["gary"],
    process: (bot, message, options) => {
        message.channel.send(garys[Math.floor(Math.random() * garys.length)])
    }
};
