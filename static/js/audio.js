function audio(audioBuff) {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext = new AudioContext();
    let audioBuffer = audioContext.decodeAudioData(audioBuff);
    console.log(audioBuffer.sampleRate);
}

export default audio;