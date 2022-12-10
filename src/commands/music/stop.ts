import { CommandInteraction, GuildMember } from "discord.js";
import UMClient from "../../interfaces/UMClient";
import UMCommand from "../../interfaces/UMCommand";
import UMServerSettings from "../../interfaces/UMServerSettings";
import utility from "../../utility/utility";

module.exports = {
    name: 'stop',
    description: 'Stops the current queue',
    category: 'music',

    cooldown: 10,

    async execute(interaction: CommandInteraction, client: UMClient) {
        const { guild } = interaction;
        const member = interaction.member as GuildMember;

        const voicechannel = member.voice.channel;

        let serverSettings = client.serverSettings.get(guild?.id || '') as UMServerSettings;

        if (!await utility.hasDjPerms(serverSettings, member)) {
            return await interaction.reply({
                ephemeral: true,
                content: '⛔ Did not execute the command.\nReason: \`dj-only\`'
            })
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

        await queue.stop();
        
        return await interaction.reply({
            ephemeral: true,
            content: '⏹️ Queue has been stopped.',
        });
    },
} as UMCommand;