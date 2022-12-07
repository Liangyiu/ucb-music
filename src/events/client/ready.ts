import UMClient from "../../interfaces/UMClient";

module.exports = {
    name: 'ready',
    once: true,
    
    async execute(client: UMClient) {
        await client.application?.commands.set(client.commandArray);

        console.log('The bot is ready!');
    }
}