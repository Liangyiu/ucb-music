"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
async function default_1(client) {
    mongoose_1.default.connection.on('connected', () => {
        console.log('Database connected.');
    });
    mongoose_1.default.connection.on('error', (error) => {
        console.log(`Database Error: ${error}`);
    });
    mongoose_1.default.connection.on('disconnect', () => {
        console.log('Database disconencted.');
    });
    mongoose_1.default.Promise = global.Promise;
    await mongoose_1.default.connect(process.env.MONGOURI || '', {
        keepAlive: true
    });
}
exports.default = default_1;
