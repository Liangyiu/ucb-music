"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
module.exports = {
    name: 'ready',
    once: true,
    /**
     *
     * @param {Client} client
     */
    async execute(client) {
        await client.application?.commands.set(client.commandArray);
        console.log('The bot is ready!');
    }
};
