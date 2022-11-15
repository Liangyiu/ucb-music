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
            var guild, channel, member, command, err_1, btnInteraction, member_1, guild_1, channel_1, cmd, _b;
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
                        if (!interaction.isCommand()) return [3 /*break*/, 10];
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
                        _c.trys.push([6, 8, , 10]);
                        return [4 /*yield*/, command.execute(interaction, client)];
                    case 7:
                        _c.sent();
                        return [3 /*break*/, 10];
                    case 8:
                        err_1 = _c.sent();
                        console.log(err_1);
                        return [4 /*yield*/, interaction.reply({
                                content: '⛔ There was an error while executing this command!',
                                ephemeral: true,
                            })];
                    case 9:
                        _c.sent();
                        return [3 /*break*/, 10];
                    case 10:
                        if (!interaction.isButton()) return [3 /*break*/, 25];
                        btnInteraction = interaction;
                        member_1 = interaction.member, guild_1 = interaction.guild, channel_1 = interaction.channel;
                        cmd = void 0;
                        _b = btnInteraction.customId;
                        switch (_b) {
                            case 'pausebutton': return [3 /*break*/, 11];
                            case 'playbutton': return [3 /*break*/, 13];
                            case 'previousbutton': return [3 /*break*/, 15];
                            case 'stopbutton': return [3 /*break*/, 17];
                            case 'skipbutton': return [3 /*break*/, 19];
                            case 'queuebutton': return [3 /*break*/, 21];
                        }
                        return [3 /*break*/, 23];
                    case 11: return [4 /*yield*/, client.commands.get('pause')];
                    case 12:
                        cmd = _c.sent();
                        return [3 /*break*/, 23];
                    case 13: return [4 /*yield*/, client.commands.get('resume')];
                    case 14:
                        cmd = _c.sent();
                        return [3 /*break*/, 23];
                    case 15: return [4 /*yield*/, client.commands.get('previous')];
                    case 16:
                        cmd = _c.sent();
                        return [3 /*break*/, 23];
                    case 17: return [4 /*yield*/, client.commands.get('stop')];
                    case 18:
                        cmd = _c.sent();
                        return [3 /*break*/, 23];
                    case 19: return [4 /*yield*/, client.commands.get('skip')];
                    case 20:
                        cmd = _c.sent();
                        return [3 /*break*/, 23];
                    case 21: return [4 /*yield*/, client.commands.get('queue')];
                    case 22:
                        cmd = _c.sent();
                        return [3 /*break*/, 23];
                    case 23:
                        if (!cmd) return [3 /*break*/, 25];
                        return [4 /*yield*/, cmd.execute(interaction, client)];
                    case 24: return [2 /*return*/, _c.sent()];
                    case 25: return [2 /*return*/];
                }
            });
        });
    }
};
