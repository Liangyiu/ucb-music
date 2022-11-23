import songsPlayedSchema from "../schemas/songsPlayed";

export default {
    async playedSong(songTitle: string, songUrl: string, guildId: string) {
        return await songsPlayedSchema.findOneAndUpdate({
            songUrl: songUrl,
        }, {
            songTitle: songTitle,
            guildId: guildId,
            $inc: { count: 1 }
        }, {
            upsert: true
        })
    },
}