"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utility_1 = __importDefault(require("../../utility/utility"));
module.exports = {
    name: 'finishSong',
    distube: true,
    async execute(queue, song) {
        await utility_1.default.playedSong(song.name || '', song.url, song.member?.guild.id || '');
    }
};
