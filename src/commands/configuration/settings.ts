import {
    ApplicationCommandOptionType,
    ChannelType,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildTextBasedChannel,
    PermissionsBitField,
} from 'discord.js';
import utility from '../../utility/utility';
import UMCommand from '../../interfaces/UMCommand';
import UMClient from '../../interfaces/UMClient';
import UMServerSettings from '../../interfaces/UMServerSettings';
const boolDesc = 'Specify if you want to enable/disable this option';

module.exports = {
    name: 'settings',
    description: 'Configure the bot',
    category: 'configuration',

    cooldown: 20,

    permissions: [PermissionsBitField.Flags.Administrator],
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
        {
            name: 'buttoncontrols',
            description: 'Enable/Disable button controls',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'action',
                    description: boolDesc,
                    type: ApplicationCommandOptionType.Boolean,
                    required: true,
                },
            ],
        },
        {
            name: 'musicchannel',
            description: 'Set a music channel',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'channel',
                    description: 'Specify which channel you want to be the music channel',
                    type: ApplicationCommandOptionType.Channel,
                    required: true,
                    channel_types: [ChannelType.GuildText],
                },
            ],
        },
        {
            name: 'loop',
            description: 'Choose a loop mode',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'loopmode',
                    description: 'Specify your desired loop mode',
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    choices: [
                        {
                            name: 'Disable',
                            value: 'disable',
                        },
                        {
                            name: 'Queue',
                            value: 'queue',
                        },
                        {
                            name: 'Song',
                            value: 'song',
                        },
                    ],
                },
            ],
        },
        {
            name: 'autoplay',
            description: 'Enable/Disable autoplay',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'action',
                    description: boolDesc,
                    type: ApplicationCommandOptionType.Boolean,
                    required: true,
                },
            ],
        },
        {
            name: 'defaultvolume',
            description: 'Set the default volume',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'percentage',
                    description: '10 = 10%',
                    type: ApplicationCommandOptionType.Number,
                    required: true,
                },
            ],
        },
        {
            name: 'stealthmode',
            description: 'Enable/Disable stealth mode',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'action',
                    description: boolDesc,
                    type: ApplicationCommandOptionType.Boolean,
                    required: true,
                },
            ],
        },
        {
            name: 'songlimit',
            description: 'Set the maximum amount of songs a user can have queued',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'amount',
                    description: 'Specify the amount - 0 to reset',
                    type: ApplicationCommandOptionType.Number,
                    required: true,
                },
            ],
        },
        {
            name: 'queuelimit',
            description: 'Set the maximum amount of songs that can be in a queue',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'amount',
                    description: 'Specify the amount - 0 to reset',
                    type: ApplicationCommandOptionType.Number,
                    required: true,
                },
            ],
        },
        {
            name: 'spotifyfetching',
            description: 'Enable/Disable spotify link and cover art fetching',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'action',
                    description: boolDesc,
                    type: ApplicationCommandOptionType.Boolean,
                    required: true,
                },
            ],
        },
    ],

    async execute(interaction: CommandInteraction, client: UMClient) {
        const { guild } = interaction;
        const options = interaction.options as CommandInteractionOptionResolver;
        const me = client.user;

        let serverSettings = client.serverSettings.get(guild?.id || '') as UMServerSettings;

        const cmd = options.getSubcommand();
        const role = options.getRole('role');
        const action = options.getBoolean('action');
        const musicChannel = options.getChannel('channel') as GuildTextBasedChannel;
        const volume = options.getNumber('percentage') || 50;
        const loopMode = options.getString('loopmode');
        const limit = options.getNumber('amount') || 0;

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
            case 'buttoncontrols': {
                await utility.setButtonControls(guild?.id || '', action || false);
                serverSettings.buttonControls = action || false;

                return await interaction.reply({
                    ephemeral: true,
                    content: `✅ Button controls have been ${action ? `\`enabled\`` : `\`disabled\``}.`,
                });
            }
            case 'musicchannel': {
                const permsInChannel = await musicChannel.permissionsFor(me?.id || '', true);

                if (
                    !permsInChannel?.has([
                        PermissionsBitField.Flags.ReadMessageHistory,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.ViewChannel,
                    ])
                ) {
                    return await interaction.reply({
                        ephemeral: true,
                        content:
                            '⛔ Did not set music channel.\nReason: `I need the permission to view the specified channel, read its message history and send messages into it.`',
                    });
                }

                await utility.setMusicChannelId(guild?.id || '', musicChannel.id);
                serverSettings.musicChannelId = musicChannel.id;

                return await interaction.reply({
                    ephemeral: true,
                    content: `✅ Music channel has been set to ${musicChannel}.`,
                });
            }
            case 'autoplay': {
                await utility.setAutoplay(guild?.id || '', action || false);
                serverSettings.autoplay = action || false;

                return await interaction.reply({
                    ephemeral: true,
                    content: `✅ Autoplay has been ${action ? `\`enabled\`` : `\`disabled\``}.`,
                });
            }
            case 'loop': {
                switch (loopMode) {
                    case 'song': {
                        await utility.setLoopMode(guild?.id || '', 1);
                        serverSettings.loopMode = 1;

                        return await interaction.reply({
                            ephemeral: true,
                            content: `✅ Looping-Mode switched to \`song\`.`,
                        });
                    }
                    case 'queue': {
                        await utility.setLoopMode(guild?.id || '', 2);
                        serverSettings.loopMode = 2;

                        return await interaction.reply({
                            ephemeral: true,
                            content: `✅ Looping-Mode switched to \`queue\`.`,
                        });
                    }
                    case 'disable': {
                        await utility.setLoopMode(guild?.id || '', 0);
                        serverSettings.loopMode = 0;

                        return await interaction.reply({
                            ephemeral: true,
                            content: `✅ Looping-Mode switched to \`disabled\`.`,
                        });
                    }
                }
            }
            case 'defaultvolume': {
                if (volume > 100 || volume < 1) {
                    return await interaction.reply({
                        ephemeral: true,
                        content: 'You have to specify a number between 1 and 100.',
                    });
                }

                await utility.setDefaultVolume(guild?.id || '', volume);
                serverSettings.defaultVolume = volume;

                return await interaction.reply({
                    ephemeral: true,
                    content: `✅ Set the default volume to \`${volume}%\`.`,
                });
            }
            case 'stealthmode': {
                await utility.setStealthMode(guild?.id || '', action || false);
                serverSettings.stealthMode = action || false;

                return await interaction.reply({
                    ephemeral: true,
                    content: `✅ Stealth mode has been ${action ? `\`enabled\`` : `\`disabled\``}.`,
                });
            }
            case 'songlimit': {
                if (limit < 0) {
                    return await interaction.reply({
                        ephemeral: true,
                        content: '⛔ Please specify a value greater than 0 or 0 if you wish to reset the song limit.',
                    });
                }

                await utility.setSongLimit(guild?.id || '', limit);
                serverSettings.songsPerUserLimit = limit;

                return await interaction.reply({
                    ephemeral: true,
                    content: `✅ Song limit has been set to \`${limit}\` songs per user.`,
                });
            }
            case 'queuelimit': {
                if (limit < 0 || limit > 420) {
                    return await interaction.reply({
                        ephemeral: true,
                        content:
                            '⛔ Please specify a value between 1 and 420, or 0 if you wish to reset the queue limit.',
                    });
                }

                await utility.setQueueLimit(guild?.id || '', limit);
                serverSettings.queueLimit = limit;

                return await interaction.reply({
                    ephemeral: true,
                    content: `✅ Queue-Length has been limited to \`${limit}\` songs.`,
                });
            }
            case 'spotifyfetching': {
                await utility.setSpotifyFetching(guild?.id || '', action || false);
                serverSettings.spotifyFetching = action || false;

                return await interaction.reply({
                    ephemeral: true,
                    content: `✅ Spotify link and cover art fetching have been ${
                        action ? `\`enabled\`` : `\`disabled\``
                    }.`,
                });
            }
        }
    },
} as UMCommand;
