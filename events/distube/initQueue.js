"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: 'initQueue',
    distube: true,
    async execute(queue) {
        queue.voice.setSelfDeaf(false);
        queue.setVolume(50);
    }
};
