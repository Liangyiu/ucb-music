import { EmbedBuilder, ButtonBuilder, ActionRowBuilder, Message, ButtonStyle } from 'discord.js';
import { Queue, Song } from 'distube';
require('dotenv').config();

const status = (queue: Queue) =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'Queue' : 'Song') : 'Off'
    }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;


module.exports = {
    name: 'playSong',
    once: false,
    distube: true,


    async execute(queue: Queue, song: Song) {
        const textChannel = queue.textChannel;

        let cpEmbed = new EmbedBuilder();

        if (!song.isLive) {
            cpEmbed
                .setColor('#66bccb')
                .setTitle(`<a:infinity_play:938203674226880582> \`${song.name}\``)
                .addFields(
                    { name: 'Duration', value: `\`${song.formattedDuration}\``, inline: true },
                )
                .addFields(
                    {
                        name: 'Queue-Length', value: `\`${queue.songs.length === 1 ? `${queue.songs.length}\` song` : `${queue.songs.length}\` songs`} - \`${queue.formattedDuration}\``
                    },
                    {
                        name: 'Queue-Status', value: status(queue)
                    }
                )
                .setFooter({ text: `Song requested by ${song.user?.username}`, iconURL: song.user?.displayAvatarURL() })
        } else {
            cpEmbed
                .setColor('#66bccb')
                .setTitle(`<a:infinity_play:938203674226880582> \`${song.name}\``)
                .addFields(
                    { name: 'Duration', value: `\`${song.formattedDuration}\``, inline: true },
                )
                .addFields(
                    {
                        name: 'Queue-Length', value: `\`${queue.songs.length === 1 ? `${queue.songs.length}\` song` : `${queue.songs.length}\` songs`} - \`${queue.formattedDuration}\``
                    },
                    {
                        name: 'Queue-Status', value: status(queue)
                    }
                )
                .setThumbnail('https://media.giphy.com/media/bjTLI4XtU0cQURvzqk/giphy.gif')
                .setFooter({ text: `Song requested by ${song.user?.username}`, iconURL: song.user?.displayAvatarURL() })
        }

        await textChannel?.send({
            embeds: [cpEmbed]
        });
    }
}