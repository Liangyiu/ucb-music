const Ascii = require('ascii-table');
import fs from 'fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import UMClient from '../interfaces/UMClient';
require('dotenv').config();


export default async function (client: UMClient) {

    const table = new Ascii('Commands loaded')

    client.commandArray = [];
    client.testCommands = [];

    const commandFolders = await fs.readdirSync(`${process.cwd()}/dist/commands`);

    for (let commandFolder of commandFolders) {
        const commandFiles = await fs.readdirSync(`${process.cwd()}/dist/commands/${commandFolder}`).filter(file => file.endsWith('.js'));

        for (let file of commandFiles) {
            const command = require(`${process.cwd()}/dist/commands/${commandFolder}/${file}`);

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
            } else {
                client.commandArray.push(command);
            }

            await table.addRow(command.name, '✅ SUCCESSFUL')
        }
    }

    console.log('\n' + table.toString());

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN || '');

    try {
        console.log('Started refreshing application (/) commands.');

        if (client.testCommands.length > 0) {
            console.log('Registering test commands.');

            for (let testGuildId of client.testGuilds) {
                try {
                    await rest.put(
                        Routes.applicationGuildCommands(process.env.CLIENTID || '', testGuildId),
                        { body: client.testCommands },
                    );
                } catch (error) {
                    
                }
            }
        } else {
            console.log('Deleting test commands.');

            for (let testGuildId of client.testGuilds) {
                try {
                    await rest.put(
                        Routes.applicationGuildCommands(process.env.CLIENTID || '', testGuildId),
                        { body: client.testCommands },
                    );
                } catch (error) {
                    
                }
            }
        }



        console.log('Successfully reloaded application (/) commands.');

    } catch (error) {
        console.error(error);
    }
}