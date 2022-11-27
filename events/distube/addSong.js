"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: 'addSong',
    distube: true,
    async execute(queue, song) {
        await queue.textChannel?.send({
            embeds: [
                new discord_js_1.EmbedBuilder()
                    .setColor('#43ac34')
                    .setTitle(`<a:flame_play:938203675178967130> \`Song added\``)
                    .setURL(song.url)
                    .setDescription(`\`${song.name}\``)
                    .addFields({
                    name: 'Duration', value: `\`${song.formattedDuration}\``, inline: true
                }, {
                    name: 'Queue-Length', value: `${queue.songs.length} songs - \`${queue.formattedDuration}\``, inline: true
                })
                    .setFooter({ text: `Requested by ${song.user?.username}`, iconURL: song.user?.displayAvatarURL() })
            ]
        });
    }
};
