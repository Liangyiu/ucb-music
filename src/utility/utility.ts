import songsPlayedSchema from '../schemas/songsPlayed';
import commandsUsedSchema from '../schemas/commandsUsed';
import serverSettingsSchema from '../schemas/serverSettings';

export default {
    async playedSong(songTitle: string, songUrl: string, guildId: string) {
        return await songsPlayedSchema.findOneAndUpdate(
            {
                songUrl: songUrl,
            },
            {
                songTitle: songTitle,
                guildId: guildId,
                $inc: { count: 1 },
            },
            {
                upsert: true,
            },
        );
    },

    async getSongsPlayedCount() {
        const response = await songsPlayedSchema.aggregate([
            {
                $group: {
                    _id: null,
                    count: {
                        $sum: '$count',
                    },
                },
            },
        ]);

        if (response) return response[0].count;
        else return 0;
    },

    async getMostPlayedSong() {
        const res = await songsPlayedSchema.aggregate([
            {
                $sort: {
                    count: -1,
                },
            },
            { $limit: 1 },
            {
                $group: {
                    _id: null,
                    value: {
                        $first: '$songTitle',
                    },
                },
            },
        ]);

        return res[0].value;
    },

    async commandUsed(cmdName: string) {
        return await commandsUsedSchema.findOneAndUpdate({
            commandName: cmdName,
        }, {
            $inc: { count: 1 }
        }, {
            upsert: true
        })
    },

    async getCommandsUsedCount() {
        const res = await commandsUsedSchema.aggregate([
            {
                $group: {
                    "_id": null,
                    "count": {
                        "$sum": "$count"
                    }
                }
            }
        ])

        if (res) return res[0].count;
        else return 0;
    },

    async setDefaultServerSettings(guildId: string, everyoneId: string) {
        await serverSettingsSchema.findOneAndUpdate({
            _id: guildId
        }, {
            buttonControls: true,
            adminRoleId: 'null',
            djRoleId: everyoneId,
            userRoleId: everyoneId,
            playlistsDjOnly: false,
            spotifyFetching: false,
            musicChannelId: 'null',
            loopMode: 0,
            autoplay: false,
            defaultVolume: 50,
            songsPerUserLimit: 0,
            stealthMode: false,
            preventDuplicates: false,
            queueLimit: 100,
            rejoinOnCrash: false,
        }, {
            upsert: true
        })

        return;
    },
};
