# Lift Cards PWA

Offline-friendly iPhone web app containing:

- Upper-Body Barbell Workout
- Dumbbells — Workout A

## Preview locally

From this directory:

```sh
python3 -m http.server 8765
```

Then open `http://127.0.0.1:8765` on the Mac.

## Install on iPhone

The folder must first be published on an HTTPS website. Open that URL in Safari,
tap **Share**, choose **Add to Home Screen**, and launch **Lift Cards** once while
online. Both workout pages and all exercise images are then available offline.

## Updating

After changing files, increment `CACHE_NAME` in `service-worker.js` so installed
copies receive the new version.
