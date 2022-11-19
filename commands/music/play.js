"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: 'play',
    description: 'Plays a song or adds a song to the queue when a song is already playing',
    category: 'music',
    cooldown: 10,
    options: [
        {
            name: 'query',
            description: 'Provide a name or a URL for the song',
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    async execute(interaction, client) {
        const { guild, user } = interaction;
        const member = interaction.member;
        const options = interaction.options;
        const channel = interaction.channel;
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
            discord_js_1.PermissionsBitField.Flags.Connect,
            discord_js_1.PermissionsBitField.Flags.Speak
        ])) {
            return await interaction.reply({
                ephemeral: true,
                content: '⛔ I am not able to join your channel.\nReason: \`missing permissions to connect/speak\`'
            });
        }
        const queue = await client.distube.getQueue(voicechannel);
        await interaction.reply({
            ephemeral: true,
            content: '🎶 Request received.'
        });
        const query = options.getString('query') || '';
        if (query.includes('spotify') && query.includes('track')) {
            try {
                await client.distube.play(voicechannel, query, { textChannel: channel, member: member });
            }
            catch (error) {
            }
        }
        else {
            try {
                await client.distube.play(voicechannel, query, { textChannel: channel, member: member });
            }
            catch (error) {
            }
        }
    }
};
