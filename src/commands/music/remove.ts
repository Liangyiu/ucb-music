import {
    CommandInteraction,
    GuildMember,
    ApplicationCommandOptionType,
    CommandInteractionOptionResolver,
} from 'discord.js';
import UMClient from '../../interfaces/UMClient';
import UMCommand from '../../interfaces/UMCommand';
import UMServerSettings from '../../interfaces/UMServerSettings';
import utility from '../../utility/utility';

module.exports = {
    name: 'remove',
    description: 'Removes a song with the supplied index from the queue',
    category: 'music',

    cooldown: 10,

    userOnly: true,

    options: [
        {
            name: 'index',
            description: 'Index of the song you want to remove.',
            type: ApplicationCommandOptionType.Number,
            required: true,
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

        const serverSettings = client.serverSettings.get(guild?.id || '') as UMServerSettings;
        
        if (song?.user?.id !== member.id) {
            if (!await utility.hasDjPerms(serverSettings, member)){
                return await interaction.reply({
                    ephemeral: true,
                    content: '⛔ Users can only remove songs they added themselves.'
                })
            }
        }

        await queue.songs.splice(index, 1);

        interaction.reply({
            ephemeral: true,
            content: `✅ Successfully removed \`${song.name}\` from the queue.`,
        });
    },
} as UMCommand;
