const Discord = require("discord.js");

class Poll {
	constructor() {
		this.reactions = [
			"1️⃣",
			"2️⃣",
			"3️⃣",
			"4️⃣",
			"5️⃣",
			"6️⃣",
			"7️⃣",
			"8️⃣",
			"9️⃣",
			"🔟"
		];
	}

	run(bot, message, options) {
        const elements = options.split(/["]/).map(item => item.trim()).filter(item => item !== "");
        
        const poll = {
			question: elements[0],
			options: elements.slice(1),
        };
        
        console.log(`poll created by ${message.author.username} --`, poll);
		
		if (poll.options.length <= 1) {
			message.reply("You need at least two items to have a poll!\nMake sure you request your poll as follows: `!poll \"question\" \"option1\" \"option2\" ...`");
			return;
		}

		if (poll.options.length > 10) {
			message.reply("You can't have more than 10 options, sorry!");
			return;
        }
        
		const embed = new Discord.MessageEmbed()
			.setTitle(elements[0])
			.setAuthor(message.author.username)
			.setTimestamp()
			.setDescription(this.makePollDescription(poll))
			.setColor("#7289DA");

		message.channel.send(embed)
			.then(pollMsg => {
				this.addReactions(pollMsg, poll.options.length);
			});
	}

	makePollDescription(poll) {
		let description = "";

		// Index 
		let index = 0;
		poll.options.map(option => {
			description += `${this.reactions[index]} ${option}` + "\n\n";
			index++;
		});

		return description;
	}

	async addReactions(poll, amount) {
		try {
			for (let i = 0; i < amount; i++) {
				await poll.react(this.reactions[i]);
			}
		} catch(error) {
			console.log(error);
		}
	}
}

module.exports = Poll;
