import { Queue } from 'distube';

module.exports = {
    name: 'empty',
    distube: true,

    async execute(queue: Queue) {
        return;
    }
}