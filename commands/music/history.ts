import {
    CommandInteraction,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    GuildMember,
    Message,
    ButtonStyle,
} from 'discord.js';
import { Song } from 'distube';
import UMClient from '../../interfaces/UMClient';
import UMCommand from '../../interfaces/UMCommand';

const getEmbeds = async (songs: Song[]) => {
    const embeds = [];

    const pageNum = Math.ceil(songs.length / 10);

    for (let i = 0; i < pageNum; i++) {
        let desc = '';

        for (let j = i * 10; j < songs.length && j < (i + 1) * 10; j++) {
            desc += `[${-songs.length + j}](${songs[j].url}) | \`${
                songs[j].name
            }\` - \`${songs[j].formattedDuration}\`\n`;
        }

        embeds.push(
            new EmbedBuilder()
                .setFooter({
                    text: `Page ${i + 1}/${pageNum}`,
                })
                .setDescription(desc)
                .setTitle('Queue')
                .setColor('#66bccb'),
        );
    }

    return embeds;
};

const getRow = (id: string, embeds: EmbedBuilder[]) => {
    const row = new ActionRowBuilder();

    row.addComponents(
        new ButtonBuilder()
            .setCustomId('prev_embed')
            .setEmoji('⬅️')
            // @ts-ignore
            .setDisabled(pages[id] === 0)
            .setStyle(ButtonStyle.Secondary),
    );

    row.addComponents(
        new ButtonBuilder()
            .setCustomId('next_embed')
            .setEmoji('➡️')
            // @ts-ignore
            .setDisabled(pages[id] === embeds.length - 1)
            .setStyle(ButtonStyle.Secondary),
    );

    return row;
};

const pages = {};

module.exports = {
    name: 'history',
    description: 'Shows a list of the previously played songs',
    category: 'music',

    cooldown: 10,

    async execute(interaction: CommandInteraction, client: UMClient) {
        const { guild } = interaction;
        const member = interaction.member as GuildMember;

        const voicechannel = member.voice.channel;

        if (!voicechannel) {
            return await interaction.reply({
                ephemeral: true,
                content:
                    'You must be in a voice channel to use the music commands.',
            });
        }

        if (
            guild?.members.me?.voice.channelId &&
            voicechannel.id !== guild.members.me.voice.channelId
        ) {
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

        if (!queue.previousSongs) {
            return await interaction.reply({
                ephemeral: true,
                content: '⛔ There are no previous songs.',
            });
        }

        if (queue.previousSongs.length === 0) {
            return await interaction.reply({
                ephemeral: true,
                content: '⛔ There are no previous songs.',
            });
        }

        const embeds = await getEmbeds(queue.previousSongs);

        const id = member.id;
        // @ts-ignore
        pages[id] = 0;

        // @ts-ignore
        const embed = embeds[pages[id]];

        const filter = (i: any) => i.user.id === member.id;
        const time = 1000 * 60 * 1;

        const msg = (await interaction.reply({
            fetchReply: true,
            ephemeral: true,
            embeds: [embed],
            // @ts-ignore
            components: [getRow(id, embeds)],
        })) as Message;

        const collector = msg.createMessageComponentCollector({
            filter,
            time,
        });

        collector.on('collect', (i: any) => {
            if (i.isButton()) {
                i.deferUpdate();

                if (
                    i.customId !== 'prev_embed' &&
                    i.customId !== 'next_embed'
                ) {
                    return;
                }
                // @ts-ignore
                if (i.customId === 'prev_embed' && pages[id] > 0) {
                    // @ts-ignore
                    --pages[id];
                    // @ts-ignore
                } else if (
                    i.customId === 'next_embed' &&
                    // @ts-ignore
                    pages[id] < embeds.length - 1
                ) {
                    // @ts-ignore
                    ++pages[id];
                }

                interaction.editReply({
                    // @ts-ignore
                    embeds: [embeds[pages[id]]],
                    //@ts-ignore
                    components: [getRow(id, embeds)],
                });
            }

            return;
        });
    },
} as UMCommand;
