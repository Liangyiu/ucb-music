import { Queue, Song } from "distube";
import utility from "../../utility/utility";

module.exports = {
    name: 'finishSong',
    distube: true,

    async execute(queue: Queue, song: Song) {
        await utility.playedSong(song.name || '', song.url, song.member?.guild.id || '');
    }
}