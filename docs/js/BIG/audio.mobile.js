import { progressNow, playBtnControl } from "./ui.mobile.js";

globalThis.audioElement = new Audio();
let times = 0;

function audio(file, trackCtl=false) {

    if (times > 1) {
        times = 0;
        audioElement.pause();
        URL.revokeObjectURL(audioElement.src);
        clearInterval(progressInterval);
        clearInterval(progressBarInterval);
        audioElement.removeAttribute("src");
    }
    
    (async () => {
        times += 1;
        URL.revokeObjectURL(audioElement.src);
        audioElement.removeAttribute("src");
        try {

            let blob = new Blob([ await file.arrayBuffer()], { type: file.type });
            audioElement.crossOrigin = "anonymous";
            audioElement.src = URL.createObjectURL(blob);
            blob = null;
            audioElement.autoplay = true;
            audioElement.load();
            if (trackCtl === true) {
                progressNow(audioElement, times, true);
            } else {
                progressNow(audioElement, times);
            }
            
        } catch (error) {
            console.log(error);
        }

    })();
}

export default audio;