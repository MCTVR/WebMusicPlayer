import { progressNow } from "./ui.js";

var audioElement = new Audio();
var times = 0;

function audio(file) {
    
    if (audioElement.src !== "") {
        audioElement.pause();
        clearInterval(progressInterval);
        clearInterval(progressBarInterval);
        URL.revokeObjectURL(audioElement.src);
        audioElement.src = "";
    }
    
    (async () => {
        times += 1;
        const blob = new Blob([ await file.arrayBuffer()], { type: file.type });
        audioElement.crossOrigin = "anonymous";
        audioElement.src = URL.createObjectURL(blob);
        progressNow(audioElement, times);
    })();
}

export default audio;