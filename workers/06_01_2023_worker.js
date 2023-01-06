importScripts("stream.js")
onmessage = function (e) {
    try {
      console.log(e);
        let ms = new MediaSource();
        let handle = ms.handle;
    
        postMessage({mediaSource:handle,handler:"media_source_append"},[handle])
        initiateDataAppendToMediaSource(ms,e.data)
    } catch (error) {
        console.log(error);
    }

};
