import { CommandInteraction, Client, EmbedBuilder, GuildMember } from 'discord.js';
import UMClient from '../../interfaces/UMClient';
import UMSong from '../../interfaces/UMSong';
const PBF = require('progress-bar-formatter');

module.exports = {
    name: 'currentlyplaying',
    description: 'Gives info about the currently playing song',
    category: 'music',

    cooldown: 10,


    async execute(interaction: CommandInteraction, client: UMClient) {
        const { guild, channel } = interaction;
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


        const song = queue.songs[0] as UMSong;

        const bar = new PBF({
            complete: '▰',
            incomplete: '▱',
            length: 15
        })

        const embed = new EmbedBuilder()
            .setColor('#43ac34')
            .setTitle(`<:ucb:1044983268686168065> \`${song.name}\``)
            .addFields(
                { name: 'Links', value: `[<:youtube:938131469019283507>](${song.url})`, inline: true },
                { name: 'Duration', value: `\`${song.formattedDuration}\``, inline: true },
                { name: 'Progress', value: `\`${queue.formattedCurrentTime} ${bar.format(queue.currentTime / song.duration)} ${song.formattedDuration}\``, inline: false },
            )
            .setThumbnail(song.thumbnail || '')

        return await interaction.reply({
            ephemeral: true,
            embeds: [
                embed,
            ],
        });
    }
}