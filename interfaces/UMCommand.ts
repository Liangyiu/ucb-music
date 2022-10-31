import { ApplicationCommandOption,  } from "discord.js";

export default interface UMCommand {
    name: string,
    description: string,
    category: string,
    testOnly?: boolean,
    permissions?: any[],
    options?: ApplicationCommandOption[] | unknown,
    execute: Function,
    cooldown?: number,
    adminOnly?: boolean,
    userOnly?: boolean,
    djOnly?: boolean,
    ownerOnly?: boolean,
}