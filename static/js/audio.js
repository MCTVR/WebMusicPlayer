var audioElement = new Audio();

async function audio(file) {
    audioElement.pause();
    delete audioElement.src;
    const blob = new Blob([ await file.arrayBuffer()], { type: file.type });
    audioElement.crossOrigin = "anonymous";
    audioElement.src = URL.createObjectURL(blob);
    
    audioElement.play();
    URL.revokeObjectURL(blob);
}

export default audio;