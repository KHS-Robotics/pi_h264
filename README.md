# Live streaming from Raspberry Pi using H.264
based on [broadway](https://github.com/mbebenita/Broadway)

## Prerequisites
1. [Node.js](https://www.w3schools.com/nodejs/nodejs_raspberrypi.asp)
2. [FFmpeg](https://www.ffmpeg.org/) v3.3 or greater (FYI, this has only been tested with v3.3.9)
3. a USB Camera

## Help Installing Node.js v10 on the Pi
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get update
sudo apt-get install -y nodejs
node -v
```

## Help Installing FFMPEG v3.3 on the Pi
```
# Add deb-multimedia
sudo sed -i '$a deb http://www.deb-multimedia.org stretch main non-free' /etc/apt/sources.list
wget http://www.deb-multimedia.org/pool/main/d/deb-multimedia-keyring/deb-multimedia-keyring_2016.8.1_all.deb
sudo dpkg -i deb-multimedia-keyring_2016.8.1_all.deb
rm deb-multimedia-keyring_2016.8.1_all.deb
sudo apt-get update

sudo apt-get install -y ffmpeg # run this if you don't have ffmpeg installed 
sudo apt-get install --only-upgrade -y ffmpeg # run this if you already have ffmpeg installed

ffmpeg -version
```

## Installing pi_h264
```
git clone https://github.com/Ernie3/pi_h264.git
cd pi_h264
npm install
npm start
```
Open http://your-raspberry-pi's-ip:9001 to view the stream.

## Configuration
See [config.json](https://github.com/Ernie3/pi_h264/blob/master/config.json).

## Controlling Camera Settings
The stream viewer offers a panel to control the camera's settings. However, to utilize this capability, you must have the [v4l2-ctl-rest-api](https://github.com/Ernie3/v4l2-ctl-rest-api) installed and running on the Pi. Edit the Camera ID  in `www/index.html` to match the camera you're using (0 for `/dev/video0` for instance).

## Setting up pi_h264 to Run on Boot
```
./service_manager.sh argument

install - installs pi_h264 service and enables start on boot
start - starts pi_h264 via systemctl (service must be installed)
stop - stops pi_h264 via systemctl (service must be installed)
enable - enables pi_h264 to start on boot (service must be installed)
disable - disables pi_h264 from starting on boot (service must be installed)
uninstall - completely removes pi_h264 service from systemctl
```

## Technical Description
The client (web browser) uses broadway (h264 software decoder) to decode NAL h264 packets and rendering the decoded frames to the html canvas. For receiving NAL h264 baseline packets from the server (Raspberry Pi), the client uses a websocket using socket.io. On the server, it uses the specified USB camera to get NAL baseline h264 packets from ffmpeg and sends it over the websocket to the client.  
