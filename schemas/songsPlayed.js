"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reqString = {
    type: String,
    required: true
};
const reqNum = {
    type: Number,
    required: true
};
;
;
const songsPlayedSchema = new mongoose_1.default.Schema({
    songTitle: reqString,
    songUrl: reqString,
    guildId: reqString,
    count: reqNum
});
const name = 'songs-played';
exports.default = (mongoose_1.default.models[name]) || mongoose_1.default.model(name, songsPlayedSchema, name);
