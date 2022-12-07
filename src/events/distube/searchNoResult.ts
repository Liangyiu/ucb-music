import { Message, EmbedBuilder } from 'discord.js';

module.exports = {
    name: 'searchNoResult',
    distube: true,

    execute(message: Message, query: String) {
        message.channel.send(
            {
                embeds: [
                    new EmbedBuilder()
                        .setColor('Red')
                        .setDescription(`⛔ No result found for \`${query}\`!`)
                ]
            }
        )
    }
}