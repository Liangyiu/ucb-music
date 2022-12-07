import { EmbedBuilder } from 'discord.js';
import { Queue, Song } from 'distube';

module.exports = {
    name: 'addSong',
    distube: true,
    async execute(queue: Queue, song: Song) {
        await queue.textChannel?.send({
            embeds: [
                new EmbedBuilder()
                    .setColor('#43ac34')
                    .setTitle(`<a:flame_play:938203675178967130> \`Song added\``)
                    .setURL(song.url)
                    .setDescription(`\`${song.name}\``)
                    .addFields(
                        {
                            name: 'Duration',
                            value: `\`${song.formattedDuration}\``,
                            inline: true,
                        },
                        {
                            name: 'Queue-Length',
                            value: `${queue.songs.length} songs - \`${queue.formattedDuration}\``,
                            inline: true,
                        },
                    )
                    .setFooter({ text: `Requested by ${song.user?.username}`, iconURL: song.user?.displayAvatarURL() }),
            ],
        });
    },
};
