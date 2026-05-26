#!/bin/sh

ffmpeg -loop 1 -i output.png -i assets/music/music.mp3 \
-c:v libx264 -t 10 -pix_fmt yuv420p \
-vf scale=720:1280 \
-shortest assets/output/reel.mp4