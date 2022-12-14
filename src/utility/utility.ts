import songsPlayedSchema from '../schemas/songsPlayed';
import commandsUsedSchema from '../schemas/commandsUsed';
import serverSettingsSchema from '../schemas/serverSettings';
import UMServerSettings from '../interfaces/UMServerSettings';
import { GuildMember, PermissionsBitField } from 'discord.js';
import { Queue, Song } from 'distube';
import ytSpLinks from '../schemas/ytSpLinks';
import UMSong from '../interfaces/UMSong';
const PBF = require('progress-bar-formatter');

export default {
    async playedSong(songTitle: string, songUrl: string, guildId: string) {
        return await songsPlayedSchema.findOneAndUpdate(
            {
                songUrl: songUrl,
            },
            {
                songTitle: songTitle,
                guildId: guildId,
                $inc: { count: 1 },
            },
            {
                upsert: true,
            },
        );
    },

    async getSongsPlayedCount() {
        const response = await songsPlayedSchema.aggregate([
            {
                $group: {
                    _id: null,
                    count: {
                        $sum: '$count',
                    },
                },
            },
        ]);

        if (response) return response[0].count;
        else return 0;
    },

    async getMostPlayedSong() {
        const res = await songsPlayedSchema.aggregate([
            {
                $sort: {
                    count: -1,
                },
            },
            { $limit: 1 },
            {
                $group: {
                    _id: null,
                    value: {
                        $first: '$songTitle',
                    },
                },
            },
        ]);

        return res[0].value;
    },

    async commandUsed(cmdName: string) {
        return await commandsUsedSchema.findOneAndUpdate(
            {
                commandName: cmdName,
            },
            {
                $inc: { count: 1 },
            },
            {
                upsert: true,
            },
        );
    },

    async getCommandsUsedCount() {
        const res = await commandsUsedSchema.aggregate([
            {
                $group: {
                    _id: null,
                    count: {
                        $sum: '$count',
                    },
                },
            },
        ]);

        if (res) return res[0].count;
        else return 0;
    },

    async setDefaultServerSettings(guildId: string, everyoneId: string) {
        const defaultSettings = {
            buttonControls: true,
            adminRoleId: 'null',
            djRoleId: everyoneId,
            userRoleId: everyoneId,
            spotifyFetching: false,
            musicChannelId: 'null',
            loopMode: 0,
            autoplay: false,
            defaultVolume: 50,
            songsPerUserLimit: 0,
            stealthMode: false,
            queueLimit: 100,
        } as UMServerSettings;

        await serverSettingsSchema.findOneAndUpdate(
            {
                _id: guildId,
            },
            defaultSettings,
            {
                upsert: true,
            },
        );

        return defaultSettings;
    },

    async getServerSettings(guildId: string) {
        const settings = await serverSettingsSchema.findOne({
            _id: guildId,
        });

        if (!settings) {
            const defaultSettings = await this.setDefaultServerSettings(guildId, guildId);

            return defaultSettings;
        }

        return settings;
    },

    async setAdminRoleId(guildId: string, roleId: string) {
        if (guildId === roleId) {
            return await serverSettingsSchema.findOneAndUpdate(
                {
                    _id: guildId,
                },
                {
                    adminRoleId: 'null',
                },
            );
        }

        return await serverSettingsSchema.findOneAndUpdate(
            {
                _id: guildId,
            },
            {
                adminRoleId: roleId,
            },
        );
    },

    async setDjRoleId(guildId: string, roleId: string) {
        return await serverSettingsSchema.findOneAndUpdate(
            {
                _id: guildId,
            },
            {
                djRoleId: roleId,
            },
        );
    },

    async setUserRoleId(guildId: string, roleId: string) {
        const djRoleId = await this.getDjRoleId(guildId);

        if (djRoleId === guildId) {
            return await serverSettingsSchema.findOneAndUpdate(
                {
                    _id: guildId,
                },
                {
                    userRoleId: roleId,
                    djRoleId: roleId,
                },
            );
        }

        return await serverSettingsSchema.findOneAndUpdate(
            {
                _id: guildId,
            },
            {
                userRoleId: roleId,
            },
        );
    },

    async setMusicChannelId(guildId: string, channelId: string) {
        return await serverSettingsSchema.findOneAndUpdate(
            {
                _id: guildId,
            },
            {
                musicChannelId: channelId,
            },
        );
    },

    async setAutoplay(guildId: string, value: boolean) {
        return await serverSettingsSchema.findOneAndUpdate(
            {
                _id: guildId,
            },
            {
                autoplay: value,
            },
        );
    },

    async setButtonControls(guildId: string, value: boolean) {
        return await serverSettingsSchema.findOneAndUpdate(
            {
                _id: guildId,
            },
            {
                buttonControls: value,
            },
        );
    },

    async setSpotifyFetching(guildId: string, value: boolean) {
        return await serverSettingsSchema.findOneAndUpdate(
            {
                _id: guildId,
            },
            {
                spotifyFetching: value,
            },
        );
    },

    async setLoopMode(guildId: string, loopMode: number) {
        return await serverSettingsSchema.findOneAndUpdate(
            {
                _id: guildId,
            },
            {
                loopMode: loopMode,
            },
        );
    },

    async setDefaultVolume(guildId: string, value: number) {
        return await serverSettingsSchema.findOneAndUpdate(
            {
                _id: guildId,
            },
            {
                defaultVolume: value,
            },
        );
    },

    async setSongLimit(guildId: string, value: number) {
        return await serverSettingsSchema.findOneAndUpdate(
            {
                _id: guildId,
            },
            {
                songPerUserLimit: value,
            },
        );
    },

    async setStealthMode(guildId: string, action: boolean) {
        return await serverSettingsSchema.findOneAndUpdate(
            {
                _id: guildId,
            },
            {
                stealthMode: action,
            },
        );
    },

    async setQueueLimit(guildId: string, amount: number) {
        if (amount === 0) {
            return await serverSettingsSchema.findOneAndUpdate(
                {
                    _id: guildId,
                },
                {
                    queueLimit: 100,
                },
            );
        }

        return await serverSettingsSchema.findOneAndUpdate(
            {
                _id: guildId,
            },
            {
                queueLimit: amount,
            },
        );
    },

    async getDjRoleId(guildId: string) {
        const res = await serverSettingsSchema
            .findOne({
                _id: guildId,
            })
            .select({
                djRoleId: 1,
                _id: 0,
            });

        return res.djRoleId;
    },

    async hasAdminPerms(adminRoleId: string, member: GuildMember) {
        if (!member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            // inbuild discord admin role
            if (adminRoleId !== 'null') {
                if (!member.roles.cache.has(adminRoleId)) {
                    return false;
                }
            } else {
                return false;
            }
        }

        return true;
    },

    async hasDjPerms(serverSettings: UMServerSettings, member: GuildMember) {
        if (!member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            const adminRoleId = serverSettings.adminRoleId;
            const djRoleId = serverSettings.djRoleId;

            if (adminRoleId !== 'null') {
                if (!member.roles.cache.has(adminRoleId)) {
                    if (!member.roles.cache.has(djRoleId)) {
                        return false;
                    }
                }
            } else {
                if (!member.roles.cache.has(djRoleId)) {
                    return false;
                }
            }
        }

        return true;
    },

    async hasUserPerms(serverSettings: UMServerSettings, member: GuildMember) {
        if (!member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            const adminRoleId = serverSettings.adminRoleId;
            const djRoleId = serverSettings.djRoleId;
            const userRoleId = serverSettings.userRoleId;

            if (adminRoleId !== 'null') {
                if (!member.roles.cache.has(adminRoleId)) {
                    if (!member.roles.cache.has(djRoleId)) {
                        if (!member.roles.cache.has(userRoleId)) {
                            return false;
                        }
                    }
                }
            } else {
                if (!member.roles.cache.has(djRoleId)) {
                    if (!member.roles.cache.has(userRoleId)) {
                        return false;
                    }
                }
            }
        }

        return true;
    },

    async userCanAddSong(serverSettings: UMServerSettings, userId: string, songs: Song[]) {
        const songLimit = serverSettings.songsPerUserLimit;

        if (songLimit === 0) return true;
        else {
            const userSongs = await songs.map(song => {
                if (song.user?.id === userId) return true;
            });

            if (userSongs.length < songLimit) {
                return true;
            } else {
                return false;
            }
        }
    },

    async getSpotifyLink(ytLink: string) {
        const res = await ytSpLinks.findOne({
            _id: ytLink,
        });

        if (res) {
            return res.spotifyLink;
        }

        return undefined;
    },

    async setSpotifyLink(ytLink: string, spotifyLink: string) {
        return await ytSpLinks.findOneAndUpdate(
            {
                _id: ytLink,
            },
            {
                spotifyLink: spotifyLink,
            },
            {
                upsert: true,
            },
        );
    },

    async updateNowPlaying(queue: Queue) {
        const song = queue.songs[0] as UMSong;
        const message = song?.metadata.cpMessage;

        const status = (queue: Queue) =>
            `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${
                queue.repeatMode ? (queue.repeatMode === 2 ? 'Queue' : 'Song') : 'Off'
            }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;

        let qStatus = status(queue);
        const qLength = `\`${
            queue.songs.length === 1 ? `${queue.songs.length}\` song` : `${queue.songs.length}\` songs`
        } - \`${queue.formattedDuration}\``;

        const embed = message.embeds[0];

        let qStatusField;
        let qLengthField;

        if (song.isLive) {
            qStatusField = embed.fields[3];
            qLengthField = embed.fields[2];
        } else {
            const progressBar = new PBF({
                complete: '???',
                incomplete: '???',
                length: 15,
            });

            const progressBarField = embed.fields[2];
            progressBarField.value = `\`${queue.formattedCurrentTime} ${progressBar.format(
                queue.currentTime / song.duration,
            )} ${song.formattedDuration}\``;

            qStatusField = embed.fields[4];
            qLengthField = embed.fields[3];
        }

        let spotifyURL;

        if (song.metadata.spotifyLink) {
            spotifyURL = song.metadata.spotifyLink;
        } else if (song.url.includes('youtube') && !song.isLive) {
            spotifyURL = await this.getSpotifyLink(song.url);
        }

        if (!song.isLive && !song.url.includes('soundcloud') && !spotifyURL) {
            qStatus = qStatus;
        }

        qLengthField.value = qLength;
        qStatusField.value = qStatus;

        if (message) {
            await message.edit({
                embeds: [embed],
            });
        }

        return;
    },
};
