# Live streaming from Raspberry Pi using H.264
based on [broadway](https://github.com/mbebenita/Broadway)

## Prerequisites
1. [Node.js](https://www.w3schools.com/nodejs/nodejs_raspberrypi.asp)
2. If you're using a USB camera, you need FFMPEG v3.3 or greater (FYI, this has only been tested with v3.3.9)
3. USB Camera (uses ffmpeg) or Camera for built in camera port (uses raspivid)

## Help Installing FFMPEG v3.3 on the Pi
1. Append `http://www.deb-multimedia.org stretch main non-free` to `/etc/apt/sources.list` via `sudo sed -i '$a deb http://www.deb-multimedia.org stretch main non-free' /etc/apt/sources.list`.
2. Download deb-multimedia-keyring package via `wget http://www.deb-multimedia.org/pool/main/d/deb-multimedia-keyring/deb-multimedia-keyring_2016.8.1_all.deb`
3. Install package via `sudo dpkg -i deb-multimedia-keyring_2016.8.1_all.deb`
4. `sudo apt-get update`
5. `sudo apt-get install -y ffmpeg`
	or if you already have ffmpeg installed run
	`sudo apt-get dist-upgrade`
6. Run `ffmpeg -version` to verify you have v3.3 installed

## Installing pi_h264
```
git clone https://github.com/Ernie3/pi_h264.git
cd pi_h264
npm install
npm start
```
Open http://your-raspberry-pi's-ip:8080 to view the stream.

## Configuration
See [config.json](https://github.com/Ernie3/pi_h264/blob/master/config.json).

## Description
In the browser, it uses broadway h264 software decoder to decode NAL h264 packets and rendering decoded frame to html canvas.
For receive NAL h264 baseline packets from the server (Raspberry Pi) it uses a websocket over socket.io.
On the server it uses the speciefied raspberry pi camera (raspivid or USB) to get NAL baseline h264 packets from spawned process and send it over socket.io.  
