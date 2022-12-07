import { Queue } from 'distube';

module.exports = {
    name: 'finish',
    distube: true,

    async execute(queue: Queue) {
        return;
    }
}