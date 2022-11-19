"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ascii = require('ascii-table');
const fs_1 = __importDefault(require("fs"));
async function default_1(client) {
    const table = new Ascii("Events Loaded");
    const eventFolders = await fs_1.default.readdirSync(`${process.cwd()}/events`);
    for (let eventFolder of eventFolders) {
        const eventFiles = await fs_1.default.readdirSync(`${process.cwd()}/events/${eventFolder}`).filter(file => file.endsWith('.js'));
        for (let file of eventFiles) {
            const event = require(`${process.cwd()}/events/${eventFolder}/${file}`);
            if (!event.distube) {
                if (event.once) {
                    client.once(event.name, (...args) => event.execute(...args, client));
                }
                else {
                    client.on(event.name, (...args) => event.execute(...args, client));
                }
            }
            else {
                client.distube.on(event.name, (...args) => event.execute(...args));
            }
            await table.addRow(event.name, '✅ SUCCESSFUL');
        }
    }
    console.log('\n' + table.toString());
}
exports.default = default_1;
