import UMClient from "../../interfaces/UMClient";
import UMCommand from "../../interfaces/UMCommand";
import { CommandInteraction } from 'discord.js';

module.exports = {
    name: 'ping',
    description: 'replies with pong',
    category: 'test',
    testOnly: true,

    async execute(interaction: CommandInteraction, client: UMClient) {
        return await interaction.reply({
            content: 'Pong!',
            ephemeral: true,
        });
    }
} as UMCommand;