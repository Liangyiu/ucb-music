import { CommandInteraction, EmbedBuilder } from 'discord.js';
import UMClient from '../../interfaces/UMClient';
import UMCommand from '../../interfaces/UMCommand';
import utility from '../../utility/utility';

module.exports = {
    name: 'stats',
    description: 'Look at some of the bots statistics',
    category: 'info',

    cooldown: 10,

    async execute(interaction: CommandInteraction, client: UMClient) {
        const commandsUsed = await utility.getCommandsUsedCount();
        const songsPlayed = await utility.getSongsPlayedCount();
        const mostPlayedSong = await utility.getMostPlayedSong();
        const serverCount = client.guilds.cache.size;
        const userCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);

        const embed = new EmbedBuilder()
            .setColor('#43ac34')
            .addFields(
                {
                    name: 'Most Popular Song',
                    value: `\`\`\`${mostPlayedSong}\`\`\``,
                    inline: false,
                },
                {
                    name: 'Servers',
                    value: `\`\`\`${serverCount}\`\`\``,
                    inline: true,
                },
                {
                    name: 'Users',
                    value: `\`\`\`${userCount}\`\`\``,
                    inline: true,
                },
                {
                    name: 'Songs Played',
                    value: `\`\`\`${songsPlayed}\`\`\``,
                    inline: true,
                },
                {
                    name: 'Commands Used',
                    value: `\`\`\`${commandsUsed}\`\`\``,
                    inline: true,
                },
            )
            .setFooter({
                text: 'UCB-Music Statistics',
                iconURL: client.user?.displayAvatarURL(),
            });

        return interaction.reply({
            ephemeral: true,
            embeds: [embed],
        });
    },
} as UMCommand;
