"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
module.exports = {
    name: 'error',
    distube: true,
    execute: function (channel, e) {
        if (e.errorCode === 'VOICE_MISSING_PERMS') {
            return channel.send({
                embeds: [
                    new discord_js_1.EmbedBuilder()
                        .setColor('Red')
                        .setTitle('⛔ ERROR')
                        .setDescription("Missing permissions to join your channel.")
                ]
            });
        }
        console.log(e);
        return channel.send({
            embeds: [
                new discord_js_1.EmbedBuilder()
                    .setColor('Red')
                    .setTitle('⛔ ERROR')
                    .setDescription("".concat(e.toString().slice(0, 1974)))
            ]
        });
    }
};
