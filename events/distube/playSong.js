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
require('dotenv').config();
var status = function (queue) {
    return "Volume: `".concat(queue.volume, "%` | Filter: `").concat(queue.filters.names.join(', ') || 'Off', "` | Loop: `").concat(queue.repeatMode ? (queue.repeatMode === 2 ? 'Queue' : 'Song') : 'Off', "` | Autoplay: `").concat(queue.autoplay ? 'On' : 'Off', "`");
};
var buttonrow = new discord_js_1.ActionRowBuilder()
    .addComponents(new discord_js_1.ButtonBuilder()
    .setCustomId('pausebutton')
    .setEmoji('⏸️')
    .setStyle(discord_js_1.ButtonStyle.Secondary))
    .addComponents(new discord_js_1.ButtonBuilder()
    .setCustomId('previousbutton')
    .setEmoji('⏮️')
    .setStyle(discord_js_1.ButtonStyle.Secondary))
    .addComponents(new discord_js_1.ButtonBuilder()
    .setCustomId('stopbutton')
    .setEmoji('⏹️')
    .setStyle(discord_js_1.ButtonStyle.Secondary))
    .addComponents(new discord_js_1.ButtonBuilder()
    .setCustomId('skipbutton')
    .setEmoji('⏭️')
    .setStyle(discord_js_1.ButtonStyle.Secondary))
    .addComponents(new discord_js_1.ButtonBuilder()
    .setCustomId('queuebutton')
    .setEmoji('📃')
    .setStyle(discord_js_1.ButtonStyle.Secondary)
    //to be removed when error is fixed
    .setDisabled(true));
module.exports = {
    name: 'playSong',
    once: false,
    distube: true,
    execute: function (queue, song) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var textChannel, cpEmbed, msg;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        textChannel = queue.textChannel;
                        cpEmbed = new discord_js_1.EmbedBuilder();
                        if (!song.isLive) {
                            cpEmbed
                                .setColor('#66bccb')
                                .setTitle("<a:infinity_play:938203674226880582> `".concat(song.name, "`"))
                                .addFields({ name: 'Duration', value: "`".concat(song.formattedDuration, "`"), inline: true })
                                .addFields({
                                name: 'Queue-Length', value: "`".concat(queue.songs.length === 1 ? "".concat(queue.songs.length, "` song") : "".concat(queue.songs.length, "` songs"), " - `").concat(queue.formattedDuration, "`")
                            }, {
                                name: 'Queue-Status', value: status(queue)
                            })
                                .setFooter({ text: "Song requested by ".concat((_a = song.user) === null || _a === void 0 ? void 0 : _a.username), iconURL: (_b = song.user) === null || _b === void 0 ? void 0 : _b.displayAvatarURL() });
                        }
                        else {
                            cpEmbed
                                .setColor('#66bccb')
                                .setTitle("<a:infinity_play:938203674226880582> `".concat(song.name, "`"))
                                .addFields({ name: 'Duration', value: "`".concat(song.formattedDuration, "`"), inline: true })
                                .addFields({
                                name: 'Queue-Length', value: "`".concat(queue.songs.length === 1 ? "".concat(queue.songs.length, "` song") : "".concat(queue.songs.length, "` songs"), " - `").concat(queue.formattedDuration, "`")
                            }, {
                                name: 'Queue-Status', value: status(queue)
                            })
                                .setThumbnail('https://media.giphy.com/media/bjTLI4XtU0cQURvzqk/giphy.gif')
                                .setFooter({ text: "Song requested by ".concat((_c = song.user) === null || _c === void 0 ? void 0 : _c.username), iconURL: (_d = song.user) === null || _d === void 0 ? void 0 : _d.displayAvatarURL() });
                        }
                        return [4 /*yield*/, (textChannel === null || textChannel === void 0 ? void 0 : textChannel.send({
                                embeds: [cpEmbed],
                                // @ts-ignore
                                components: [buttonrow],
                            }))];
                    case 1:
                        msg = _f.sent();
                        return [4 /*yield*/, ((_e = queue.textChannel) === null || _e === void 0 ? void 0 : _e.messages.fetch().then(function (messages) {
                                messages.forEach(function (message) {
                                    var _a;
                                    if ((message.author.id === ((_a = queue.distube.client.application) === null || _a === void 0 ? void 0 : _a.id)) && message.id !== (msg === null || msg === void 0 ? void 0 : msg.id)) {
                                        try {
                                            message.delete();
                                        }
                                        catch (error) {
                                        }
                                    }
                                });
                            }))];
                    case 2:
                        _f.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
};
