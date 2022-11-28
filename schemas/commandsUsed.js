"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reqString = {
    type: String,
    required: true,
};
const reqNum = {
    type: Number,
    required: true,
};
;
const commandsUsedSchema = new mongoose_1.default.Schema({
    commandName: reqString,
    count: reqNum,
});
const name = 'commands-used';
exports.default = (mongoose_1.default.models[name]) || mongoose_1.default.model(name, commandsUsedSchema, name);
