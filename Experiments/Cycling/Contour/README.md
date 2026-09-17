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

## Route choices and return rides

Up to six distinct candidates are generated using effort, distance, time, elevation variation, a steep-slope penalty, and bounded searches penalizing already-used ways. Candidates with more than 90% overlap in both directions are suppressed; detours over 2.5 times the initial route length are excluded. This is a bounded set of alternatives, not an exhaustive list of every possible route. The slope objective adds a squared penalty above 4% absolute grade to discourage steep descents as well as climbs; it is a preference heuristic, not a safety assessment. The Both ways planner mode retains its original requirement that each route be reversible along the same roads.

Opening an outbound detail view automatically calculates return choices at the bottom, reusing its graph without downloading roads again. Return searches independently optimize travel from the exact arrival road node to the starting road node, visiting intermediate stops in reverse order. One-way and turn restrictions remain enforced. A one-way dead end reports no legal return instead of silently moving the departure point. Return choices are cached in memory per outbound route and cancelled when changing routes or leaving the detail view. Saved rides rebuild a graph from cached/downloaded road data if needed; incompatible saved node IDs require recalculating the outbound ride.

The lowest-effort return appears automatically in gray alongside the colored outbound path. Each return has its own section with directional climb/descent grades and a Show on map control; selecting Return details opens its profile and estimates while retaining the outbound path in gray. An exact retrace is labeled Same roads back instead of drawing a second line. Savings compare with the modeled reverse of the outbound path only when that path is legal in reverse.

Hovering or keyboard-focusing a route card temporarily highlights its path without changing the selected ride. Hovering a map path also highlights its card. Leaving the preview restores the previous map and comparison labels. Return previews preserve the colored outbound path; touch users use Show on map. Solid route cards avoid clipped blur/shadow backgrounds, and reveal/camera transitions honor reduced motion.

 The combined effort is the selected outbound estimate plus the chosen return estimate, not a claim that the pair is globally optimal. You can compare return choices or go back to the outbound ride. Navigation, saving and GPX export apply to the currently displayed leg; the paired selection itself is not persisted.
