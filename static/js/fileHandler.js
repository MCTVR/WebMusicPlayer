import audio from "./audio.js";
const jsmediatags = window.jsmediatags;
const musicArt = document.querySelector("div.music-art");
const musicArtImg = document.querySelector("img.music-art-img");
const musicTitleSpan = document.querySelector("span#music-title-span");
const musicArtistSpan = document.querySelector("span#music-artist-span");
const musicResSpan = document.querySelector("span#music-res-span");
const musicInputFile = document.querySelector("input#music-input-file");

// const test = document.querySelector("input#test");

// test.addEventListener("change", () => {
//     console.log(test.files[0]);
// });

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
            } catch (error) {
                musicTitleSpan.textContent = file.name.slice(0,file.name.lastIndexOf("."));
                musicResSpan.textContent = file.name.slice(file.name.lastIndexOf(".")+1, file.name.length).toUpperCase();
                musicArtImg.src = "assets/music-art-default.webp";
            }
        },
        onError: function(error) {
            console.log(error);
            musicTitleSpan.textContent = file.name.slice(0,file.name.lastIndexOf("."));
            musicResSpan.textContent = file.name.slice(file.name.lastIndexOf(".")+1, file.name.length).toUpperCase();
            musicArtImg.src = "assets/music-art-default.webp";
        }
    });
}

function fileHandler(UA) {
    if (UA === "Chromium") {

        musicArt.addEventListener("click", async () => {
            const options = {
                startIn: "music",
                multiple: true,
                types: [
                    {
                        description: "Audio",
                        accept: {
                            "audio/*": ['.wav', '.ogg', '.mp3', '.mp4', '.aac', '.flac', '.webm'],
                        }
                    }
                ],
                excludeAcceptAllOption: true,
            };
            const [fileHandle] = await window.showOpenFilePicker(options);
            if (fileHandle.kind == "file") {

                var file = await fileHandle.getFile();

                showMusicInfo(file);

                if (file.type.indexOf("audio/x-m4a") != -1) {
                    file = new File([file], file.name.slice(0,file.name.lastIndexOf(".")) + ".mp4", { type: "audio/mp4" });
                }

                audio(file);

            } else if (fileHandle.kind == "directory") {
                console.log("directory");
            }
        });

    } else {
        
        musicArt.addEventListener("click", () => {

            musicInputFile.addEventListener("change", async () => {

                var file = musicInputFile.files[musicInputFile.files.length-1];

                showMusicInfo(file);

                if (file.type.indexOf("audio/x-m4a") != -1) {
                    file = new File([file], file.name.slice(0,file.name.lastIndexOf(".")) + ".mp4", { type: "audio/mp4" });
                }

                audio(file);
    
            });

            musicInputFile.click();
        });
    }
}

function musicSelect() {
    if (navigator.userAgent.indexOf("Edg") != -1 || navigator.userAgent.indexOf("Chrome") != -1) {
        fileHandler("Chromium");
    } else if (navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Edg") == -1 && navigator.userAgent.indexOf("Chrome") == -1) {
        fileHandler("Safari");
    }
}

musicSelect();