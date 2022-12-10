import { CommandInteraction, GuildMember, ApplicationCommandOptionType, CommandInteractionOptionResolver, PermissionsBitField, GuildTextBasedChannel } from 'discord.js';
import UMClient from '../../interfaces/UMClient';
import UMCommand from '../../interfaces/UMCommand';

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
        }
    ],

    async execute(interaction: CommandInteraction, client: UMClient) {
        const { guild, user } = interaction;
        const member = interaction.member as GuildMember;
        const options = interaction.options as CommandInteractionOptionResolver;

        const channel = interaction.channel as GuildTextBasedChannel;
        const voicechannel = member.voice.channel;

        if (!voicechannel) {
            return await interaction.reply({
                ephemeral: true,
                content: 'You must be in a voice channel to use the music commands.'
            });
        }

        if (guild?.members.me?.voice.channelId && voicechannel.id !== guild.members.me.voice.channelId) {
            return await interaction.reply({
                ephemeral: true,
                content: `I am already playing music in <#${guild.members.me.voice.channelId}>.`
            });
        }

        const permsInChannel = await voicechannel.permissionsFor(guild?.members.me?.id || '', true);

        if (!permsInChannel?.has([
            PermissionsBitField.Flags.Connect,
            PermissionsBitField.Flags.Speak
        ])) {
            return await interaction.reply({
                ephemeral: true,
                content: '⛔ I am not able to join your channel.\nReason: \`missing permissions to connect/speak\`'
            })
        }

        const queue = await client.distube.getQueue(voicechannel);

        await interaction.reply({
            ephemeral: true,
            content: '🎶 Request received.'
        })

        const query = options.getString('query') || '';

        if (query.includes('spotify') && query.includes('track')) {
            try {
                await client.distube.play(voicechannel, query, { textChannel: channel, member: member })
            } catch (error) {

            }
        } else {
            try {
                await client.distube.play(voicechannel, query, { textChannel: channel, member: member })
            } catch (error) {

            }
        }
    }
} as UMCommand;