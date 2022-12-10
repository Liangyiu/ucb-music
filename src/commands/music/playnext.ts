import {
    CommandInteraction,
    GuildMember,
    ApplicationCommandOptionType,
    CommandInteractionOptionResolver,
    GuildTextBasedChannel,
} from 'discord.js';
import { Song } from 'distube';
import UMClient from '../../interfaces/UMClient';
import UMCommand from '../../interfaces/UMCommand';

module.exports = {
    name: 'playnext',
    description: 'Puts the song in behind the now playing one',
    category: 'music',

    cooldown: 10,

    djOnly: true,

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

        const queue = await client.distube.getQueue(voicechannel);

        if (!queue) {
            return await interaction.reply({
                ephemeral: true,
                content: '⛔ I am currently not playing music.',
            });
        }

        const song = queue.songs[0] as Song;

        await interaction.reply({
            ephemeral: true,
            content: '🎶 Request received.',
        });

        try {
            await client.distube.play(voicechannel, options.getString('query') || '', {
                position: 1,
                textChannel: channel,
                member: member,
            });
        } catch (error) {}
    },
} as UMCommand;
