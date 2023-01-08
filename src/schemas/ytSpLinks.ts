import mongoose from 'mongoose';

const reqString = {
    type: String,
    required: true
};

interface ytSpLink {
    _id: string,
    spotifyLink: string
}

interface ytSpLinksModel extends ytSpLink, Document {};


const ytSpLinksSchema = new mongoose.Schema({
    _id: reqString,
    spotifyLink: reqString,
});

const name = 'yt-sp-links';

export default mongoose.models[name]<ytSpLinksModel> || mongoose.model<ytSpLinksModel>(name, ytSpLinksSchema, name);