"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: 'seek',
    description: 'Seek to a specific time in the current song',
    category: 'music',
    cooldown: 5,
    options: [
        {
            name: 'seconds',
            description: 'Specify the number of seconds to seek to',
            type: discord_js_1.ApplicationCommandOptionType.Number,
            required: true,
        }
    ],
    async execute(interaction, client) {
        const { guild } = interaction;
        const options = interaction.options;
        const member = interaction.member;
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
        let seekSeconds = options.getNumber('seconds') || 0;
        if (seekSeconds <= 0) {
            return await interaction.reply({
                ephemeral: true,
                content: '⛔ You must specify a number of seconds greater than 0.',
            });
        }
        if (seekSeconds > queue.songs[0].duration) {
            return await interaction.reply({
                ephemeral: true,
                content: `⛔ The song is only ${queue.songs[0].duration} seconds long.`,
            });
        }
        if (seekSeconds === queue.songs[0].duration)
            seekSeconds -= 1;
        await queue.seek(seekSeconds);
        return await interaction.reply({
            ephemeral: true,
            content: `✅ Seeked to \`${seekSeconds}\` seconds.`,
        });
    }
};