"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
module.exports = {
    name: 'searchNoResult',
    distube: true,
    execute: function (message, query) {
        message.channel.send({
            embeds: [
                new discord_js_1.EmbedBuilder()
                    .setColor('Red')
                    .setDescription("\u26D4 No result found for `".concat(query, "`!"))
            ]
        });
    }
};
