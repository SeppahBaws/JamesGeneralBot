const Discord = require("discord.js");

class PickRandom {
    run(bot, message, options) {
        const items = options.split("\"").map(item => item.trim()).filter(item => item !== "");

        message.channel.send(`My choice: ${items[Math.floor(Math.random() * items.length)]}`)
            .catch(console.error);
    }
};

module.exports = PickRandom;