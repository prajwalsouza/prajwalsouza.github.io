# Parallax · 0.2.0

Camera-first visual-speed experiment. Open the camera, grant permission, and point it at the outside world. No required geometry form, horizon alignment or ground selection. Swipe upward, scroll down, or tap the floating button for analysis, uncertainty and the separate GPS benchmark.

## Implemented

The local image pipeline finds corners, tracks them using pyramidal Lucas–Kanade optical flow, robustly fits homographies across candidate regions, and decomposes the transformations into plausible ground-plane orientations and camera translation. Forward, side and oblique travel are represented in the geometric model. Rotation is estimated separately. Weak, inconsistent or ambiguous evidence produces a dash, never a GPS substitute.

Persistent samples over lens field of view, camera height and shared multiplicative bias generate an approximate conditional speed distribution. Spatial block resampling perturbs motion fits. The median and interval are smoothed over approximately half a second. Calibration uncertainty is not treated as a new independent measurement every frame.

COCO-SSD optionally runs locally. Dynamic-object boxes are excluded from image tracking. Person/car/bus box heights can provide tentative size evidence using their apparent ground contact and the inferred plane. Objects may move: these are single-frame size clues, not objects triangulated as stationary. A repeated track remains one scale reference. Within-class likelihoods are averaged, not multiplied, to avoid treating class-level size bias as independent. Evidence expires.

## Important limitations

**This is an experimental estimator, not a calibrated speedometer. No physical-phone or road-accuracy claim is made.**

Without object evidence, metric scale uses a broad camera-height prior: median 1.5 m, log standard deviation 0.55, truncated to about 0.2–8 m. The diagonal field of view is assumed to be 76 degrees with 12-degree standard deviation, truncated to 42–110 degrees. These are engineering priors, not detected specifications or fitted population statistics. A bus, train, unusual mounting height, cropped lens or camera at a building window can produce the wrong metric speed.

Object sizes are also broad engineering assumptions. Bounding boxes, identity, object vertical extent and apparent ground contact can be wrong. Object evidence is tentative, not a known ruler. If model loading fails, the image geometry still runs with the broad height prior.

A coherent plane is not proof of stationary ground. The application needs visible, textured, approximately planar ground. Reflections, traffic, non-planarity, significant camera roll, darkness, blur, stabilization and rolling shutter can cause refusals or wrong accepted estimates. This is not general 3-D SLAM or semantic ground segmentation. Hand movement is camera movement.

The **95% model interval is conditional and uncalibrated**: it has no demonstrated 95% real-world coverage guarantee. It does not include all model failures. The implementation does not preserve a complete joint multimodal distribution over arbitrary 3-D scenes. Held-out trip validation, conformal calibration and hardware reference testing remain future work.

## GPS is benchmark-only

On detected phone/tablet browsers, the initial consent screen enables optional location benchmarking by default. Desktop benchmarking is opt-in. Denying location does not disable camera analysis.

The worker receives only pixels, dimensions, timestamps, detected objects and run IDs. It never receives GPS speed, latitude, longitude or location accuracy. GPS does not calibrate scale, fill missing vision estimates or tune parameters.

Native browser speed can be missing. Null remains missing; genuine zero is retained. Coordinates are discarded at the callback boundary, with no position-differencing fallback. Summary statistics pair nearby native speed fixes with camera outputs and filter poor position accuracy, but position accuracy is not speed accuracy. These are descriptive comparisons, not reference validation. Browser frame timestamps are not a hardware-calibrated exposure clock.

## Running and privacy

Serve the folder on HTTPS. No build step, backend, account, API key, microphone or accelerometer is needed. Tap the camera icon and accept camera permission. Leaving/backgrounding the page stops camera and location. A late permission response cannot restart a stopped session. Use a stable passenger-operated mount; do not interact while driving.

Application code does not upload images or sensor readings. jsDelivr and Google Storage serve the optional recognition assets and may log ordinary asset requests. The browser/OS handles location access. No analytics or route map is used. JSON/CSV exports contain scalar measurements and diagnostics, not images or coordinates. Logs stay in tab memory with a 10,000-record cap per stream and disappear on reload. Consent uses session storage.

## Source layout

- `index.html`, `style.css`: camera-first UI and advanced sheet.
- `app.js`: permissions, frame scheduling, sensor lifecycle, rendering and exports.
- `math.js`, `tracker.js`, `engine.js`, `vision-worker.js`: visual estimation.
- `objects.js`: optional local recognition and persistent object tracks.
- `benchmark.js`: separate benchmark and CSV functions.
- `simulator.js`: synthetic world rendered into real image buffers.
- `tests/geometry.cjs`, `tests/benchmark.mjs`: executable unit checks.

## Checks actually performed

Run `node tests/geometry.cjs` (14 checks) and `node tests/benchmark.mjs` (11 checks).

A Chromium mobile-sized browser test also exercised the camera UI, advanced sheet, synthetic image-to-worker pipeline, forward travel, side travel, stationary rotation, exports and stop behaviour. This runner blocks URL navigation, so that test loaded an equivalent local bundle into `about:blank`. It does not establish production HTTPS behaviour, real camera permission, Safari, phone throughput or live object-model performance.

The 36 km/h synthetic forward scene produced about 34 km/h and the side scene about 33 km/h. Its 1.5 m camera height and 76-degree FOV match the prior centres, so this agreement is not evidence of general metric accuracy. Stationary rotation was refused in the tested rendered scene. Synthetic truth is never passed to the estimator or included in GPS comparisons.

## References and dependencies

Optional runtime dependencies: TensorFlow.js 4.22.0 and COCO-SSD 2.2.3, Apache-2.0 projects, downloaded rather than vendored.

- https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd
- https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement/requestVideoFrameCallback
- https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates/speed
- Background on Bayesian monocular scale (not a claim of implementing the full published method): https://arxiv.org/abs/1711.02768

Original application code: MIT license, see `LICENSE`.
