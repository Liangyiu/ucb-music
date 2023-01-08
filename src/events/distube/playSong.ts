import { EmbedBuilder, ButtonBuilder, ActionRowBuilder, Message, ButtonStyle } from 'discord.js';
import { Queue, Song } from 'distube';
import fetch from 'isomorphic-unfetch';
import UMServerSettings from '../../interfaces/UMServerSettings';
import UMSong from '../../interfaces/UMSong';
import utility from '../../utility/utility';
const PBF = require('progress-bar-formatter');
require('dotenv').config();
// @ts-ignore
import SpotifyUrlInfo from 'spotify-url-info';
const spotify = SpotifyUrlInfo(fetch);

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

    async execute(queue: Queue, song: UMSong) {
        const textChannel = queue.textChannel;
        const serverSettings = (await utility.getServerSettings(queue.id)) as UMServerSettings;

        if (serverSettings.stealthMode) {
            return;
        } else {
            if (typeof song.metadata.cpMessage === 'string') {
                const msg = (await textChannel?.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('#43ac34')
                            .setDescription('Preparing the currently playing message...'),
                    ],
                })) as Message;

                song.metadata.cpMessage = msg;

                const queuedSongs = queue.songs as UMSong[];

                await queuedSongs.forEach(song => (song.metadata.cpMessage = msg));
            }
        }

        let spotifyURL;
        let spotifyThumbnail;
        let songlinkURL;

        if (serverSettings.spotifyFetching) {
            if (song.metadata.spotifyLink) {
                spotifyURL = song.metadata.spotifyLink;

                try {
                    const data = await spotify.getData(spotifyURL);
                    spotifyThumbnail = data.coverArt.sources[1].url
                        ? data.coverArt.sources[1].url
                        : data.coverArt.sources[0].url;

                    await utility.setSpotifyLink(song.url, spotifyURL);
                } catch (error) {
                    console.log(error);
                }
            } else if (song.url.includes('youtube') && !song.isLive) {
                spotifyURL = await utility.getSpotifyLink(song.url);

                if (spotifyURL) {
                    try {
                        const data = await spotify.getData(spotifyURL);

                        spotifyThumbnail = data.coverArt.sources[1].url
                            ? data.coverArt.sources[1].url
                            : data.coverArt.sources[0].url;
                    } catch (error) {
                        console.log(error);
                    }
                }
            }

            if (!song.isLive && !song.url.includes('soundcloud') && !spotifyURL) {
                await fetch(`https://api.song.link/v1-alpha.1/links?url=${song.url}&key=${process.env.SONGLINKAPIKEY}`)
                    .then(response => response.json())
                    .then(async data => {
                        spotifyURL = data.linksByPlatform.spotify?.url;
                        songlinkURL = data.pageUrl;

                        const thumbnailData = await spotify.getData(spotifyURL);
                        spotifyThumbnail = thumbnailData.coverArt.sources[1].url
                            ? thumbnailData.coverArt.sources[1].url
                            : thumbnailData.coverArt.sources[0].url;

                        if (spotifyURL) {
                            await utility.setSpotifyLink(song.url, spotifyURL);
                        }
                    })
                    .catch(err => console.log(err));
            }
        }

        let links;

        if (song.url.includes('soundcloud')) {
            links = `[<:soundcloud:971339555561160714>](${song.url})`;
        } else if (spotifyURL) {
            links = `[<:youtube:938131469019283507>](${song.url}) | [<:spotify:938131723198271500>](${spotifyURL})`;
            if (songlinkURL) {
                links = links + ` | [<:songlink:939610303396728882>](${songlinkURL})`;
            }
        } else {
            links = `[<:youtube:938131469019283507>](${song.url})`;
        }

        const progressBar = new PBF({
            complete: '▰',
            incomplete: '▱',
            length: 15,
        });

        let cpEmbed = new EmbedBuilder();

        if (!song.isLive) {
            cpEmbed
                .setColor('#43ac34')
                .setTitle(`<:ucb:1044983268686168065> \`${song.name}\``)
                .addFields(
                    { name: 'Links', value: `${links}`, inline: true },
                    { name: 'Duration', value: `\`${song.formattedDuration}\``, inline: true },
                    {
                        name: 'Progress',
                        value: `\`${queue.formattedCurrentTime} ${progressBar.format(
                            queue.currentTime / song.duration,
                        )} ${song.formattedDuration}\``,
                        inline: false,
                    },
                )
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

            if (spotifyThumbnail) cpEmbed.setThumbnail(spotifyThumbnail);
        } else {
            cpEmbed
                .setColor('#43ac34')
                .setTitle(`<:ucb:1044983268686168065> \`${song.name}\``)
                .addFields(
                    { name: 'Links', value: `${links}`, inline: true },
                    { name: 'Duration', value: `\`${song.formattedDuration}\``, inline: true },
                )
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

        if (serverSettings.buttonControls) {
            await song.metadata.cpMessage.edit({
                embeds: [cpEmbed],
                // @ts-ignore
                components: [buttonrow],
            });
        } else {
            await song.metadata.cpMessage.edit({
                embeds: [cpEmbed],
                components: [],
            });
        }

        await queue.textChannel?.messages.fetch().then(messages => {
            messages.forEach(message => {
                if (message.author.id === queue.distube.client.application?.id && message.id !== song.metadata.cpMessage.id) {
                    try {
                        message.delete();
                    } catch (error) {}
                }
            });
        });
    },
};
