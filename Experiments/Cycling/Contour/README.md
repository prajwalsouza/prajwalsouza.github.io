# Contour

Experimental static cycling planner. Serve this folder or the repository over HTTP; open `index.html`. There is no build step. Deploy `index.html`, `data-cache.js`, and `road-data.js` together.

## Downloads and storage

IndexedDB database `contour-data-v1` stores place searches, road areas, decoded vector tiles, elevation arrays and map-source metadata. It is bounded to approximately 128 MiB by recorded payload size, with additional per-kind entry limits. Browser quota or disabled storage falls back to the current session.

| Data | Reuse period |
| --- | --- |
| Road networks | 7 days |
| Place searches | 30 days |
| Map tiles | 14 days |
| Elevation tiles | 180 days |
| Vector source metadata | 1 day |

Road coverage is subtracted from the requested bounding box, so nearby routes fetch only uncovered rectangles. Large rectangles are divided into up to four sequential requests. Each completed patch is saved immediately and survives cancellation or a later failed patch. Requests retain OSM node IDs, directional tags and restriction relations; merged patches deduplicate by element type and ID. Changing routing preferences rebuilds the graph from saved road data.

The map paints cached street tiles before waiting for missing tiles or elevation. Individual failed map tiles no longer discard all successful tiles. Expired road data is refreshed; a failed refresh is reported, not silently used as current road data. Settings → Downloaded maps & places provides usage counts, road refresh and cache clearing. Clearing downloads preserves saved routes and preferences.

The loading dialog distinguishes saved data from downloads, counts road patches and elevation tiles, shows the calculation stage and elapsed time, and gives a broad estimate. Public server queues are unpredictable, so this is not a promised completion time. The 25 km limit applies to endpoint separation; dense road networks also have memory limits. The HTML page itself is not cached as an offline application.

## Providers

Roads use the VK Maps Overpass mirror, with FOSSGIS and the current Private.coffee endpoint as fallbacks (the old Kumi hostname was retired). Requests are sequential, bounded, cache-first and use a cooldown after failures. Provider outages can still prevent a first download. Provider list: https://wiki.openstreetmap.org/wiki/Overpass_API#Public_Overpass_API_instances

## Checks

```
node --test Experiments/Cycling/Contour/tests/*.cjs
```

Open `tests/cache.html` from the same HTTP server for real IndexedDB tests. These use a separate temporary database, never the user's Contour data, and do not call live map services. The tests include persistence across connections, expiry, typed arrays, storage limits, clearing during pending writes, unavailable storage, and cached road reuse without a second network request.

Endpoint snapping tries nearby legal road nodes when the closest node leads only into a directed dead end. It retains the 450 m maximum gap, limits alternatives to 75 m beyond the closest candidate, and still enforces one-way and turn restrictions. The selected gaps are disclosed in route details.
