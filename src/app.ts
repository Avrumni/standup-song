import schedule from 'node-schedule';
import opn from 'opn';
import fs from 'fs';
const random = require('crypto-random');

const file = fs.readFileSync('./song.db.json', { encoding: 'utf8' });
const songs: Array<{
    name: string;
    seconds: number;
    minutes: number;
    url: string;
}> = JSON.parse(file);

schedule.scheduleJob('0 20 9 * * *', () => {
    const i = Math.floor(random.range(0, songs.length - 1));
    const song = songs[i];
    const secondsTillStandup = 10 * 60;
    const secondsForSong = song.seconds + (song.minutes * 60);
    const delaySeconds = secondsTillStandup - secondsForSong;

    console.log('"' + song.name + '" will play in ' + delaySeconds + ' seconds');
    setTimeout(() => {
        opn(song.url);
    }, delaySeconds * 1000)
});