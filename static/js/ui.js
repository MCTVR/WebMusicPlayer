import anime from "./anime.es.js";

const playBtn = document.querySelector("div#play-icon");

const progressNowSpan = document.querySelector("span#progress-now-span");
const progressDurationSpan = document.querySelector("span#progress-duration-span");
const progressBar = document.querySelector("div.progress-bar");

playBtn.addEventListener("click", () => {
    playBtn.querySelector("img").src = playBtn.querySelector("img").src.includes("play") ? "assets/pause-fill.svg" : "assets/play-fill.svg";
});

function progressNow(audioElement) {

    audioElement.addEventListener('loadeddata', () => {

        if (audioElement.paused) {
            playBtn.querySelector("img").src = "assets/play-fill.svg";
        } else if (audioElement.played) {
            playBtn.querySelector("img").src = "assets/pause-fill.svg";
        }

        let duration = audioElement.duration;
        globalThis.progressInterval = setInterval(function() {
            let timeNow = audioElement.currentTime;
            var minutes = Math.floor(timeNow / 60);
            var seconds = Math.floor(timeNow - minutes * 60);

            if (seconds <= 9) { seconds = `0${seconds}`; } else { seconds = seconds;}

            progressNowSpan.textContent = `${minutes}:${seconds}`;

            if (timeNow >= duration) {
                clearInterval(progressInterval);
            }

        }, 1000);
        globalThis.progressBarInterval = setInterval(function() {
            let timeNow = audioElement.currentTime;
            var durationMinutes = Math.floor(duration / 60);
            var durationSeconds = Math.floor(duration - durationMinutes * 60);

            if (durationSeconds <= 9) { durationSeconds = `0${durationSeconds}`; } else { durationSeconds = durationSeconds;}

            progressDurationSpan.textContent = `${durationMinutes}:${durationSeconds}`;

            var progressPercentage = (timeNow / duration) * 100;
            
            var progressPercentageInStr = progressPercentage.toString() + "%";

            progressBar.style.width = progressPercentageInStr;
        }, 100);
    });
}

export default progressNow;