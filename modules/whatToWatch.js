const eventTypes = require("../core/types").eventTypes;

exports.listeners = [
    "chatMessageAdd"
];

exports.chatMessageAdd = {
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
