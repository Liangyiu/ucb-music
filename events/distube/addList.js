"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: 'addList',
    distube: true,
    async execute(queue, playlist) {
        const song = queue.songs[0];
        await queue.textChannel?.send({
            embeds: [
                new discord_js_1.EmbedBuilder()
                    .setColor('#43ac34')
                    .setTitle(`<a:flame_play:938203675178967130> \`Playlist added\``)
                    .setDescription(`\`${playlist.name}\``)
                    .addFields({
                    name: 'Duration', value: `\`${playlist.formattedDuration}\``, inline: true
                }, {
                    name: 'Queue-Length', value: `${queue.songs.length} songs - \`${queue.formattedDuration}\``, inline: true
                })
                    .setFooter({ text: `Requested by ${playlist.user?.username}`, iconURL: playlist.user?.displayAvatarURL() })
            ]
        });
    }
};
