onmessage = function (userId) {
    try {
        let socket = new WebSocket("ws://192.168.0.175:6200/ws");
        socket.binaryType = "arraybuffer";
        console.log(userId.data);
        socket.onopen = () => {
          socket.send(String(userId.data));
        };
      
        socket.onmessage = (msg) => {
          try {
            postMessage(msg.data);
          } catch (error) {
            postMessage("Error at replying from worker");
            console.log(error);
          }
      
          // first_video_append = false;
      
          /*
            
            ffmpeg -rtsp_transport tcp -hwaccel d3d11va -i rtsp://admin:b0l!n@p$t$@192.168.0.132/live/av0 -filter:v fps=60 -s 720*430 -b:v 8192K -maxrate 9000K -minrate 8192k -bufsize 6M -f webm -c:v libvpx -an http://192.168.0.229:6200/stream_from_ffmpeg
      
            #ffmpeg -rtsp_transport tcp -i rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4 
            # -f webm -c:v libvpx -crf 10 -b:v 1M -c:a libvorbis http://192.168.1.37:6200/stream_from_ffmpeg
            
            */
        };        
    } catch (error) {
        console.log(error);
    }

};
