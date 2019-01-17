import fs from 'fs';
import opn from 'opn';

const random = require('crypto-random');
const notifier = require('node-notifier');

const file = fs.readFileSync('./song.db.json', {encoding: 'utf8'});
const songs: Array<{
    name: string;
    seconds: number;
    minutes: number;
    url: string;
}> = JSON.parse(file);

const i = Math.floor(random.range(0, songs.length - 1));
const song = songs[i];
const secondsTillStandup = 10 * 60;
const advertDelay = 30;
const secondsForSong = song.seconds + advertDelay + (song.minutes * 60);
const timeoutDelay: number = secondsTillStandup - secondsForSong;
const delayMinutes: string = ((timeoutDelay / 60) as number).toPrecision(2);
const delaySeconds: number = (timeoutDelay % 60);

notifier.notify({
    title: 'Standup Song',
    message: `"${song.name}" will play in ${delayMinutes} minutes and ${delaySeconds} seconds`
});

console.log('"' + song.name + '" will play in ' + timeoutDelay + ' seconds');
setTimeout(() => {
    opn(song.url);
}, timeoutDelay * 1000);
