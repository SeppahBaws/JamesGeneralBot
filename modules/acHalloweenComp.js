const eventTypes = require("../core/types").eventTypes;

exports.listeners = [
    "acHalloween"
];

exports.acHalloween = {
    channel: "771453749549072452",
    on: eventTypes.CHANNEL_MESSAGE_ADD,
    process: async(bot, message) => {
        if (message.attachments.size === 0) {
            return;
        }

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
