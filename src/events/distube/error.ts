import { EmbedBuilder, GuildChannel, TextChannel } from 'discord.js';
import { DisTubeError } from 'distube';

module.exports = {
    name: 'error',
    distube: true,

    
    execute(channel: TextChannel, e: DisTubeError<any>) {
        if (e.errorCode === 'VOICE_MISSING_PERMS') {
            return channel.send(
                {
                    embeds: [
                        new EmbedBuilder()
                            .setColor('Red')
                            .setTitle('⛔ ERROR')
                            .setDescription(`Missing permissions to join your channel.`)
                    ]
                }
            )
        }
        console.log(e);

        return channel.send(
            {
                embeds: [
                    new EmbedBuilder()
                        .setColor('Red')
                        .setTitle('⛔ ERROR')
                        .setDescription(`${e.toString().slice(0, 1974)}`)
                ]
            }
        )
    }
}