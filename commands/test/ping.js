"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: 'ping',
    description: 'replies with pong',
    category: 'test',
    async execute(interaction, client) {
        return await interaction.reply({
            content: 'Pong!',
            ephemeral: true,
        });
    }
};
