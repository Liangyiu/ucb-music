import { CommandInteraction, EmbedBuilder, ButtonInteraction, Collection, GuildMember } from "discord.js";
import UMClient from "../../interfaces/UMClient";
import UMServerSettings from "../../interfaces/UMServerSettings";
import utility from '../../utility/utility';

module.exports = {
    name: 'interactionCreate',
    
    async execute(interaction: CommandInteraction, client: UMClient) {
        const { guild, channel } = interaction;
        const member = interaction.member as GuildMember;


        if (!interaction.inGuild()) {
            return await interaction.reply({
                ephemeral: true,
                content: '⛔ Commands can only be used in guilds!'
            })
        }

        let serverSettings = client.serverSettings.get(guild?.id || '') as UMServerSettings;

        if (!serverSettings) {
            serverSettings = await utility.getServerSettings(guild?.id || '');

            client.serverSettings.set(guild?.id || '', serverSettings);
        }

        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName)
            if (!command) {
                return await interaction.reply({
                    ephemeral: true,
                    embeds: [
                        new EmbedBuilder()
                            .setColor('Red')
                            .setDescription('⛔ An error occured.')
                    ]
                })
            }

            if (command.permissions?.length > 0) {
                if (!member?.permissions.has(command.permissions)) {
                    return await interaction.reply({
                        ephemeral: true,
                        content: '⛔ You do not have the permissions required to use this command.'
                    })
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
                                })
                            } else {
                                commandCooldowns.set(member.id, new Date(Date.now() + (command.cooldown * 1000)));
                            }
                        } else {
                            const cdDate = new Date(Date.now() + (command.cooldown * 1000));
                            commandCooldowns.set(member.id, cdDate);
                        }
                    }
                    else {
                        const cdDate = new Date(Date.now() + (command.cooldown * 1000));

                        const commandCooldowns = new Collection() as Collection<string, Date>;
                        commandCooldowns.set(member.id, cdDate);

                        guildCooldowns.set(command.name, commandCooldowns);
                    }
                }
                else {
                    const cdDate = new Date(Date.now() + (command.cooldown * 1000));

                    const commandCooldowns = new Collection() as Collection<string, Date>;
                    commandCooldowns.set(member.id, cdDate);

                    const guildCooldowns = new Collection() as Collection<string, Collection<string, Date>>;
                    guildCooldowns.set(command.name, commandCooldowns);

                    client.cmdCooldowns.set(guild?.id || '', guildCooldowns);
                }
            }

            if (command.adminOnly) {
                if (!await utility.hasAdminPerms(serverSettings.adminRoleId, member)) {
                    return await interaction.reply({
                        ephemeral: true,
                        content: '⛔ Did not execute command.\nReason: \`command is admin-only\`'
                    })
                }
            }

            if (command.djOnly) {
                if (!await utility.hasDjPerms(serverSettings, member)) {
                    return await interaction.reply({
                        ephemeral: true,
                        content: '⛔ Did not execute command.\nReason: \`command is dj-only\`'
                    })
                }
            }

            if (command.userOnly) {
                if (!await utility.hasUserPerms(serverSettings, member)) {
                    return await interaction.reply({
                        ephemeral: true,
                        content: '⛔ Did not execute command.\nReason: \`command is user-only\`'
                    })
                }
            }

            try {
                await command.execute(interaction, client);

                await utility.commandUsed(command.name);
            } catch (err) {
                console.log(err);

                await interaction.reply({
                    content: '⛔ There was an error while executing this command!',
                    ephemeral: true,
                })
            }
        }

        if (interaction.isButton()) {
            const btnInteraction = interaction as ButtonInteraction;

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
}