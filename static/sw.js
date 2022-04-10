const WebMusicPlayer = "WebMusicPlayerV1.0.3.3";

const assets = [
  "./",
  "./css/index.css",
  "./css/index.mobile.css",
  "./manifest.json",
  "./js/fileHandler.js",
  "./js/audio.js",
  "./js/ui.js",
  "./js/jsmediatags.min.js",
  "./js/anime.es.js",
  "./assets/icons/play-fill.svg",
  "./assets/icons/pause-fill.svg",
  "./assets/icons/skip-forward-fill.svg",
  "./assets/icons/skip-backward-fill.svg",
  "./assets/icons/autoplay.svg",
  "./assets/icons/infinite.svg",
  "./assets/icons/shuffle.svg",
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
    caches.open(WebMusicPlayer).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== WebMusicPlayer) {
            return caches.delete(cacheName);
          }
        })
      );
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