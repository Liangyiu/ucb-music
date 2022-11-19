"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const distube_1 = require("distube");
const soundcloud_1 = require("@distube/soundcloud");
const spotify_1 = require("@distube/spotify");
const yt_dlp_1 = require("@distube/yt-dlp");
require('dotenv').config();
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildVoiceStates,
        discord_js_1.GatewayIntentBits.GuildMessageReactions
    ],
});
client.cmdCooldowns = new discord_js_1.Collection();
client.commands = new discord_js_1.Collection();
client.testGuilds = ['930884852776067083'];
client.botOwners = ['158551305952952320'];
client.distube = new distube_1.DisTube(client, {
    savePreviousSongs: true,
    leaveOnFinish: true,
    leaveOnEmpty: true,
    nsfw: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: (10 * 1024 * 1024)
    },
    youtubeCookie: 'CONSENT=YES+cb.20210518-05-p0.en-GB+FX+736; VISITOR_INFO1_LIVE=Ydpf1W8EpWk; _gcl_au=1.1.1568241444.1643665576; YSC=izFdC3iSJmA; wide=1; PREF=tz=Europe.Berlin&f5=30000&volume=100&f6=40000000&library_tab_browse_id=FEmusic_liked_playlists; HSID=AGyBeczOEkOy-9A6s; SSID=AhRBYKLmPGnRe9G7U; APISID=P9GLzm1uVLnUu7Ua/At77Lfi9OKdcsX-W0; SAPISID=MPhT-lmBSk49kMpw/AyHeY7PqyY3I1SSB5; __Secure-1PAPISID=MPhT-lmBSk49kMpw/AyHeY7PqyY3I1SSB5; __Secure-3PAPISID=MPhT-lmBSk49kMpw/AyHeY7PqyY3I1SSB5; GPS=1; SID=IQgw2A-cDEPCsA2n6pBt_i6df2aeA0eKcD_GPsf8PSgmB9MGPSqoyEykL0OX3wl-PY-A1Q.; __Secure-1PSID=IQgw2A-cDEPCsA2n6pBt_i6df2aeA0eKcD_GPsf8PSgmB9MGNFXmoxz0p0VDWkFdjmmuIQ.; __Secure-3PSID=IQgw2A-cDEPCsA2n6pBt_i6df2aeA0eKcD_GPsf8PSgmB9MGuTVBrBfyWB1ag6-POj7Iww.; LOGIN_INFO=AFmmF2swRgIhAJm8D8QhNmoG9eVdOOn81Pdo8yMNFq1wayrCNVb5gpEaAiEAvg45JJY49vGn3wVKPWbbuEPJkb4KPX6p8JEZF4WV3MA:QUQ3MjNmenlycHptcnN2MXU5eEJQOUc5YjRIMzAzeEhOeXZJVHZ0MkNkTWlZdUxZbjFsSnlleUZ0SDhUV3Z5bWJGMUczT0JnN0FsR0xwMEctbEdQTVFtQXJKTmkxWm1OZjFaUk9lQTFUb2p1ZmNrZkxReXdZaktsLXpacXdWTkZGZUdsdWJVVEt4bGhtQVY0TWNJMTdPYURGejRVbXh2SG9n; CONSISTENCY=AGDxDeMK1SQkaDUUGkpuYvKTWlLkgQFghcc2upFB-x5Z4G3CZfRRe1O-GC8mV2Thyt-ZX2Sb9vP0ksP6AKvgzvWl0w2Sdu4JfJrkQyFdwJkwfQfS_KqewGI49LP4ope1qx8mtRJ4iq_QuFd1O8XFxVg; SIDCC=AJi4QfH0aus5GnSll7AD7arraB8HHXPqVJte8ROV6oh4kxMgPpsmi5_-uwkJ481coa0weXoOAZak; __Secure-3PSIDCC=AJi4QfEcYrhKQu-gAP7GdGr3AmpjygAFV1Bfpw0T9shPJj55ZuHgYMWGqr3gHMnmFPWljSmsRbo',
    plugins: [new spotify_1.SpotifyPlugin({
            parallel: false,
            emitEventsAfterFetching: false,
            api: {
                clientId: process.env.SPOTIFYCLIENTID || '',
                clientSecret: process.env.SPOTIFYCLIENTSECRET || '',
            },
        }), new soundcloud_1.SoundCloudPlugin(), new yt_dlp_1.YtDlpPlugin({
            update: false
        })],
});
const eventHandler_1 = __importDefault(require("./handlers/eventHandler"));
const commandHandler_1 = __importDefault(require("./handlers/commandHandler"));
(0, eventHandler_1.default)(client);
(0, commandHandler_1.default)(client);
//antiCrash();
client.login(process.env.TOKEN);
