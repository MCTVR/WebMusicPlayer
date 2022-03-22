import anime from "./anime.es.js";

const playBtn = document.querySelector("div#play-icon");
const playBtnImg = document.querySelector("div#play-icon").querySelector("img");
const progressNowSpan = document.querySelector("span#progress-now-span");
const progressDurationSpan = document.querySelector("span#progress-duration-span");
const progressBar = document.querySelector("div.progress-bar");

var progressInterval;
var progressBarInterval;

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

function progressNow(audioElement) {

    audioElement.addEventListener('loadeddata', () => {
        progressInterval = undefined;
        progressBarInterval = undefined;

        playBtn.addEventListener("click", () => {
            audioElement.paused ? audioElement.play() : audioElement.pause();
            audioElement.paused ? playBtnImg.src = "assets/play-fill.svg" : playBtnImg.src = "assets/pause-fill.svg";
        });

        let duration = audioElement.duration;

        progressInterval = setInterval(function() {
            let timeNow = audioElement.currentTime;
            var minutes = Math.floor(timeNow / 60);
            var seconds = Math.floor(timeNow - minutes * 60);

            if (seconds <= 9) { seconds = `0${seconds}`; } else { seconds = seconds;}

            progressNowSpan.textContent = `${minutes}:${seconds}`;

            if (audioElement.ended) {
                playBtnImg.src = "assets/play-fill.svg";
                clearInterval(progressInterval);
            }

        }, 1000);
        
        let durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration - durationMinutes * 60);

        if (durationSeconds <= 9) { durationSeconds = `0${durationSeconds}`; } else { durationSeconds = durationSeconds;}

        progressDurationSpan.textContent = `${durationMinutes}:${durationSeconds}`;

        progressBarInterval = setInterval(function() {
            let timeNow = audioElement.currentTime;

            var progressPercentage = (timeNow / duration) * 100;
            
            var progressPercentageInStr = progressPercentage.toString() + "%";

            progressBar.style.width = progressPercentageInStr;

            if (timeNow >= duration) {
                clearInterval(progressBarInterval);
            }

        }, 200);

    });
}

export default progressNow;