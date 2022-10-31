"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Ascii = require('ascii-table');
var fs_1 = __importDefault(require("fs"));
var rest_1 = require("@discordjs/rest");
var v10_1 = require("discord-api-types/v10");
require('dotenv').config();
function default_1(client) {
    return __awaiter(this, void 0, void 0, function () {
        var table, commandFolders, _i, commandFolders_1, commandFolder, commandFiles, _a, commandFiles_1, file, command, rest, _b, _c, testGuildId, _d, _e, testGuildId, error_1;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    table = new Ascii('Commands loaded');
                    client.commandArray = [];
                    client.testCommands = [];
                    return [4 /*yield*/, fs_1.default.readdirSync("".concat(process.cwd(), "/commands"))];
                case 1:
                    commandFolders = _f.sent();
                    _i = 0, commandFolders_1 = commandFolders;
                    _f.label = 2;
                case 2:
                    if (!(_i < commandFolders_1.length)) return [3 /*break*/, 8];
                    commandFolder = commandFolders_1[_i];
                    return [4 /*yield*/, fs_1.default.readdirSync("".concat(process.cwd(), "/commands/").concat(commandFolder)).filter(function (file) { return file.endsWith('.js'); })];
                case 3:
                    commandFiles = _f.sent();
                    _a = 0, commandFiles_1 = commandFiles;
                    _f.label = 4;
                case 4:
                    if (!(_a < commandFiles_1.length)) return [3 /*break*/, 7];
                    file = commandFiles_1[_a];
                    command = require("".concat(process.cwd(), "/commands/").concat(commandFolder, "/").concat(file));
                    if (!command.name) {
                        table.addRow('NO_CMDNAME', '🛑 FAILED', 'Missing a name.');
                        return [3 /*break*/, 6];
                    }
                    if (!command.description) {
                        table.addRow(command.name, '🛑 FAILED', 'Missing a description.');
                        return [3 /*break*/, 6];
                    }
                    client.commands.set(command.name, command);
                    if (command.testOnly) {
                        client.testCommands.push(command);
                    }
                    else {
                        client.commandArray.push(command);
                    }
                    return [4 /*yield*/, table.addRow(command.name, '✅ SUCCESSFUL')];
                case 5:
                    _f.sent();
                    _f.label = 6;
                case 6:
                    _a++;
                    return [3 /*break*/, 4];
                case 7:
                    _i++;
                    return [3 /*break*/, 2];
                case 8:
                    console.log('\n' + table.toString());
                    rest = new rest_1.REST({ version: '10' }).setToken(process.env.TOKEN || '');
                    _f.label = 9;
                case 9:
                    _f.trys.push([9, 19, , 20]);
                    console.log('Started refreshing application (/) commands.');
                    if (!(client.testCommands.length > 0)) return [3 /*break*/, 14];
                    console.log('Registering test commands.');
                    _b = 0, _c = client.testGuilds;
                    _f.label = 10;
                case 10:
                    if (!(_b < _c.length)) return [3 /*break*/, 13];
                    testGuildId = _c[_b];
                    return [4 /*yield*/, rest.put(v10_1.Routes.applicationGuildCommands(process.env.CLIENTID || '', testGuildId), { body: client.testCommands })];
                case 11:
                    _f.sent();
                    _f.label = 12;
                case 12:
                    _b++;
                    return [3 /*break*/, 10];
                case 13: return [3 /*break*/, 18];
                case 14:
                    console.log('Deleting test commands.');
                    _d = 0, _e = client.testGuilds;
                    _f.label = 15;
                case 15:
                    if (!(_d < _e.length)) return [3 /*break*/, 18];
                    testGuildId = _e[_d];
                    return [4 /*yield*/, rest.put(v10_1.Routes.applicationGuildCommands(process.env.CLIENTID || '', testGuildId), { body: client.testCommands })];
                case 16:
                    _f.sent();
                    _f.label = 17;
                case 17:
                    _d++;
                    return [3 /*break*/, 15];
                case 18:
                    console.log('Successfully reloaded application (/) commands.');
                    return [3 /*break*/, 20];
                case 19:
                    error_1 = _f.sent();
                    console.error(error_1);
                    return [3 /*break*/, 20];
                case 20: return [2 /*return*/];
            }
        });
    });
}
exports.default = default_1;
