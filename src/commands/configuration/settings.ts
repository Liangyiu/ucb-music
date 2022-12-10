import {
    ApplicationCommandOptionType,
    CommandInteraction,
    CommandInteractionOptionResolver,
} from 'discord.js';
import utility from '../../utility/utility';
import UMCommand from '../../interfaces/UMCommand';
import UMClient from '../../interfaces/UMClient';
import UMServerSettings from '../../interfaces/UMServerSettings';

module.exports = {
    name: 'settings',
    description: 'Configure the bot',
    category: 'configuration',

    cooldown: 20,

    adminOnly: true,

    options: [
        {
            name: 'adminrole',
            description: 'Set the Admin role',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'role',
                    description: 'Specify a role to become the Admin role',
                    type: ApplicationCommandOptionType.Role,
                    required: true,
                },
            ],
        },
        {
            name: 'djrole',
            description: 'Set the DJ role',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'role',
                    description: 'Specify a role to become the DJ role',
                    type: ApplicationCommandOptionType.Role,
                    required: true,
                },
            ],
        },
        {
            name: 'userrole',
            description: 'Set the User role',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'role',
                    description: 'Specify a role to become the User role',
                    type: ApplicationCommandOptionType.Role,
                    required: true,
                },
            ],
        },
        {
            name: 'reset',
            description: 'Reset the server settings to default',
            type: ApplicationCommandOptionType.Subcommand,
        },
    ],

    async execute(interaction: CommandInteraction, client: UMClient) {
        const { guild } = interaction;
        const options = interaction.options as CommandInteractionOptionResolver;

        let serverSettings = client.serverSettings.get(guild?.id || '') as UMServerSettings;

        const cmd = options.getSubcommand();
        const role = options.getRole('role');

        switch (cmd) {
            case 'reset': {
                await utility.setDefaultServerSettings(guild?.id || '', guild?.roles.everyone.id || '');
                serverSettings = await utility.getServerSettings(guild?.id || '');

                return await interaction.reply({
                    ephemeral: true,
                    content: '✅ Reset the server settings to default.',
                });
            }
            case 'adminrole': {
                await utility.setAdminRoleId(guild?.id || '', role?.id || '');
                serverSettings.adminRoleId = role?.id || '';

                return await interaction.reply({
                    ephemeral: true,
                    content: `✅ Admin role has been set to ${role}.`,
                });
            }
            case 'djrole': {
                await utility.setDjRoleId(guild?.id || '', role?.id || '');
                serverSettings.djRoleId = role?.id || '';

                return await interaction.reply({
                    ephemeral: true,
                    content: `✅ Dj role has been set to ${role}.`,
                });
            }
            case 'userrole': {
                await utility.setUserRoleId(guild?.id || '', role?.id || '');
                serverSettings.userRoleId = role?.id || '';

                return await interaction.reply({
                    ephemeral: true,
                    content: `✅ User role has been set to ${role}.`,
                });
            }
        }
    },
} as UMCommand;
