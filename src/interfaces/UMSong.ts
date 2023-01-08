import { Message } from 'discord.js';
import { Song } from 'distube';

export default interface UMSong extends Song {
    metadata: {
        cpMessage: Message;
        spotifyLink: string;
    };
}
