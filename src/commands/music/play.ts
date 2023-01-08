import {
    CommandInteraction,
    GuildMember,
    ApplicationCommandOptionType,
    CommandInteractionOptionResolver,
    PermissionsBitField,
    GuildTextBasedChannel,
    EmbedBuilder,
} from 'discord.js';
import UMClient from '../../interfaces/UMClient';
import UMCommand from '../../interfaces/UMCommand';
import UMServerSettings from '../../interfaces/UMServerSettings';
import UMSong from '../../interfaces/UMSong';
import utility from '../../utility/utility';

module.exports = {
    name: 'play',
    description: 'Plays a song or adds a song to the queue when a song is already playing',
    category: 'music',

    cooldown: 10,

    userOnly: true,

    options: [
        {
            name: 'query',
            description: 'Provide a name or a URL for the song',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    async execute(interaction: CommandInteraction, client: UMClient) {
        const { guild, user } = interaction;
        const member = interaction.member as GuildMember;
        const options = interaction.options as CommandInteractionOptionResolver;

        const channel = interaction.channel as GuildTextBasedChannel;
        const voicechannel = member.voice.channel;

        const serverSettings = client.serverSettings.get(guild?.id || '') as UMServerSettings;
        const hasDjPerms = await utility.hasDjPerms(serverSettings, member);

        if (!voicechannel) {
            return await interaction.reply({
                ephemeral: true,
                content: 'You must be in a voice channel to use the music commands.',
            });
        }

        if (guild?.members.me?.voice.channelId && voicechannel.id !== guild.members.me.voice.channelId) {
            return await interaction.reply({
                ephemeral: true,
                content: `I am already playing music in <#${guild.members.me.voice.channelId}>.`,
            });
        }

        const permsInChannel = await voicechannel.permissionsFor(guild?.members.me?.id || '', true);

        if (!permsInChannel?.has([PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.Speak])) {
            return await interaction.reply({
                ephemeral: true,
                content: '⛔ I am not able to join your channel.\nReason: `missing permissions to connect/speak`',
            });
        }

        const queue = await client.distube.getQueue(voicechannel);
        let msg;

        if (queue) {
            if (
                queue.songs.length === serverSettings.queueLimit ||
                (queue.songs.length || 0) > serverSettings.queueLimit
            ) {
                return await interaction.reply({
                    ephemeral: true,
                    content: `⛔ Not added to queue. Queue length limit of \`${serverSettings.queueLimit} songs\` is already reached.`,
                });
            }

            if (!hasDjPerms) {
                if (!(await utility.userCanAddSong(serverSettings, user.id, queue?.songs || []))) {
                    return await interaction.reply({
                        ephemeral: true,
                        content: `⛔ You can not add more songs to the queue.\nYou have reached the server set maximum of songs in the queue by one user.\n\`max songs per user = ${serverSettings.songsPerUserLimit}\``,
                    });
                }
            }

            const song = queue.songs[0] as UMSong;

            if (serverSettings.stealthMode) {
                msg = 'STEALTH MODE ENABLED';
            } else {
                msg = song.metadata.cpMessage;
            }
        } else {
            if (serverSettings.stealthMode) {
                msg = 'STEALTH MODE ENABLED';
            } else {
                msg = await channel?.send({
                    embeds: [new EmbedBuilder().setColor('#43ac34').setDescription('Initializing Queue...')],
                });
            }
        }

        await interaction.reply({
            ephemeral: true,
            content: '🎶 Request received.',
        });

        const query = options.getString('query') || '';

        if (query.includes('spotify') && query.includes('track')) {
            try {
                await client.distube.play(voicechannel, query, {
                    textChannel: channel,
                    member: member,
                    metadata: { cpMessage: msg, spotifyLink: query },
                });
            } catch (error) {
                await channel?.send({
                    content: `ERROR\n\`${error}\``,
                });
            }
        } else {
            try {
                await client.distube.play(voicechannel, query, {
                    textChannel: channel,
                    member: member,
                    metadata: { cpMessage: msg },
                });
            } catch (error) {
                await channel?.send({
                    content: `ERROR\n\`${error}\``,
                });
            }
        }
    },
} as UMCommand;
