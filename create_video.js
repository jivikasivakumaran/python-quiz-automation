const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');

ffmpeg.setFfmpegPath(ffmpegPath);

ffmpeg()
  .input('screenshot.png')
  .loop(10)
  .input('audio.mp3')
  .outputOptions([
    '-c:v libx264',
    '-tune stillimage',
    '-c:a aac',
    '-b:a 192k',
    '-pix_fmt yuv420p',
    '-shortest'
  ])
  .save('reel.mp4')
  .on('end', () => {
    console.log('Video created successfully!');
  })
  .on('error', (err) => {
    console.error('FFmpeg Error:', err);
  });