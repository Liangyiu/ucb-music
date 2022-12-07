import { CommandInteraction, GuildMember } from 'discord.js';
import UMClient from '../../interfaces/UMClient';

module.exports = {
    name: 'autoplay',
    description: 'Toggles the queues autoplay setting',
    category: 'music',

    cooldown: 10,

    async execute(interaction: CommandInteraction, client: UMClient) {
        const { guild } = interaction;
        const member = interaction.member as GuildMember;

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

        const autoplayState = await queue.toggleAutoplay();

        if (autoplayState) {
            return await interaction.reply({
                ephemeral: true,
                content: `✅ Autoplay for the current queue is now \`enabled\`.`,
            });
        }

        return await interaction.reply({
            ephemeral: true,
            content: `✅ Autoplay for the current queue is now \`disabled\`.`,
        });
    },
};
