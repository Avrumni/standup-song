import schedule from 'node-schedule';
import opn from 'opn';
import fs from 'fs';

const songs = [{
    name: 'Peter Gabriel- Sledge Hammer',
    minutes: 5,
    seconds: 45,
    url: 'https://www.youtube.com/watch?v=OJWJE0x7T4Q'
}, {
    name: 'The Glitch Mob - Between Two Points (feat. Swan)',
    minutes: 5,
    seconds: 33,
    url: 'https://www.youtube.com/watch?v=eHFx11tUO1M'
}, {
    name: 'Toto - Africa',
    minutes: 4,
    seconds: 35,
    url: 'https://www.youtube.com/watch?v=FTQbiNvZqaY'
}];

schedule.scheduleJob('0 * * * * *', () => {
    const i = Math.floor(Math.random() * songs.length);
    const song = songs[i];
    const secondsTillStandup = 10 * 60;
    const secondsForSong = song.seconds + (song.minutes * 60);
    const delaySeconds = secondsTillStandup - secondsForSong;

    console.log('"' + song.name + '" will play in ' + delaySeconds + ' seconds');
    setTimeout(() => {
        console.log('Play: ' + song.name);
        opn(song.url);
    }, delaySeconds * 1000)
});