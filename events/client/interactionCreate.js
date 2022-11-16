"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
module.exports = {
    name: 'interactionCreate',
    execute: function (interaction, client) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var guild, channel, member, command, guildCooldowns, commandCooldowns, cooldownEnd, timeLeft, cdDate, cdDate, commandCooldowns_1, cdDate, commandCooldowns, guildCooldowns_1, err_1, btnInteraction, member_1, guild_1, channel_1, cmd, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        guild = interaction.guild, channel = interaction.channel;
                        member = interaction.member;
                        if (!!interaction.inGuild()) return [3 /*break*/, 2];
                        return [4 /*yield*/, interaction.reply({
                                ephemeral: true,
                                content: '⛔ Commands can only be used in guilds!'
                            })];
                    case 1: return [2 /*return*/, _c.sent()];
                    case 2:
                        if (!interaction.isCommand()) return [3 /*break*/, 19];
                        command = client.commands.get(interaction.commandName);
                        if (!!command) return [3 /*break*/, 4];
                        return [4 /*yield*/, interaction.reply({
                                ephemeral: true,
                                embeds: [
                                    new discord_js_1.EmbedBuilder()
                                        .setColor('Red')
                                        .setDescription('⛔ An error occured.')
                                ]
                            })];
                    case 3: return [2 /*return*/, _c.sent()];
                    case 4:
                        if (!(((_a = command.permissions) === null || _a === void 0 ? void 0 : _a.length) > 0)) return [3 /*break*/, 6];
                        if (!!(member === null || member === void 0 ? void 0 : member.permissions.has(command.permissions))) return [3 /*break*/, 6];
                        return [4 /*yield*/, interaction.reply({
                                ephemeral: true,
                                content: '⛔ You do not have the permissions required to use this command.'
                            })];
                    case 5: return [2 /*return*/, _c.sent()];
                    case 6:
                        if (!command.cooldown) return [3 /*break*/, 15];
                        guildCooldowns = client.cmdCooldowns.get((guild === null || guild === void 0 ? void 0 : guild.id) || '');
                        if (!guildCooldowns) return [3 /*break*/, 14];
                        commandCooldowns = guildCooldowns.get(command.name);
                        if (!commandCooldowns) return [3 /*break*/, 12];
                        cooldownEnd = commandCooldowns.get(member.id);
                        if (!cooldownEnd) return [3 /*break*/, 10];
                        timeLeft = Math.round((cooldownEnd.getTime() - Date.now()) / 1000);
                        if (!(timeLeft > 0)) return [3 /*break*/, 8];
                        return [4 /*yield*/, interaction.reply({
                                ephemeral: true,
                                content: "\u26D4 You must wait `".concat(timeLeft, "` second(s) before using this command again.")
                            })];
                    case 7: return [2 /*return*/, _c.sent()];
                    case 8:
                        commandCooldowns.set(member.id, new Date(Date.now() + (command.cooldown * 1000)));
                        _c.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        cdDate = new Date(Date.now() + (command.cooldown * 1000));
                        commandCooldowns.set(member.id, cdDate);
                        _c.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        cdDate = new Date(Date.now() + (command.cooldown * 1000));
                        commandCooldowns_1 = new discord_js_1.Collection();
                        commandCooldowns_1.set(member.id, cdDate);
                        guildCooldowns.set(command.name, commandCooldowns_1);
                        _c.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        cdDate = new Date(Date.now() + (command.cooldown * 1000));
                        commandCooldowns = new discord_js_1.Collection();
                        commandCooldowns.set(member.id, cdDate);
                        guildCooldowns_1 = new discord_js_1.Collection();
                        guildCooldowns_1.set(command.name, commandCooldowns);
                        client.cmdCooldowns.set((guild === null || guild === void 0 ? void 0 : guild.id) || '', guildCooldowns_1);
                        _c.label = 15;
                    case 15:
                        _c.trys.push([15, 17, , 19]);
                        return [4 /*yield*/, command.execute(interaction, client)];
                    case 16:
                        _c.sent();
                        return [3 /*break*/, 19];
                    case 17:
                        err_1 = _c.sent();
                        console.log(err_1);
                        return [4 /*yield*/, interaction.reply({
                                content: '⛔ There was an error while executing this command!',
                                ephemeral: true,
                            })];
                    case 18:
                        _c.sent();
                        return [3 /*break*/, 19];
                    case 19:
                        if (!interaction.isButton()) return [3 /*break*/, 34];
                        btnInteraction = interaction;
                        member_1 = interaction.member, guild_1 = interaction.guild, channel_1 = interaction.channel;
                        cmd = void 0;
                        _b = btnInteraction.customId;
                        switch (_b) {
                            case 'pausebutton': return [3 /*break*/, 20];
                            case 'playbutton': return [3 /*break*/, 22];
                            case 'previousbutton': return [3 /*break*/, 24];
                            case 'stopbutton': return [3 /*break*/, 26];
                            case 'skipbutton': return [3 /*break*/, 28];
                            case 'queuebutton': return [3 /*break*/, 30];
                        }
                        return [3 /*break*/, 32];
                    case 20: return [4 /*yield*/, client.commands.get('pause')];
                    case 21:
                        cmd = _c.sent();
                        return [3 /*break*/, 32];
                    case 22: return [4 /*yield*/, client.commands.get('resume')];
                    case 23:
                        cmd = _c.sent();
                        return [3 /*break*/, 32];
                    case 24: return [4 /*yield*/, client.commands.get('previous')];
                    case 25:
                        cmd = _c.sent();
                        return [3 /*break*/, 32];
                    case 26: return [4 /*yield*/, client.commands.get('stop')];
                    case 27:
                        cmd = _c.sent();
                        return [3 /*break*/, 32];
                    case 28: return [4 /*yield*/, client.commands.get('skip')];
                    case 29:
                        cmd = _c.sent();
                        return [3 /*break*/, 32];
                    case 30: return [4 /*yield*/, client.commands.get('queue')];
                    case 31:
                        cmd = _c.sent();
                        return [3 /*break*/, 32];
                    case 32:
                        if (!cmd) return [3 /*break*/, 34];
                        return [4 /*yield*/, cmd.execute(interaction, client)];
                    case 33: return [2 /*return*/, _c.sent()];
                    case 34: return [2 /*return*/];
                }
            });
        });
    }
};
