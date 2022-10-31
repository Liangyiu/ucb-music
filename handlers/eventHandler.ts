const Ascii = require('ascii-table');
import fs from 'fs';
import UMClient from '../interfaces/UMClient';

export default async function (client: UMClient) {
    const table = new Ascii("Events Loaded");

    const eventFolders = await fs.readdirSync(`${process.cwd()}/events`);

    for (let eventFolder of eventFolders) {
        const eventFiles = await fs.readdirSync(`${process.cwd()}/events/${eventFolder}`).filter(file => file.endsWith('.js'));

        for (let file of eventFiles) {
            const event = require(`${process.cwd()}/events/${eventFolder}/${file}`);
            if (!event.distube) {
                if (event.once) {
                    client.once(event.name, (...args) => event.execute(...args, client));
                } else {
                    client.on(event.name, (...args) => event.execute(...args, client));
                }
            } else {
                client.distube.on(event.name, (...args: any[]) => event.execute(...args));
            }

            await table.addRow(event.name, '✅ SUCCESSFUL')
        }
    }

    console.log('\n' + table.toString())
}