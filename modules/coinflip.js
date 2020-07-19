const Discord = require("discord.js");

class Coinflip {
	run(bot, message, options) {
        message.channel.send(this.coinflip())
            .catch(console.error);
    }
    
    coinflip() {
        return Math.random() > 0.5 ? "Heads" : "Tails";
    }
}

module.exports = Coinflip;