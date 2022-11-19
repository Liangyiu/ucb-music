"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: 'searchNoResult',
    distube: true,
    execute(message, query) {
        message.channel.send({
            embeds: [
                new discord_js_1.EmbedBuilder()
                    .setColor('Red')
                    .setDescription(`⛔ No result found for \`${query}\`!`)
            ]
        });
    }
};
