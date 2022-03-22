import progressNow from "./ui.js";
var audioElement = new Audio();

async function audio(file) {
    audioElement.pause();
    delete audioElement.src;
    const blob = new Blob([ await file.arrayBuffer()], { type: file.type });
    audioElement.crossOrigin = "anonymous";
    audioElement.src = URL.createObjectURL(blob);
    URL.revokeObjectURL(blob);

    progressNow(audioElement);
}

export default audio;