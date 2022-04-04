const WebMusicPlayer = "WebMusicPlayerv1.0.1";

const assets = [
    "./",
    "./css/index.css",
    "./css/index.mobile.css",
    "./manifest.json",
    "./js/fileHandler.mobile.js",
    "./js/audio.mobile.js",
    "./js/ui.mobile.js",
    "./js/jsmediatags.min.js",
    "./assets/icons/play-fill.svg",
    "./assets/icons/pause-fill.svg",
    "./assets/icons/skip-forward-fill.svg",
    "./assets/icons/skip-backward-fill.svg",
    "./assets/icons/plus.webp",
    "./assets/icons/music-art-default.webp",
    "./assets/logo/icon@32.png",
    "./assets/logo/icon@64.png",
    "./assets/logo/icon@128.png",
    "./assets/logo/icon@192.png",
    "./assets/logo/icon@196.png",
    "./assets/logo/icon@196Mask.png",
    "./assets/logo/icon@256.png",
    "./assets/logo/icon@512.png",
]

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(WebMusicPlayer)
        .then((cache) => {
            return cache.addAll(assets);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
      caches.match(event.request).then(res => {
        return res || fetch(event.request)
      })
    );
});