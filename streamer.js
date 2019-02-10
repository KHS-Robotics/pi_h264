var spawn = require('child_process').spawn;
const Split = require('stream-split');
const fs = require("fs")
const NALseparator = Buffer.from([0,0,0,1]);//NAL break

function start(socket) {
	console.log("==> starting stream")

	const config = require('./config.json');
	console.log("CONFIGURATION =>", config);

	var proc=spawn("ffmpeg",[
		"-s",config.width+"x"+config.height,
		"-re",
		"-framerate",config.fps+"",
		"-i",fs.realpathSync(config.device),
		// "-i","/home/pi/360.mp4",
		"-c:v","libx264",
		"-b:v",config.bitrate,
		"-an",
		"-profile:v","baseline",//baseline
		//"-vf","drawtext='fontfile=/home/pi/ffmpeg/freefont/FreeSans.ttf:text=%{localtime\}':fontsize=50:fontcolor=yellow@1:box=1:boxcolor=red@0.9:x=(w-tw)/2:y=10",
		"-loglevel","error",
		"-stats",
		"-tune","zerolatency",
		"-f","h264",
		"-pix_fmt","yuv420p",
		"-preset","ultrafast",
		//"-reset_timestamps", "1",
		//"-movflags","isml+empty_moov+faststart",//+faststart//"frag_keyframe+empty_moov",
		//"-fflags","nobuffer",
		//"-frag_duration","5",
		"-y",
		//"cam_video.mp4"
		"-"
	])

	var rawstream=proc.stdout.pipe(new Split(NALseparator))

	//read data from file
	//ffmpeg -i 360.mp4 -c:v h264 -vprofile baseline -b:v config.bitrate -s 640x360 -y baseline.h264
	//var readStream=fs.createReadStream("/home/pi/baselinepi2.h264")
	//var rawstream=readStream.pipe(new Split(NALseparator))

	rawstream.on("data",function(data){
		//broadcast(Buffer.concat([NALseparator, data]))
			socket.emit("nal_packet",Buffer.concat([NALseparator, data]))
		//socket.send(Buffer.concat([NALseparator, data]))
	})


	// function broadcast(data){
	// 	stream.clients.forEach(function(socket) {
	// 		socket.send(data,{ binary: true})
	// 	})//clients
	// }//broadcast


	proc.stderr.on("data",function(data){
		let d = data.toString();
		console.log("==> sdterr: " + d)

		// Ouch
		if(d.includes("Device or resource busy")) {
			console.log("Device busy... exiting program.")
			process.exit(1);
		}
	})

	proc.on("close",function(code){
		console.log("process exit with code: "+code)
	})

	return proc
}//start

exports.start=start
