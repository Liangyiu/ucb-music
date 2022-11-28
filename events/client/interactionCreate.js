"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const utility_1 = __importDefault(require("../../utility/utility"));
module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        const { guild, channel } = interaction;
        const member = interaction.member;
        if (!interaction.inGuild()) {
            return await interaction.reply({
                ephemeral: true,
                content: '⛔ Commands can only be used in guilds!'
            });
        }
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) {
                return await interaction.reply({
                    ephemeral: true,
                    embeds: [
                        new discord_js_1.EmbedBuilder()
                            .setColor('Red')
                            .setDescription('⛔ An error occured.')
                    ]
                });
            }
            if (command.permissions?.length > 0) {
                if (!member?.permissions.has(command.permissions)) {
                    return await interaction.reply({
                        ephemeral: true,
                        content: '⛔ You do not have the permissions required to use this command.'
                    });
                }
            }
            if (command.cooldown) {
                const guildCooldowns = client.cmdCooldowns.get(guild?.id || '');
                if (guildCooldowns) {
                    const commandCooldowns = guildCooldowns.get(command.name);
                    if (commandCooldowns) {
                        const cooldownEnd = commandCooldowns.get(member.id);
                        if (cooldownEnd) {
                            const timeLeft = Math.round((cooldownEnd.getTime() - Date.now()) / 1000);
                            if (timeLeft > 0) {
                                return await interaction.reply({
                                    ephemeral: true,
                                    content: `⛔ You must wait \`${timeLeft}\` second(s) before using this command again.`
                                });
                            }
                            else {
                                commandCooldowns.set(member.id, new Date(Date.now() + (command.cooldown * 1000)));
                            }
                        }
                        else {
                            const cdDate = new Date(Date.now() + (command.cooldown * 1000));
                            commandCooldowns.set(member.id, cdDate);
                        }
                    }
                    else {
                        const cdDate = new Date(Date.now() + (command.cooldown * 1000));
                        const commandCooldowns = new discord_js_1.Collection();
                        commandCooldowns.set(member.id, cdDate);
                        guildCooldowns.set(command.name, commandCooldowns);
                    }
                }
                else {
                    const cdDate = new Date(Date.now() + (command.cooldown * 1000));
                    const commandCooldowns = new discord_js_1.Collection();
                    commandCooldowns.set(member.id, cdDate);
                    const guildCooldowns = new discord_js_1.Collection();
                    guildCooldowns.set(command.name, commandCooldowns);
                    client.cmdCooldowns.set(guild?.id || '', guildCooldowns);
                }
            }
            try {
                await command.execute(interaction, client);
                await utility_1.default.commandUsed(command.name);
            }
            catch (err) {
                console.log(err);
                await interaction.reply({
                    content: '⛔ There was an error while executing this command!',
                    ephemeral: true,
                });
            }
        }
        if (interaction.isButton()) {
            const btnInteraction = interaction;
            const { member, guild, channel } = interaction;
            let cmd;
            switch (btnInteraction.customId) {
                case 'pausebutton': {
                    cmd = await client.commands.get('pause');
                    break;
                }
                case 'playbutton': {
                    cmd = await client.commands.get('resume');
                    break;
                }
                case 'previousbutton': {
                    cmd = await client.commands.get('previous');
                    break;
                }
                case 'stopbutton': {
                    cmd = await client.commands.get('stop');
                    break;
                }
                case 'skipbutton': {
                    cmd = await client.commands.get('skip');
                    break;
                }
                case 'queuebutton': {
                    cmd = await client.commands.get('queue');
                    break;
                }
            }
            if (cmd) {
                return await cmd.execute(interaction, client);
            }
        }
    }
};
