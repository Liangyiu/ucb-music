"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const utility_1 = __importDefault(require("../../utility/utility"));
module.exports = {
    name: 'stats',
    description: 'Look at some of the bots statistics',
    category: 'info',
    cooldown: 10,
    async execute(interaction, client) {
        // const commandsUsed = await utility.getCommmandsUsed();
        const songsPlayed = await utility_1.default.getSongsPlayedCount();
        const mostPlayedSong = await utility_1.default.getMostPlayedSong();
        const serverCount = client.guilds.cache.size;
        const userCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
        const embed = new discord_js_1.EmbedBuilder()
            .setColor('#43ac34')
            .addFields({
            name: 'Most Popular Song',
            value: `\`\`\`${mostPlayedSong}\`\`\``,
            inline: false,
        }, {
            name: 'Servers',
            value: `\`\`\`${serverCount}\`\`\``,
            inline: true,
        }, {
            name: 'Users',
            value: `\`\`\`${userCount}\`\`\``,
            inline: true,
        }, {
            name: 'Songs Played',
            value: `\`\`\`${songsPlayed}\`\`\``,
            inline: true,
        })
            .setFooter({
            text: 'Llama-Music Statistics',
            iconURL: client.user?.displayAvatarURL(),
        });
        return interaction.reply({
            ephemeral: true,
            embeds: [embed],
        });
    },
};
