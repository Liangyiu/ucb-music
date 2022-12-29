import { Queue } from 'distube';
import utility from '../../utility/utility';

module.exports = {
    name: 'initQueue',
    distube: true,

    async execute(queue: Queue) {
        queue.voice.setSelfDeaf(false);

        const settings = await utility.getServerSettings(queue.id);

        if (settings) {
            queue.autoplay = settings.autoplay;
            queue.setRepeatMode(settings.loopMode);
            queue.setVolume(settings.defaultVolume);
        }
    },
};
