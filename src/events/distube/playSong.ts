import { EmbedBuilder, ButtonBuilder, ActionRowBuilder, Message, ButtonStyle } from 'discord.js';
import { Queue, Song } from 'distube';
import UMServerSettings from '../../interfaces/UMServerSettings';
import utility from '../../utility/utility';
require('dotenv').config();

const status = (queue: Queue) =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${
        queue.repeatMode ? (queue.repeatMode === 2 ? 'Queue' : 'Song') : 'Off'
    }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;

const buttonrow = new ActionRowBuilder()
    .addComponents(new ButtonBuilder().setCustomId('pausebutton').setEmoji('⏸️').setStyle(ButtonStyle.Secondary))
    .addComponents(new ButtonBuilder().setCustomId('previousbutton').setEmoji('⏮️').setStyle(ButtonStyle.Secondary))
    .addComponents(new ButtonBuilder().setCustomId('stopbutton').setEmoji('⏹️').setStyle(ButtonStyle.Secondary))
    .addComponents(new ButtonBuilder().setCustomId('skipbutton').setEmoji('⏭️').setStyle(ButtonStyle.Secondary))
    .addComponents(
        new ButtonBuilder()
            .setCustomId('queuebutton')
            .setEmoji('📃')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(false),
    );

module.exports = {
    name: 'playSong',
    once: false,
    distube: true,

    async execute(queue: Queue, song: Song) {
        const textChannel = queue.textChannel;
        const serverSettings = (await utility.getServerSettings(queue.id)) as UMServerSettings;

        let cpEmbed = new EmbedBuilder();

        if (!song.isLive) {
            cpEmbed
                .setColor('#43ac34')
                .setTitle(`<:ucb:1044983268686168065> \`${song.name}\``)
                .addFields({ name: 'Duration', value: `\`${song.formattedDuration}\``, inline: true })
                .addFields(
                    {
                        name: 'Queue-Length',
                        value: `\`${
                            queue.songs.length === 1 ? `${queue.songs.length}\` song` : `${queue.songs.length}\` songs`
                        } - \`${queue.formattedDuration}\``,
                    },
                    {
                        name: 'Queue-Status',
                        value: status(queue),
                    },
                )
                .setFooter({
                    text: `Song requested by ${song.user?.username}`,
                    iconURL: song.user?.displayAvatarURL(),
                });
        } else {
            cpEmbed
                .setColor('#43ac34')
                .setTitle(`<:ucb:1044983268686168065> \`${song.name}\``)
                .addFields({ name: 'Duration', value: `\`${song.formattedDuration}\``, inline: true })
                .addFields(
                    {
                        name: 'Queue-Length',
                        value: `\`${
                            queue.songs.length === 1 ? `${queue.songs.length}\` song` : `${queue.songs.length}\` songs`
                        } - \`${queue.formattedDuration}\``,
                    },
                    {
                        name: 'Queue-Status',
                        value: status(queue),
                    },
                )
                .setThumbnail('https://media.giphy.com/media/bjTLI4XtU0cQURvzqk/giphy.gif')
                .setFooter({
                    text: `Song requested by ${song.user?.username}`,
                    iconURL: song.user?.displayAvatarURL(),
                });
        }

        let msg = undefined as any;
        if (serverSettings.buttonControls) {
            msg = await textChannel?.send({
                embeds: [cpEmbed],
                // @ts-ignore
                components: [buttonrow],
            });
        } else {
            msg = await textChannel?.send({
                embeds: [cpEmbed],
            });
        }

        await queue.textChannel?.messages.fetch().then(messages => {
            messages.forEach(message => {
                if (message.author.id === queue.distube.client.application?.id && message.id !== msg?.id) {
                    try {
                        message.delete();
                    } catch (error) {}
                }
            });
        });
    },
};
