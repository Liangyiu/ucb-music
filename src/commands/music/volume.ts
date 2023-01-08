import {
    ApplicationCommandOptionType,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMember,
} from 'discord.js';
import UMClient from '../../interfaces/UMClient';
import UMCommand from '../../interfaces/UMCommand';
import utility from '../../utility/utility';

module.exports = {
    name: 'volume',
    description: 'Alters the queue volume',
    category: 'music',

    cooldown: 5,

    djOnly: true,

    options: [
        {
            name: 'percentage',
            description: '10 = 10%',
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
    ],

    async execute(interaction: CommandInteraction, client: UMClient) {
        const { guild } = interaction;
        const options = interaction.options as CommandInteractionOptionResolver;
        const member = interaction.member as GuildMember;

        const voicechannel = member.voice.channel;

        const volume = options.getNumber('percentage') || 0;

        if (volume > 100 || volume < 1) {
            return await interaction.reply({
                ephemeral: true,
                content: 'You have to specify a number between 1 and 100.',
            });
        }

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

        queue.setVolume(volume);

        try {
            await utility.updateNowPlaying(queue)
        } catch (error) {

        }

        return await interaction.reply({
            ephemeral: true,
            content: `🔊 Volume has been set to \`${volume}%\`.`,
        });
    },
} as UMCommand;
