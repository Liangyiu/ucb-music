"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: 'stop',
    description: 'Stops the current queue',
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
        await queue.stop();
        return await interaction.reply({
            ephemeral: true,
            content: '⏹️ Queue has been stopped.',
        });
    },
};
