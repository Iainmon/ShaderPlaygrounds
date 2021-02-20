ffmpeg -r 60 -framerate 60 -start_number 0 -i %05d.png -vcodec h264 out.mp4

rm 0*.png
