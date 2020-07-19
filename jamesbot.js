require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();

const Poll = require("./modules/poll");
const PollModule = new Poll();

const Mock = require("./modules/mock");
const MockModule = new Mock();

const Coinflip = require("./modules/coinflip");
const CoinflipModule = new Coinflip();

const EightBall = require("./modules/eightball");
const EightBallModule = new EightBall();

const version = "v0.1.0";

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

	switch (command)
	{
	case "poll":
		PollModule.run(client, msg, options);
		break;
	case "mock":
		MockModule.run(client, msg, options);
        break;
    case "coinflip":
        CoinflipModule.run(client, msg, options);
        break;
    case "8ball":
        EightBallModule.run(client, msg, options);
        break;
	}
	
	// if (isDevMode && msg.guild.id === devServer) {
	// 	switch (command)
	// 	{
	// 	case "poll":
	// 		PollModule.run(client, msg, options);
	// 		break;
	// 	}
	// }
});

client.login(process.env.DISCORD_TOKEN);
