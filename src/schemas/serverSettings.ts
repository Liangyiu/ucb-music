import mongoose from 'mongoose';

const reqString = {
    type: String,
    required: true
};
const bool = {
    type: Boolean,
    required: false,
};
const str = {
    type: String,
    required: false
};
const num = {
    type: Number,
    required: false
}

interface serverSettings {
    _id: String,
    buttonControls: Boolean,
    adminRoleId: String,
    djRoleId: String,
    userRoleId: String,
    spotifyFetching: Boolean,
    musicChannelId: String,
    loopMode: Number,
    autoplay: Boolean,
    defaultVolume: Number,
    songsPerUserLimit: Number,
    stealthMode: Boolean,
    queueLimit: Number,
};

interface serverSettingsModel extends serverSettings, Document {};

const serverSettingsSchema = new mongoose.Schema({
    _id: reqString,
    buttonControls: bool,
    adminRoleId: str,
    djRoleId: str,
    userRoleId: str,
    playlistsDjOnly: bool,
    spotifyFetching: bool,
    musicChannelId: str,
    loopMode: num,
    autoplay: bool,
    defaultVolume: num,
    songsPerUserLimit: num,
    stealthMode: bool,
    preventDuplicates: bool,
    queueLimit: num,
});

const name = 'server-settings';

export default mongoose.models[name]<serverSettingsModel> || mongoose.model<serverSettingsModel>(name, serverSettingsSchema, name);