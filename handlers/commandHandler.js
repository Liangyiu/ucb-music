"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ascii = require('ascii-table');
const fs_1 = __importDefault(require("fs"));
const rest_1 = require("@discordjs/rest");
const v10_1 = require("discord-api-types/v10");
require('dotenv').config();
async function default_1(client) {
    const table = new Ascii('Commands loaded');
    client.commandArray = [];
    client.testCommands = [];
    const commandFolders = await fs_1.default.readdirSync(`${process.cwd()}/commands`);
    for (let commandFolder of commandFolders) {
        const commandFiles = await fs_1.default.readdirSync(`${process.cwd()}/commands/${commandFolder}`).filter(file => file.endsWith('.js'));
        for (let file of commandFiles) {
            const command = require(`${process.cwd()}/commands/${commandFolder}/${file}`);
            if (!command.name) {
                table.addRow('NO_CMDNAME', '🛑 FAILED', 'Missing a name.');
                continue;
            }
            if (!command.description) {
                table.addRow(command.name, '🛑 FAILED', 'Missing a description.');
                continue;
            }
            client.commands.set(command.name, command);
            if (command.testOnly) {
                client.testCommands.push(command);
            }
            else {
                client.commandArray.push(command);
            }
            await table.addRow(command.name, '✅ SUCCESSFUL');
        }
    }
    console.log('\n' + table.toString());
    const rest = new rest_1.REST({ version: '10' }).setToken(process.env.TOKEN || '');
    try {
        console.log('Started refreshing application (/) commands.');
        if (client.testCommands.length > 0) {
            console.log('Registering test commands.');
            for (let testGuildId of client.testGuilds) {
                try {
                    await rest.put(v10_1.Routes.applicationGuildCommands(process.env.CLIENTID || '', testGuildId), { body: client.testCommands });
                }
                catch (error) {
                }
            }
        }
        else {
            console.log('Deleting test commands.');
            for (let testGuildId of client.testGuilds) {
                try {
                    await rest.put(v10_1.Routes.applicationGuildCommands(process.env.CLIENTID || '', testGuildId), { body: client.testCommands });
                }
                catch (error) {
                }
            }
        }
        console.log('Successfully reloaded application (/) commands.');
    }
    catch (error) {
        console.error(error);
    }
}
exports.default = default_1;
