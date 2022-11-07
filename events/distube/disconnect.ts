import { Queue } from "distube";

module.exports = {
    name: 'disconnect',
    distube: true,


    async execute(queue: Queue) {
        setTimeout(async () => {
            try {
                await queue.textChannel?.messages.fetch().then(messages => {
                    messages.forEach(message => {
                        if (message.author.id === queue.distube.client.application?.id) {
                            try {
                                message.delete()
                            } catch (error) {

                            }
                        }
                    })
                })
            } catch (error) {

            }
        }, 0);
    }
}