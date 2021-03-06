import audio from "./audio.mobile.js";
const playBtn = document.querySelector("div#play-icon");
const playBtnImg = document.querySelector("div#play-icon").querySelector("img");
const nextBtn = document.querySelector("div#forward-icon").querySelector("img");
const prevBtn = document.querySelector("div#backward-icon").querySelector("img");
const musicControlsDivs = document.querySelectorAll("div.music-controls-divs");
const autoPlayDiv = document.querySelector("div#autoplay-div");
const loopDiv = document.querySelector("div#loop-div");
const shuffleDiv = document.querySelector("div#shuffle-div");
const progressNowSpan = document.querySelector("span#progress-now-span");
const progressDurationSpan = document.querySelector("span#progress-duration-span");
const progressBar = document.querySelector("div.progress-bar");
const musicList = document.querySelector("div.music-list");
const musicArtImg = document.querySelector("img.music-art-img");
const musicTitle = document.querySelector("div.music-title");
const musicTitleSpan = document.querySelector("span#music-title-span");
const musicArtistSpan = document.querySelector("span#music-artist-span");
const musicResSpan = document.querySelector("span#music-res-span");
const musicInputFile = document.querySelector("input#music-input-file");

function buildTrack(file, id, imgSrc, trackTitle, trackArtist) {
    let trackTemplate = `
    <div class="tracks" id="track-${id}">

        <div class="track-thumbnail">
            <img id="track-thumbnail-img-${id}" class="track-thumbnail-img" src="${imgSrc}" alt="">
        </div>

        <div class="track-info">

            <div class="track-info-container">
                <div class="track-title-container">
                    <div class="track-title">
                        <span id="track-title-span-${id}" class="track-title-span">${trackTitle}</span>
                    </div>
                    <div class="track-artist">
                        <span id="track-artist-span-${id}" class="track-artist-span">${trackArtist}</span>
                    </div>
                </div>
            </div>

        </div>

    </div>`;
    musicList.innerHTML += trackTemplate;
    let tracks = document.querySelectorAll("div.tracks");

    tracks.forEach(track => {
        track.addEventListener("click", () => {
            tracks.forEach(track => { track.classList.remove("active-track"); });
            track.classList.add("active-track");
            let trackID = track.id.split("-")[1];
            musicTitle.id = `title-${trackID}`;
            musicArtImg.src = track.querySelector("img").src;
            musicTitleSpan.textContent = track.querySelector("span.track-title-span").textContent;
            musicArtistSpan.textContent = track.querySelector("span.track-artist-span").textContent;
            musicResSpan.textContent = file.name.slice(file.name.lastIndexOf(".") + 1, file.name.length).toUpperCase();
            audio(musicInputFile.files[trackID], true);
        });
    });
}

musicControlsDivs.forEach(div => {
    div.addEventListener("click", () => {
        div.classList.toggle("active-div");
    });
});

function playAudio(audioElement) {
    playBtnImg.src = "assets/icons/pause-fill.svg";
    audioElement.play();
}

function pauseAudio(audioElement) {
    playBtnImg.src = "assets/icons/play-fill.svg";
    audioElement.pause();
}

function playBtnControl(audioElement, play = false) {

    audioElement.addEventListener("loadeddata", () => {
        let times = 0;
        if (play === true) {
            playAudio(audioElement);
        }

        play ? playAudio(audioElement) : pauseAudio(audioElement);

        playBtn.addEventListener("click", () => {
            if (play) {
                times = 0;
                pauseAudio(audioElement);
                play = false;
            } else {
                times += 1;
                if (times % 2 !== 0) {
                    times = 1;
                    playAudio(audioElement);
                } else if (times % 2 === 0) {
                    times = 0;
                    pauseAudio(audioElement);
                }
            }
        });

    });

}

function triggerMouseEvent(node, eventType) {
    let clickEvent = new MouseEvent(eventType);
    try {
        node.dispatchEvent(clickEvent);
    } catch (e) { }
}

nextBtn.addEventListener("click", () => {
    let musicTitleID = document.querySelector("div.music-title").id.split("-")[1];

    if (musicTitleID < musicInputFile.files.length - 1) {
        let nextMusicTitleID = parseInt(musicTitleID) + 1;
        let nextTrackElement = document.querySelector(`div#track-${nextMusicTitleID}`);
        trackControl(nextTrackElement);
    } else {
        let nextMusicTitleID = 0;
        let nextTrackElement = document.querySelector(`div#track-${nextMusicTitleID}`);
        trackControl(nextTrackElement);
    }

});

prevBtn.addEventListener("click", () => {
    let musicTitleID = document.querySelector("div.music-title").id.split("-")[1];

    if (musicTitleID > 0) {
        let musicTitleID = document.querySelector("div.music-title").id.split("-")[1];
        let prevMusicTitleID = parseInt(musicTitleID) - 1;
        let prevTrackElement = document.querySelector(`div#track-${prevMusicTitleID}`);
        trackControl(prevTrackElement);
    } else {
        let prevMusicTitleID = document.querySelectorAll("div.tracks").length - 1;
        let prevTrackElement = document.querySelector(`div#track-${prevMusicTitleID}`);
        trackControl(prevTrackElement);
    }

});


function trackControl(trackElement) {
    triggerMouseEvent(trackElement, "click");
}

function progressNow(audioElement, times, isList = false) {

    if (times > 1) {
        try {
            clearInterval(progressInterval);
            clearInterval(progressBarInterval);
        } catch (error) {
            console.log(error);
        }

    }
    if (isList === false) {
        playBtnControl(audioElement);
        loopDiv.style.display = "flex";
        autoPlayDiv.style.display = "flex";
        autoPlayDiv.style.opacity = "0";
        shuffleDiv.style.display = "none";
    } else if (isList === true) {
        autoPlayDiv.style.display = "flex";
        autoPlayDiv.style.opacity = "1";
        loopDiv.style.display = "none";
        shuffleDiv.style.display = "flex";
        playBtnControl(audioElement, isList = true);
    }

    globalThis.progressInterval = setInterval(() => {

        let timeNow = audioElement.currentTime;
        let minutes = Math.floor(timeNow / 60);
        let seconds = Math.floor(timeNow - minutes * 60);

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

        let progressPercentage = (timeNow / duration) * 100;

        let progressPercentageInStr = progressPercentage.toString() + "%";

        progressBar.style.width = progressPercentageInStr;

        if (timeNow >= audioElement.duration) {
            const autoPlayDivClass = autoPlayDiv.classList;
            const shuffleDivClass = shuffleDiv.classList;
            const loopDivClass = loopDiv.classList;
            if (isList && autoPlayDivClass.contains("active-div")) {
                if (shuffleDivClass.contains("active-div")) {
                    let randomMusicTitleID = Math.floor(Math.random() * musicInputFile.files.length);
                    let randomTrackElement = document.querySelector(`div#track-${randomMusicTitleID}`);
                    trackControl(randomTrackElement);
                } else {
                    nextBtn.click();
                }
            } else if (!isList && loopDivClass.contains("active-div")) {
                audioElement.currentTime = 0;
                clearInterval(progressInterval);
                clearInterval(progressBarInterval);
                playAudio(audioElement);
                progressNow(audioElement, times = 1, isList = false);
            } else if (!isList && !loopDivClass.contains("active-div")) {
                audioElement.currentTime = 0;
                clearInterval(progressInterval);
                clearInterval(progressBarInterval);
                pauseAudio(audioElement);
                playBtnImg.src = "assets/icons/play-fill.svg";
                playBtn.addEventListener("click", () => {
                    playAudio(audioElement);
                    progressNow(audioElement, times = 1, isList = false);
                });
            } else {
                playBtnImg.src = "assets/icons/play-fill.svg";
                clearInterval(progressInterval);
                clearInterval(progressBarInterval);
                playBtn.addEventListener("click", () => {
                    playAudio(audioElement);
                    progressNow(audioElement, times = 1, isList = true);
                });
            }
        }

    }, 500);

}

export { progressNow, buildTrack, playAudio, pauseAudio, playBtnControl };