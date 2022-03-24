import audio from "./audio.js";
import { buildTrack } from "./ui.js";
const jsmediatags = window.jsmediatags;
const musicArt = document.querySelector("div.music-art");
const musicArtImg = document.querySelector("img.music-art-img");
const musicTitleSpan = document.querySelector("span#music-title-span");
const musicArtistSpan = document.querySelector("span#music-artist-span");
const musicResSpan = document.querySelector("span#music-res-span");
const musicInputFile = document.querySelector("input#music-input-file");
const musicList = document.querySelector("div.music-list");

function buildTrackWithInfo(files) {
    musicList.innerHTML = "";
    for (let id = 0; id < files.length; id++) {
        const file = files[id];

        if (file.type.indexOf("audio/x-m4a") != -1) {
            file = new File([file], file.name.slice(0,file.name.lastIndexOf(".")) + ".mp4", { type: "audio/mp4" });
        }

        jsmediatags.read(file, {
            onSuccess: async (tag) => {
                try {
                    const { data, format } = tag.tags.picture;
                    let base64String = "";
                    for (var i = 0; i < data.length; i++) {
                        base64String += String.fromCharCode(data[i]);
                    }
                    let imgSrc = `data:${data.format};base64,${window.btoa(base64String)}`;
                    let trackTitle = tag.tags.title;
                    let trackArtist = tag.tags.artist;
                    buildTrack(file, id, imgSrc, trackTitle, trackArtist);
                } catch (error) {
                    let imgSrc = "assets/music-art-default.webp";
                    let trackTitle = file.name.slice(0,file.name.lastIndexOf("."));
                    let trackArtist = "";
                    buildTrack(file, id, imgSrc, trackTitle, trackArtist);
                }
            },
            onError: async () => {
                let imgSrc = "assets/music-art-default.webp";
                let trackTitle = file.name.slice(0,file.name.lastIndexOf("."));
                let trackArtist = "";
                buildTrack(file, id, imgSrc, trackTitle, trackArtist);
            }
        });
    }
    

}

function showMusicInfo(file) {
    musicTitleSpan.textContent = "";
    musicArtistSpan.textContent = "";
    musicResSpan.textContent = "";
    musicInputFile.value = "";

    jsmediatags.read(file, {
        onSuccess: function(tag) {
            try {
                const { data, format } = tag.tags.picture;
                let base64String = "";
                for (var i = 0; i < data.length; i++) {
                    base64String += String.fromCharCode(data[i]);
                }
                musicArtImg.src = `data:${data.format};base64,${window.btoa(base64String)}`;
                musicTitleSpan.textContent = tag.tags.title;
                musicArtistSpan.textContent = tag.tags.artist;
                musicResSpan.textContent = file.name.slice(file.name.lastIndexOf(".")+1, file.name.length).toUpperCase();
            } catch (error) {
                musicTitleSpan.textContent = file.name.slice(0,file.name.lastIndexOf("."));
                musicResSpan.textContent = file.name.slice(file.name.lastIndexOf(".")+1, file.name.length).toUpperCase();
                musicArtImg.src = "assets/music-art-default.webp";
            }
        },
        onError: function(error) {
            musicTitleSpan.textContent = file.name.slice(0,file.name.lastIndexOf("."));
            musicResSpan.textContent = file.name.slice(file.name.lastIndexOf(".")+1, file.name.length).toUpperCase();
            musicArtImg.src = "assets/music-art-default.webp";
        }
    });
}

function loadFile() {
        
    musicArt.addEventListener("click", () => {
        musicInputFile.click();
    });

    musicInputFile.addEventListener("change", () => {
        let files = musicInputFile.files;

        if (files.length > 1) {
            
            buildTrackWithInfo(files);

        } else if (files.length === 1) {
            const file = files[0];

            if (file.type.indexOf("audio/x-m4a") != -1) {
                file = new File([file], file.name.slice(0,file.name.lastIndexOf(".")) + ".mp4", { type: "audio/mp4" });
            }

            showMusicInfo(file);
            audio(file);
        }

    });


}

(function musicSelect() {
    loadFile();
})();