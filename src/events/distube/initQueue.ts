import { Queue } from "distube";

module.exports = {
    name: 'initQueue',
    distube: true,

    async execute(queue: Queue) {
        queue.voice.setSelfDeaf(false);
        queue.setVolume(50);
    }
}