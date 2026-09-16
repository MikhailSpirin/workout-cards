const CACHE_NAME = "lift-cards-v2";

const APP_FILES = [
  "./",
  "./index.html",
  "./barbell.html",
  "./dumbbell.html",
  "./complex.html",
  "./styles.css",
  "./app.js",
  "./interval-timer.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./assets/barbell/bench-start.jpg",
  "./assets/barbell/bench-end.jpg",
  "./assets/barbell/row-start.jpg",
  "./assets/barbell/row-end.jpg",
  "./assets/barbell/overhead-start.jpg",
  "./assets/barbell/overhead-end.jpg",
  "./assets/barbell/close-grip-start.jpg",
  "./assets/barbell/close-grip-end.jpg",
  "./assets/barbell/curl-start.jpg",
  "./assets/barbell/curl-end.jpg",
  "./assets/barbell/shrug-start.jpg",
  "./assets/barbell/shrug-end.jpg",
  "./assets/dumbbell/dumbbell-bench-press-1.jpg",
  "./assets/dumbbell/dumbbell-bench-press-2.jpg",
  "./assets/dumbbell/dumbbell-pullover-1.jpg",
  "./assets/dumbbell/dumbbell-pullover-2.jpg",
  "./assets/dumbbell/dumbbell-shoulder-press-1.jpg",
  "./assets/dumbbell/dumbbell-shoulder-press-2.jpg",
  "./assets/dumbbell/dumbbell-curl-1.jpg",
  "./assets/dumbbell/dumbbell-curl-2.jpg",
  "./assets/dumbbell/dumbbell-tricep-extension-1.jpg",
  "./assets/dumbbell/dumbbell-tricep-extension-2.jpg",
  "./assets/dumbbell/dumbbell-reverse-fly-1.jpg",
  "./assets/dumbbell/dumbbell-reverse-fly-2.jpg",
  "./assets/dumbbell/dumbbell-lateral-raise-1.jpg",
  "./assets/dumbbell/dumbbell-lateral-raise-2.jpg",
  "./assets/dumbbell/dumbbell-front-squat-1.jpg",
  "./assets/dumbbell/dumbbell-front-squat-2.jpg",
  "./assets/dumbbell/dumbbell-romanian-deadlift-1.jpg",
  "./assets/dumbbell/dumbbell-romanian-deadlift-2.jpg",
  "./assets/dumbbell/dumbbell-calf-raise-1.jpg",
  "./assets/dumbbell/dumbbell-calf-raise-2.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type === "opaque") {
          return response;
        }

        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => {
        if (event.request.mode === "navigate") {
          return caches.match("./index.html");
        }
        return Response.error();
      });
    })
  );
});
