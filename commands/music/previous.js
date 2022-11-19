"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: 'previous',
    description: 'Jumps to the previously played song',
    category: 'music',
    cooldown: 10,
    async execute(interaction, client) {
        const { guild } = interaction;
        const member = interaction.member;
        const voicechannel = member.voice.channel;
        if (!voicechannel) {
            return await interaction.reply({
                ephemeral: true,
                content: 'You must be in a voice channel to use the music commands.',
            });
        }
        if (guild?.members.me?.voice.channelId && voicechannel.id !== guild.members.me.voice.channelId) {
            return await interaction.reply({
                ephemeral: true,
                content: `I am playing music in <#${guild.members.me.voice.channelId}>. Join the channel to use the music commands.`,
            });
        }
        const queue = await client.distube.getQueue(voicechannel);
        if (!queue) {
            return await interaction.reply({
                ephemeral: true,
                content: '⛔ I am currently not playing music.',
            });
        }
        if (queue.previousSongs.length === 0) {
            return await interaction.reply({
                ephemeral: true,
                content: '⛔ No previous song(s).',
            });
        }
        if (interaction.isButton()) {
            const btnInteraction = interaction;
            const message = btnInteraction.message;
            const row = message.components[0];
            if (row) {
                const updatedRow = new discord_js_1.ActionRowBuilder();
                // @ts-ignore
                const button1 = discord_js_1.ButtonBuilder.from(row.components[0]);
                // @ts-ignore
                const button2 = discord_js_1.ButtonBuilder.from(row.components[1]);
                // @ts-ignore
                const button3 = discord_js_1.ButtonBuilder.from(row.components[2]);
                // @ts-ignore
                const button4 = discord_js_1.ButtonBuilder.from(row.components[3]);
                // @ts-ignore
                const button5 = discord_js_1.ButtonBuilder.from(row.components[4]);
                button2.setDisabled(true);
                button1.setDisabled(true);
                button4.setDisabled(true);
                button3.setDisabled(true);
                updatedRow.addComponents(button1, button2, button3, button4, button5);
                // @ts-ignore
                await message.edit({ components: [updatedRow] });
            }
        }
        await queue.previous();
        return await interaction.reply({
            ephemeral: true,
            content: '⏮️ Switched to previous song.',
        });
    },
};
