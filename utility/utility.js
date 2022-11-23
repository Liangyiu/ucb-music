"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const songsPlayed_1 = __importDefault(require("../schemas/songsPlayed"));
exports.default = {
    async playedSong(songTitle, songUrl, guildId) {
        return await songsPlayed_1.default.findOneAndUpdate({
            songUrl: songUrl,
        }, {
            songTitle: songTitle,
            guildId: guildId,
            $inc: { count: 1 }
        }, {
            upsert: true
        });
    },
};
