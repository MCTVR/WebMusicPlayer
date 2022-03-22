import anime from "./anime.es.js";

const playBtn = document.querySelector("div#play-icon");
const playBtnImg = document.querySelector("div#play-icon").querySelector("img");
const progressNowSpan = document.querySelector("span#progress-now-span");
const progressDurationSpan = document.querySelector("span#progress-duration-span");
const progressBar = document.querySelector("div.progress-bar");


playBtn.addEventListener("mouseover", () => {
    anime.remove(playBtn);
    anime({
        targets: playBtn,
        scale: 1.02,
        duration: 700,
        elasticity: 400,
    });
});

playBtn.addEventListener("mouseleave", () => {
    anime.remove(playBtn);
    anime({
        targets: playBtn,
        scale: 1,
        duration: 600,
        elasticity: 400,
    });
});

playBtn.addEventListener("mousedown", () => {
    anime.remove(playBtn);
    anime({
        targets: playBtn,
        scale: 0.975,
        duration: 600,
        elasticity: 400
    });
});

playBtn.addEventListener("mouseup", () => {
    anime.remove(playBtn);
    anime({
        targets: playBtn,
        scale: 1,
        duration: 600,
        elasticity: 400,
    });
});

let playAudio = (audioElement) => {
    audioElement.play();
    playBtnImg.src = "assets/pause-fill.svg";
}

let pauseAudio = (audioElement) => {
    audioElement.pause();
    playBtnImg.src = "assets/play-fill.svg";
}

function playBtnControl(audioElement) {

    audioElement.addEventListener("loadeddata", () => {

        playBtnImg.src = "assets/play-fill.svg";
        
        audioElement.addEventListener('ended', () => {
            playBtnImg.src = "assets/play-fill.svg";
            playBtn.addEventListener("click", () => {
                clearInterval(progressInterval);
                clearInterval(progressBarInterval);
                playAudio(audioElement);
                progressNow(audioElement);
            });
        });
        playBtn.addEventListener("click", () => {
            audioElement.paused ? playAudio(audioElement) : pauseAudio(audioElement);
        });
    });
}

function progressNow(audioElement, times) {
    if (times > 1) {
        clearInterval(progressInterval);
        clearInterval(progressBarInterval);
    }

    playBtnControl(audioElement);

    globalThis.progressInterval = setInterval(() => {
        
        let timeNow = audioElement.currentTime;
        var minutes = Math.floor(timeNow / 60);
        var seconds = Math.floor(timeNow - minutes * 60);

        if (seconds <= 9) { seconds = `0${seconds}`; } else { seconds = seconds; }

        progressNowSpan.textContent = `${minutes}:${seconds}`;

    }, 500);

    globalThis.progressBarInterval = setInterval(() => {

        let duration = audioElement.duration;

        let durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration - durationMinutes * 60);
    
        if (durationSeconds <= 9) { durationSeconds = `0${durationSeconds}`; } else { durationSeconds = durationSeconds; }
    
        progressDurationSpan.textContent = `${durationMinutes}:${durationSeconds}`;

        let timeNow = audioElement.currentTime;

        var progressPercentage = (timeNow / duration) * 100;

        var progressPercentageInStr = progressPercentage.toString() + "%";

        progressBar.style.width = progressPercentageInStr;

    }, 200);

}

export { progressNow };