import { progressNow, playBtnControl } from "./ui.mobile.js";

let isUnlocked = false;

window.addEventListener("touchstart", () => {
    let audioCtx = new AudioContext();
    let buffer = audioCtx.createBuffer(1, 1, 22050);
    let source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.start(0);
    setTimeout(() => {
        if((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {
            isUnlocked = true;
            console.log("Audio is unlocked");
        }
    }, 0);
});

let audioElement = new Audio;
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