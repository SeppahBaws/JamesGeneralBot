const eventTypes = require("../core/types").eventTypes;

exports.listeners = [
    "vineEnergy",
    "whatToWatch",
    "listenToThis"
];

exports.vineEnergy = {
    channel: "734382894872789062",
    on: eventTypes.CHANNEL_MESSAGE_ADD,
    process: async(bot, message) => {
        const emoteIds = [
            "612277706708615179", // upvote
            "612277703910883330", // neutrral vote
            "612277703755956245", // downvote
        ];

        // Add the emotes in order
        try {
            emoteIds.map(e => message.react(e));
        } catch(error) {
            console.error(error); // log any errors
        }
    }
};

exports.whatToWatch = {
    channel: "747542960912072878",
    on: eventTypes.CHANNEL_MESSAGE_ADD,
    process: async(bot, message) => {
        const emoteIds = [
            "612277706708615179", // upvote
            "612277703755956245", // downvote
        ];

        // Add the emotes in order
        try {
            emoteIds.map(e => message.react(e));
        } catch(error) {
            console.error(error); // log any errors
        }
    }
};

exports.listenToThis = {
    channel: "737647563754176563",
    on: eventTypes.CHANNEL_MESSAGE_ADD,
    process: async(bot, message) => {
        const emoteIds = [
            "612277706708615179", // upvote
            "612277703755956245", // downvote
        ];

        if (!message.embeds || message.embeds.length <= 0) {
            return;
        }

        // Add the emotes in order
        try {
            emoteIds.map(e => message.react(e));
        } catch(error) {
            console.error(error); // log any errors
        }
    }
};
