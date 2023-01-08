import { CommandInteraction, GuildMember } from 'discord.js';
import UMClient from '../../interfaces/UMClient';
import UMCommand from '../../interfaces/UMCommand';
import utility from '../../utility/utility';

module.exports = {
    name: 'clear',
    description: 'Clears the queue',
    category: 'music',

    cooldown: 30,

    djOnly: true,

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

        if (queue.songs.length === 1) {
            return await interaction.reply({
                ephemeral: true,
                content: '⛔ No other songs in the queue than the one currently playing.',
            });
        }

        const oldQueueLength = queue.songs.length - 1;

        await queue.songs.splice(1);

        try {
            await utility.updateNowPlaying(queue)
        } catch (error) {

        }

        return await interaction.reply({
            ephemeral: true,
            content: `✅ Cleared the queue. Removed \`${oldQueueLength}\` songs.`,
        });
    },
} as UMCommand;
