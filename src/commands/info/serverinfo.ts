import { CommandInteraction, EmbedBuilder } from 'discord.js';
import UMClient from '../../interfaces/UMClient';
import UMCommand from '../../interfaces/UMCommand';
import UMServerSettings from '../../interfaces/UMServerSettings';

module.exports = {
    name: 'serverinfo',
    description: 'Displays information about this server and the bots configuration',
    category: 'info',

    cooldown: 10,

    async execute(interaction: CommandInteraction, client: UMClient) {
        const { guild } = interaction;

        const embed = new EmbedBuilder().setTitle(`\`${guild?.name}\``).setThumbnail(guild?.iconURL() || '');

        embed.addFields([
            {
                name: 'GuildID',
                value: `\`${guild?.id}\``,
            },
            {
                name: 'Shard',
                value: `\`${guild?.shardId}\``,
                inline: true,
            },
            {
                name: 'Members',
                value: `\`${guild?.memberCount}\``,
                inline: true,
            },
        ]);

        const serverSettings = client.serverSettings.get(guild?.id || '') as UMServerSettings;

        const adminRole = await guild?.roles.cache.get(serverSettings.adminRoleId);
        const djRole = await guild?.roles.cache.get(serverSettings.djRoleId);
        const userRole = await guild?.roles.cache.get(serverSettings.userRoleId);

        embed.addFields({
            name: '\u200B',
            value: '__**Server Configuration**__',
            inline: false,
        });

        embed.addFields(
            {
                name: 'Admin-Role',
                value: adminRole ? `${adminRole}` : `\`not set up\``,
                inline: true,
            },
            {
                name: 'DJ-Role',
                value: `${djRole}`,
                inline: true,
            },
            {
                name: 'User-Role',
                value: `${userRole}`,
                inline: true,
            },
        );

        return await interaction.reply({
            ephemeral: true,
            embeds: [embed],
        });
    },
} as UMCommand;
