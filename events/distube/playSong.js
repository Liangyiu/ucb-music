"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
require('dotenv').config();
const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'Queue' : 'Song') : 'Off'}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;
const buttonrow = new discord_js_1.ActionRowBuilder()
    .addComponents(new discord_js_1.ButtonBuilder()
    .setCustomId('pausebutton')
    .setEmoji('⏸️')
    .setStyle(discord_js_1.ButtonStyle.Secondary))
    .addComponents(new discord_js_1.ButtonBuilder()
    .setCustomId('previousbutton')
    .setEmoji('⏮️')
    .setStyle(discord_js_1.ButtonStyle.Secondary))
    .addComponents(new discord_js_1.ButtonBuilder()
    .setCustomId('stopbutton')
    .setEmoji('⏹️')
    .setStyle(discord_js_1.ButtonStyle.Secondary))
    .addComponents(new discord_js_1.ButtonBuilder()
    .setCustomId('skipbutton')
    .setEmoji('⏭️')
    .setStyle(discord_js_1.ButtonStyle.Secondary))
    .addComponents(new discord_js_1.ButtonBuilder()
    .setCustomId('queuebutton')
    .setEmoji('📃')
    .setStyle(discord_js_1.ButtonStyle.Secondary)
    .setDisabled(false));
module.exports = {
    name: 'playSong',
    once: false,
    distube: true,
    async execute(queue, song) {
        const textChannel = queue.textChannel;
        let cpEmbed = new discord_js_1.EmbedBuilder();
        if (!song.isLive) {
            cpEmbed
                .setColor('#43ac34')
                .setTitle(`<:ucb:1044983268686168065> \`${song.name}\``)
                .addFields({ name: 'Duration', value: `\`${song.formattedDuration}\``, inline: true })
                .addFields({
                name: 'Queue-Length', value: `\`${queue.songs.length === 1 ? `${queue.songs.length}\` song` : `${queue.songs.length}\` songs`} - \`${queue.formattedDuration}\``
            }, {
                name: 'Queue-Status', value: status(queue)
            })
                .setFooter({ text: `Song requested by ${song.user?.username}`, iconURL: song.user?.displayAvatarURL() });
        }
        else {
            cpEmbed
                .setColor('#43ac34')
                .setTitle(`<:ucb:1044983268686168065> \`${song.name}\``)
                .addFields({ name: 'Duration', value: `\`${song.formattedDuration}\``, inline: true })
                .addFields({
                name: 'Queue-Length', value: `\`${queue.songs.length === 1 ? `${queue.songs.length}\` song` : `${queue.songs.length}\` songs`} - \`${queue.formattedDuration}\``
            }, {
                name: 'Queue-Status', value: status(queue)
            })
                .setThumbnail('https://media.giphy.com/media/bjTLI4XtU0cQURvzqk/giphy.gif')
                .setFooter({ text: `Song requested by ${song.user?.username}`, iconURL: song.user?.displayAvatarURL() });
        }
        const msg = await textChannel?.send({
            embeds: [cpEmbed],
            // @ts-ignore
            components: [buttonrow],
        });
        await queue.textChannel?.messages.fetch().then(messages => {
            messages.forEach(message => {
                if ((message.author.id === queue.distube.client.application?.id) && message.id !== msg?.id) {
                    try {
                        message.delete();
                    }
                    catch (error) {
                    }
                }
            });
        });
    }
};
