import progressNow from "./ui.js";
const playControl = document.querySelector("div#play-icon").querySelector("img");
var audioElement = new Audio();

async function audio(file) {
    audioElement.pause();
    delete audioElement.src;
    const blob = new Blob([ await file.arrayBuffer()], { type: file.type });
    audioElement.crossOrigin = "anonymous";
    audioElement.src = URL.createObjectURL(blob);

    playControl.addEventListener("click", () => {
        audioElement.paused ? audioElement.play() : audioElement.pause();
    });

    progressNow(audioElement);
}

export default audio;