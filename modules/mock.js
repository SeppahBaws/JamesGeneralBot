const Discord = require("discord.js");

class Mock {
	run(bot, message, options) {
        message.channel.send(`${this.mock(options)}`)
            .then(message.channel.send("<a:jcMock:652273361069539341>"));
	}

	mock(text) {
		return text.split("").map(x => Math.random() > 0.5 ? x.toLowerCase() : x.toUpperCase()).join("");
	}
}

module.exports = Mock;