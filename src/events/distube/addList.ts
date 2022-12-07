import { EmbedBuilder } from 'discord.js';
import { Playlist, Queue, Song } from 'distube';

module.exports = {
    name: 'addList',
    distube: true,


    async execute(queue: Queue, playlist: Playlist) {
        const song = queue.songs[0] as Song;
        
        await queue.textChannel?.send(
            {
                embeds: [
                    new EmbedBuilder()
                        .setColor('#43ac34')
                        .setTitle(`<a:flame_play:938203675178967130> \`Playlist added\``)
                        .setDescription(`\`${playlist.name}\``)
                        .addFields(
                            {
                                name: 'Duration', value: `\`${playlist.formattedDuration}\``, inline: true
                            },
                            {
                                name: 'Queue-Length', value: `${queue.songs.length} songs - \`${queue.formattedDuration}\``, inline: true
                            }
                        )
                        .setFooter({ text: `Requested by ${playlist.user?.username}`, iconURL: playlist.user?.displayAvatarURL() })
                ]
            }
        )
    }
}