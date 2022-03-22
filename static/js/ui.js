import anime from "./anime.es.js";

const playBtn = document.querySelector("div#play-icon");
const playBtnImg = document.querySelector("div#play-icon").querySelector("img");
const progressNowSpan = document.querySelector("span#progress-now-span");
const progressDurationSpan = document.querySelector("span#progress-duration-span");
const progressBar = document.querySelector("div.progress-bar");

playBtn.addEventListener("mouseover", () => {
    anime({
        targets: playBtn,
        scale: 1.02,
        duration: 700,
        elasticity: 400,
    });
});

playBtn.addEventListener("mouseleave", () => {
    anime({
        targets: playBtn,
        scale: 1,
        duration: 600,
        elasticity: 400,
    });
});

playBtn.addEventListener("mousedown", () => {
    anime({
        targets: playBtn,
        scale: 0.975,
        duration: 600,
        elasticity: 400
    });
});

playBtn.addEventListener("mouseup", () => {
    anime({
        targets: playBtn,
        scale: 1,
        duration: 600,
        elasticity: 400,
    });
});

function playAudio(audioElement) {
    playBtnImg.src = "assets/pause-fill.svg";
    audioElement.play();
}

function pauseAudio(audioElement) {
    playBtnImg.src = "assets/play-fill.svg";
    audioElement.pause();
}

function playBtnControl(audioElement) {

    audioElement.addEventListener("loadeddata", () => {
        let times = 0;
        playBtnImg.src = "assets/play-fill.svg";
        
        playBtnImg.addEventListener("click", () => {
            times += 1;
            if (times % 2 !== 0) {
                console.log(times);
                times = 1;
                playAudio(audioElement);
            } else if (times % 2 === 0) {
                console.log(times);
                times = 0;
                pauseAudio(audioElement);
            }
        });

    });

}

function progressNow(audioElement, times) {
    if (times > 1) {
        try {
            console.log(times);
            clearInterval(progressInterval);
            clearInterval(progressBarInterval);
        } catch (error) {
            console.log(error);
        }

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

        if (isNaN(durationMinutes) || isNaN(durationSeconds)) {

            progressDurationSpan.textContent = "0:00";

        } else {

            progressDurationSpan.textContent = `${durationMinutes}:${durationSeconds}`;

        }

        let timeNow = audioElement.currentTime;

        var progressPercentage = (timeNow / duration) * 100;

        var progressPercentageInStr = progressPercentage.toString() + "%";

        progressBar.style.width = progressPercentageInStr;

        if (timeNow >= audioElement.duration) {
            playBtnImg.src = "assets/play-fill.svg";
            playBtn.addEventListener("click", () => {
                clearInterval(progressInterval);
                clearInterval(progressBarInterval);
                playAudio(audioElement);
                progressNow(audioElement);
            });
        }

    }, 200);

}

export { progressNow };