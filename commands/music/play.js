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
    name: 'play',
    description: 'Plays a song or adds a song to the queue when a song is already playing',
    category: 'music',
    cooldown: 10,
    options: [
        {
            name: 'query',
            description: 'Provide a name or a URL for the song',
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    execute: function (interaction, client) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var guild, user, member, options, channel, voicechannel, permsInChannel, queue, query, error_1, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        guild = interaction.guild, user = interaction.user;
                        member = interaction.member;
                        options = interaction.options;
                        channel = interaction.channel;
                        voicechannel = member.voice.channel;
                        if (!!voicechannel) return [3 /*break*/, 2];
                        return [4 /*yield*/, interaction.reply({
                                ephemeral: true,
                                content: 'You must be in a voice channel to use the music commands.'
                            })];
                    case 1: return [2 /*return*/, _c.sent()];
                    case 2:
                        if (!(((_a = guild === null || guild === void 0 ? void 0 : guild.members.me) === null || _a === void 0 ? void 0 : _a.voice.channelId) && voicechannel.id !== guild.members.me.voice.channelId)) return [3 /*break*/, 4];
                        return [4 /*yield*/, interaction.reply({
                                ephemeral: true,
                                content: "I am already playing music in <#".concat(guild.members.me.voice.channelId, ">.")
                            })];
                    case 3: return [2 /*return*/, _c.sent()];
                    case 4: return [4 /*yield*/, voicechannel.permissionsFor(((_b = guild === null || guild === void 0 ? void 0 : guild.members.me) === null || _b === void 0 ? void 0 : _b.id) || '', true)];
                    case 5:
                        permsInChannel = _c.sent();
                        if (!!(permsInChannel === null || permsInChannel === void 0 ? void 0 : permsInChannel.has([
                            discord_js_1.PermissionsBitField.Flags.Connect,
                            discord_js_1.PermissionsBitField.Flags.Speak
                        ]))) return [3 /*break*/, 7];
                        return [4 /*yield*/, interaction.reply({
                                ephemeral: true,
                                content: '⛔ I am not able to join your channel.\nReason: \`missing permissions to connect/speak\`'
                            })];
                    case 6: return [2 /*return*/, _c.sent()];
                    case 7: return [4 /*yield*/, client.distube.getQueue(voicechannel)];
                    case 8:
                        queue = _c.sent();
                        return [4 /*yield*/, interaction.reply({
                                ephemeral: true,
                                content: '🎶 Request received.'
                            })];
                    case 9:
                        _c.sent();
                        query = options.getString('query') || '';
                        if (!(query.includes('spotify') && query.includes('track'))) return [3 /*break*/, 14];
                        _c.label = 10;
                    case 10:
                        _c.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, client.distube.play(voicechannel, query, { textChannel: channel, member: member })];
                    case 11:
                        _c.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        error_1 = _c.sent();
                        return [3 /*break*/, 13];
                    case 13: return [3 /*break*/, 17];
                    case 14:
                        _c.trys.push([14, 16, , 17]);
                        return [4 /*yield*/, client.distube.play(voicechannel, query, { textChannel: channel, member: member })];
                    case 15:
                        _c.sent();
                        return [3 /*break*/, 17];
                    case 16:
                        error_2 = _c.sent();
                        return [3 /*break*/, 17];
                    case 17: return [2 /*return*/];
                }
            });
        });
    }
};
