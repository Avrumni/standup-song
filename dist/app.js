"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_schedule_1 = __importDefault(require("node-schedule"));
const opn_1 = __importDefault(require("opn"));
const fs_1 = __importDefault(require("fs"));
const file = fs_1.default.readFileSync('./song.db.json', { encoding: 'utf8' });
const songs = JSON.parse(file);
node_schedule_1.default.scheduleJob('0 20 9 * * *', () => {
    const i = Math.floor(Math.random() * songs.length);
    const song = songs[i];
    const secondsTillStandup = 10 * 60;
    const secondsForSong = song.seconds + (song.minutes * 60);
    const delaySeconds = secondsTillStandup - secondsForSong;
    console.log('"' + song.name + '" will play in ' + delaySeconds + ' seconds');
    setTimeout(() => {
        opn_1.default(song.url);
    }, delaySeconds * 1000);
});
