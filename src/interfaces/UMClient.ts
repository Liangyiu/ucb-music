import { ApplicationCommandDataResolvable, Client, Collection } from "discord.js";
import { DisTube } from "distube";

export default interface UMClient extends Client {
    distube: DisTube,
    commands: any,
    testGuilds: string[],
    handleEvents: Function,
    handleCommands: Function,
    commandArray: ApplicationCommandDataResolvable[],
    testCommands: ApplicationCommandDataResolvable[],
    cmdCooldowns: Collection<string, Collection<string, Collection<string, Date>>>,
    botOwners: string[],
    serverSettings: Collection<string, Object>,
}

//Interface for the bot client, needed because of the use of typescript