import UMClient from "../../interfaces/UMClient";

require('dotenv').config();


module.exports = {
    name: 'ready',
    once: true,

    /**
     * 
     * @param {Client} client 
     */
    async execute(client: UMClient) {
        await client.application?.commands.set(client.commandArray);

        console.log('The bot is ready!');
    }
}