import {
    ApplicationCommandOptionType,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMember,
} from 'discord.js';
import UMClient from '../../interfaces/UMClient';
import UMCommand from '../../interfaces/UMCommand';

module.exports = {
    name: 'jump',
    description: 'Jumps forwards or backwards in the queue/history',
    category: 'music',

    options: [
        {
            name: 'position',
            description: 'The position to jump to - can be positive or negative',
            required: true,
            type: ApplicationCommandOptionType.Number,
        },
    ],

    cooldown: 10,

    djOnly: true,

    async execute(interaction: CommandInteraction, client: UMClient) {
        const { guild } = interaction;
        const options = interaction.options as CommandInteractionOptionResolver;
        const member = interaction.member as GuildMember;

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
                content: `I am playing music in <#${guild.members.me.voice.channelId}>. Join the channel to use the music commands.`,
            });
        }

        const queue = await client.distube.getQueue(voicechannel);

        if (!queue) {
            return await interaction.reply({
                ephemeral: true,
                content: '⛔ I am currently not playing music.',
            });
        }

        const position = options.getNumber('position') || 0;

        if (position === 0) {
            return await interaction.reply({
                ephemeral: true,
                content: '⛔ You must specify a position greater or smaller than 0.',
            });
        }

        if (position > 0) {
            if (position >= queue.songs.length) {
                return await interaction.reply({
                    ephemeral: true,
                    content: '⛔ This position is out of reach.',
                });
            }

            if (position === 1) {
                await queue.skip();
            } else {
                await queue.jump(position);
            }

            return await interaction.reply({
                ephemeral: true,
                content: `✅ Jumped to position \`${position}\`.`,
            });
        } else if (position < 0) {
            if (position < -queue.previousSongs.length) {
                return await interaction.reply({
                    ephemeral: true,
                    content: '⛔ This position is out of reach.',
                });
            }

            if (position === -1) {
                await queue.previous();
            } else {
                await queue.jump(position);
            }

            return await interaction.reply({
                ephemeral: true,
                content: `✅ Jumped to position \`${position}\`.`,
            });
        }
    },
} as UMCommand;
