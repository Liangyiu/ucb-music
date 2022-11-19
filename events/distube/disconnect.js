"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: 'disconnect',
    distube: true,
    async execute(queue) {
        setTimeout(async () => {
            try {
                await queue.textChannel?.messages.fetch().then(messages => {
                    messages.forEach(message => {
                        if (message.author.id === queue.distube.client.application?.id) {
                            try {
                                message.delete();
                            }
                            catch (error) {
                                console.log(error);
                            }
                        }
                    });
                });
            }
            catch (error) {
            }
        }, 0);
    }
};
