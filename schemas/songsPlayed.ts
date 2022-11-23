import mongoose from 'mongoose';

const reqString = {
    type: String,
    required: true
};

const reqNum = {
    type: Number,
    required: true
};

interface songPlayed {
    songTitle: String,
    songUrl: String,
    guildId: String,
    count: Number
};

interface songPlayedModel extends songPlayed, Document {};

const songsPlayedSchema = new mongoose.Schema({
    songTitle: reqString,
    songUrl: reqString,
    guildId: reqString,
    count: reqNum
});

const name = 'songs-played';

export default mongoose.models[name]<songPlayedModel> || mongoose.model<songPlayedModel>(name, songsPlayedSchema, name);