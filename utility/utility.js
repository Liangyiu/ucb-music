"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const songsPlayed_1 = __importDefault(require("../schemas/songsPlayed"));
const commandsUsed_1 = __importDefault(require("../schemas/commandsUsed"));
exports.default = {
    async playedSong(songTitle, songUrl, guildId) {
        return await songsPlayed_1.default.findOneAndUpdate({
            songUrl: songUrl,
        }, {
            songTitle: songTitle,
            guildId: guildId,
            $inc: { count: 1 },
        }, {
            upsert: true,
        });
    },
    async getSongsPlayedCount() {
        const response = await songsPlayed_1.default.aggregate([
            {
                $group: {
                    _id: null,
                    count: {
                        $sum: '$count',
                    },
                },
            },
        ]);
        if (response)
            return response[0].count;
        else
            return 0;
    },
    async getMostPlayedSong() {
        const res = await songsPlayed_1.default.aggregate([
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
    async commandUsed(cmdName) {
        return await commandsUsed_1.default.findOneAndUpdate({
            commandName: cmdName,
        }, {
            $inc: { count: 1 }
        }, {
            upsert: true
        });
    },
};
