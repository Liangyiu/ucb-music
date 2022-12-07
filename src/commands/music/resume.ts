import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, CommandInteraction, GuildMember, Message } from 'discord.js';
import UMClient from '../../interfaces/UMClient';
import UMCommand from '../../interfaces/UMCommand';

module.exports = {
    name: 'resume',
    description: 'Resumes playback',
    category: 'music',

    cooldown: 10,

    async execute(interaction: CommandInteraction, client: UMClient) {
        const { guild } = interaction;
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

        if (queue.playing) {
            return await interaction.reply({
                ephemeral: true,
                content: '⛔ Queue is already playing.',
            });
        }

        if (interaction.isButton()) {
            const btnInteraction = interaction as ButtonInteraction;
            const message = btnInteraction.message as Message;
            const row = message.components[0];

            if (row) {
                const updatedRow = new ActionRowBuilder();

                // @ts-ignore
                const button1 = ButtonBuilder.from(row.components[0]);
                // @ts-ignore
                const button2 = ButtonBuilder.from(row.components[1]);
                // @ts-ignore
                const button3 = ButtonBuilder.from(row.components[2]);
                // @ts-ignore
                const button4 = ButtonBuilder.from(row.components[3]);
                // @ts-ignore
                const button5 = ButtonBuilder.from(row.components[4]);

                button1.setCustomId('pausebutton');
                button1.setEmoji('⏸️');
                button2.setDisabled(false);
                button4.setDisabled(false);

                updatedRow.addComponents(button1, button2, button3, button4, button5);

                // @ts-ignore
                await message.edit({ components: [updatedRow] })
            }
        }

        await queue.resume();

        return await interaction.reply({
            ephemeral: true,
            content: '▶️ Song has been resumed.',
        });
    },
} as UMCommand;