import { Queue, Song } from "distube";

module.exports = {
    name: 'finishSong',
    distube: true,

    async execute(queue: Queue, song: Song) {
        return;
    }
}