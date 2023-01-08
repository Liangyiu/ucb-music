import { EmbedBuilder } from 'discord.js';
import { Queue, Song } from 'distube';
import UMServerSettings from '../../interfaces/UMServerSettings';
import utility from '../../utility/utility';

module.exports = {
    name: 'addSong',
    distube: true,
    async execute(queue: Queue, song: Song) {
        const serverSettings = (await utility.getServerSettings(queue.id)) as UMServerSettings;

        if (!serverSettings.stealthMode) {
            try {
                await utility.updateNowPlaying(queue)
            } catch (error) {

            }
            
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
                        .setFooter({
                            text: `Requested by ${song.user?.username}`,
                            iconURL: song.user?.displayAvatarURL(),
                        }),
                ],
            });
        }
    },
};
