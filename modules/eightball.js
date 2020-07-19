const Discord = require("discord.js");

class EightBall {
    options = [
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
    
    run(bot, message, options) {
        message.channel.send(this.eightBall())
            .catch(console.error);
    }
    
    eightBall() {
        return this.options[Math.floor(Math.random() * this.options.length)];
    }
}

module.exports = EightBall;