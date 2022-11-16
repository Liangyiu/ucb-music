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
    name: 'resume',
    description: 'Resumes playback',
    category: 'music',
    cooldown: 10,
    execute: function (interaction, client) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var guild, member, voicechannel, queue, btnInteraction, message, row, updatedRow, button1, button2, button3, button4, button5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        guild = interaction.guild;
                        member = interaction.member;
                        voicechannel = member.voice.channel;
                        if (!!voicechannel) return [3 /*break*/, 2];
                        return [4 /*yield*/, interaction.reply({
                                ephemeral: true,
                                content: 'You must be in a voice channel to use the music commands.',
                            })];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2:
                        if (!(((_a = guild === null || guild === void 0 ? void 0 : guild.members.me) === null || _a === void 0 ? void 0 : _a.voice.channelId) && voicechannel.id !== guild.members.me.voice.channelId)) return [3 /*break*/, 4];
                        return [4 /*yield*/, interaction.reply({
                                ephemeral: true,
                                content: "I am playing music in <#".concat(guild.members.me.voice.channelId, ">. Join the channel to use the music commands."),
                            })];
                    case 3: return [2 /*return*/, _b.sent()];
                    case 4: return [4 /*yield*/, client.distube.getQueue(voicechannel)];
                    case 5:
                        queue = _b.sent();
                        if (!!queue) return [3 /*break*/, 7];
                        return [4 /*yield*/, interaction.reply({
                                ephemeral: true,
                                content: '⛔ I am currently not playing music.',
                            })];
                    case 6: return [2 /*return*/, _b.sent()];
                    case 7:
                        if (!queue.playing) return [3 /*break*/, 9];
                        return [4 /*yield*/, interaction.reply({
                                ephemeral: true,
                                content: '⛔ Queue is already playing.',
                            })];
                    case 8: return [2 /*return*/, _b.sent()];
                    case 9:
                        if (!interaction.isButton()) return [3 /*break*/, 11];
                        btnInteraction = interaction;
                        message = btnInteraction.message;
                        row = message.components[0];
                        if (!row) return [3 /*break*/, 11];
                        updatedRow = new discord_js_1.ActionRowBuilder();
                        button1 = discord_js_1.ButtonBuilder.from(row.components[0]);
                        button2 = discord_js_1.ButtonBuilder.from(row.components[1]);
                        button3 = discord_js_1.ButtonBuilder.from(row.components[2]);
                        button4 = discord_js_1.ButtonBuilder.from(row.components[3]);
                        button5 = discord_js_1.ButtonBuilder.from(row.components[4]);
                        button1.setCustomId('pausebutton');
                        button1.setEmoji('⏸️');
                        button2.setDisabled(false);
                        button4.setDisabled(false);
                        updatedRow.addComponents(button1, button2, button3, button4, button5);
                        // @ts-ignore
                        return [4 /*yield*/, message.edit({ components: [updatedRow] })];
                    case 10:
                        // @ts-ignore
                        _b.sent();
                        _b.label = 11;
                    case 11: return [4 /*yield*/, queue.resume()];
                    case 12:
                        _b.sent();
                        return [4 /*yield*/, interaction.reply({
                                ephemeral: true,
                                content: '▶️ Song has been resumed.',
                            })];
                    case 13: return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
};
