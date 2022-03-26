const WebMusicPlayer = "WebMusicPlayer";

const assets = [
    "./",
    "./css/index.css",
    "./css/index.mobile.css",
    "./manifest.json",
    "./js/fileHandler.mobile.js",
    "./js/audio.mobile.js",
    "./js/ui.mobile.js",
    "./js/jsmediatags.min.js",
    "./js/anime.es.js",
    "./assets/play-fill.svg",
    "./assets/pause-fill.svg",
    "./assets/skip-forward-fill.svg",
    "./assets/skip-backward-fill.svg",
    "./assets/plus.webp",
    "./assets/music-art-default.webp",
    "./assets/icon@32.png",
    "./assets/icon@64.png",
    "./assets/icon@128.png",
    "./assets/icon@192.png",
    "./assets/icon@196.png",
    "./assets/icon@256.png",
    "./assets/icon@512.png",
]

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(WebMusicPlayer).then((cache) => {
            return cache.addAll(assets);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
      caches.match(event.request).then(res => {
        return res || fetch(event.request)
      })
    )
  })