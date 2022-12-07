import mongoose from 'mongoose';

const reqString = {
    type: String,
    required: true,
};

const reqNum = {
    type: Number,
    required: true,
};

interface commandUsed {
    commandName: String;
    count: Number;
}

interface commandUsedModel extends commandUsed, Document {};

const commandsUsedSchema = new mongoose.Schema({
    commandName: reqString,
    count: reqNum,
});

const name = 'commands-used';

export default mongoose.models[name]<commandUsedModel> || mongoose.model<commandUsedModel>(name, commandsUsedSchema, name);
