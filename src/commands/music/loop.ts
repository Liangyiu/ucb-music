import {
    CommandInteraction,
    GuildMember,
    ApplicationCommandOptionType,
    CommandInteractionOptionResolver,
} from 'discord.js';
import UMClient from '../../interfaces/UMClient';

module.exports = {
    name: 'loop',
    description: 'Loops the queue or current song',
    category: 'music',

    cooldown: 10,

    options: [
        {
            name: 'action',
            description: 'Specify if you want to loop a the currently playing song or the queue',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'Song',
                    value: 'song',
                },
                {
                    name: 'Queue',
                    value: 'queue',
                },
                {
                    name: 'Disable',
                    value: 'disable',
                },
            ],
        },
    ],

    async execute(interaction: CommandInteraction, client: UMClient) {
        const { guild } = interaction;
        const member = interaction.member as GuildMember;
        const options = interaction.options as CommandInteractionOptionResolver;

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

        switch (options.getString('action')) {
            case 'song': {
                if (queue.repeatMode === 1) {
                    return await interaction.reply({
                        ephemeral: true,
                        content: `⛔ Looping-Mode is already set to \`song\`.`,
                    });
                }

                queue.setRepeatMode(1);

                return await interaction.reply({
                    ephemeral: true,
                    content: `✅ Looping-Mode switched to \`song\`.`,
                });
            }
            case 'queue': {
                if (queue.repeatMode === 2) {
                    return await interaction.reply({
                        ephemeral: true,
                        content: `⛔ Looping-Mode is already set to \`queue\`.`,
                    });
                }

                queue.setRepeatMode(2);

                return await interaction.reply({
                    ephemeral: true,
                    content: `✅ Looping-Mode switched to \`queue\`.`,
                });
            }
            case 'disable': {
                if (queue.repeatMode === 0) {
                    return await interaction.reply({
                        ephemeral: true,
                        content: `⛔ Looping-Mode is already set to \`disabled\`.`,
                    });
                }

                queue.setRepeatMode(0);

                return await interaction.reply({
                    ephemeral: true,
                    content: `✅ Looping-Mode switched to \`disabled\`.`,
                });
            }
        }
    },
};
