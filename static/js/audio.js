import { progressNow } from "./ui.js";

var audioElement = new Audio();
var times = 0;

function audio(file) {
    
    if (times > 1) {
        times = 0;
        console.log(audioElement.src);
        audioElement.pause();
        clearInterval(progressInterval);
        clearInterval(progressBarInterval);
        URL.revokeObjectURL(audioElement.src);
        audioElement.src = "";
    }
    
    (async () => {
        times += 1;
        let blob = new Blob([ await file.arrayBuffer()], { type: file.type });
        audioElement.crossOrigin = "anonymous";
        audioElement.src = URL.createObjectURL(blob);
        blob = null;
        progressNow(audioElement, times);
    })();
}

export default audio;