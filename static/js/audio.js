import { progressNow, playBtnControl } from "./ui.js";

globalThis.audioElement = new Audio();
let times = 0;

function audio(file, trackCtl=false) {
    
    if (times > 1) {
        times = 0;
        audioElement.pause();
        URL.revokeObjectURL(audioElement.src);
        clearInterval(progressInterval);
        clearInterval(progressBarInterval);
        audioElement.src = "";
    }
    
    (async () => {
        times += 1;
        URL.revokeObjectURL(audioElement.src);
        try {

            let blob = new Blob([ await file.arrayBuffer()], { type: file.type });
            audioElement.crossOrigin = "anonymous";
            audioElement.src = URL.createObjectURL(blob);
            if (trackCtl) {
                progressNow(audioElement, times, true);
                playBtnControl(audioElement, true);
            } else {
                progressNow(audioElement, times);
            }
            
        } catch (error) {
            console.log(error);
        }

    })();
}

export default audio;