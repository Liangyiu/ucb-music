"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: 'remove',
    description: 'Removes a song with the supplied index from the queue',
    category: 'music',
    cooldown: 10,
    options: [
        {
            name: 'index',
            description: 'Index of the song you want to remove.',
            type: discord_js_1.ApplicationCommandOptionType.Number,
            required: true,
        },
    ],
    async execute(interaction, client) {
        const { guild } = interaction;
        const member = interaction.member;
        const options = interaction.options;
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
        const index = options.getNumber('index') || 0;
        if (index === 0) {
            await queue.skip();
            return await interaction.reply({
                ephemeral: true,
                content: '✅ Removed the currently playing song.',
            });
        }
        if (index < 0 || index >= queue.songs.length) {
            return await interaction.reply({
                ephemeral: true,
                content: '⛔ Index out of range.',
            });
        }
        const song = queue.songs[index];
        await queue.songs.splice(index, 1);
        interaction.reply({
            ephemeral: true,
            content: `✅ Successfully removed \`${song.name}\` from the queue.`,
        });
    },
};
