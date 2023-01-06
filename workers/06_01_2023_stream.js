let video_content_type = 'video/mp4; codecs="avc1.64001E"';

function initiateDataAppendToMediaSource(ms, userId) {
  let videoDataQueue = [];
  let socket = new WebSocket("ws://192.168.0.175:6200/ws");
  socket.binaryType = "arraybuffer";
  socket.onopen = () => {
    console.log(userId, " USERID ");
    socket.send(userId);
  };
  ms.addEventListener("sourceopen", () => {
    let videoSourceBuffer = ms.addSourceBuffer(video_content_type);
    if (videoSourceBuffer.mode == "segments") {
      videoSourceBuffer.mode = "sequence";
    }
    socket.onmessage = (msg) => {
      if (typeof msg.data === "object") {
        videoDataQueue.push(msg.data);
        if (videoDataQueue.length > 0 && !videoSourceBuffer.updating) {
          videoSourceBuffer.appendBuffer(videoDataQueue.shift());
        }
      }
    };
    ms.addEventListener("updateend", () => {
      if (videoDataQueue.length > 0 && !videoSourceBuffer.updating) {
        videoSourceBuffer.appendBuffer(videoDataQueue.shift());
      }
    });
  });

}
