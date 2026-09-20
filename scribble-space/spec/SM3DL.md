# SM3DL 0.1 — Scribble Space exchange profile

Status: experimental implementation profile, not an established interoperability standard.

SM3DL packages a person's spatial design request with the visual evidence needed to interpret it. It distinguishes the existing scene, a frozen observation of that scene, and suggested changes. Reading a package never authorizes applying changes or running embedded code.

## Quick start for a person or an LLM

1. Read `PROMPT.md` and `manifest.json`.
2. Open the clean and annotated PNGs referenced by each view.
3. Read `views/<id>.json` for the exact camera, marks, notes and scene recipe.
4. Load `scene.glb` in Three.js, Blender, or another glTF 2.0 consumer when geometry is needed.
5. Preserve view and mark IDs in any proposed response. State unresolved assumptions. A proposed edit is not an applied edit.

Run the editor by serving the repository root and opening `editor.html`. `demo.html` is a separate demonstration entry point. Neither a build process nor an AI API key is required.

## Container

A `.sm3dl.zip` is an ordinary ZIP archive. The 0.1 writer uses uncompressed STORE entries. The 0.1 importer intentionally accepts only this subset: no encryption, compression, ZIP64, symbolic links or data descriptors. Import is bounded to 180 MB, 2,000 entries and 64 MB per entry. Paths are relative, case-sensitive UTF-8 paths; traversal and duplicate paths are rejected.

```
manifest.json
PROMPT.md
SPEC.md
scene.glb                  rendered geometry for geometryView, when included
views/<view-id>.json
assets/<sha256>.png         clean image, annotated image, reference images
assets/<sha256>.glb         original user-loaded model, when needed
```

The manifest declares format `sm3dl`, version `0.1.0`, profile `scribble-space`, view paths, coordinate conventions and a SHA-256/byte-count inventory for every payload file. The manifest is not included in its own inventory. Hashes detect corruption; they do not authenticate the author. Import verifies all referenced view and asset hashes before creating view records.

An export from the editor contains the current frozen view. Other saved views remain in its library and can be exported individually. The container can represent multiple views; a package's `scene.glb` corresponds only to `geometryView`. Do not assume that all views show the same scene revision.

## Coordinates and the camera

World coordinates use metres, a right-handed frame and +Y up, matching this Three.js scene. A model loaded from GLB is used without recentering, rotating or rescaling its geometry. The framing camera may move. Source scale is not a surveyed real-world measurement.

Cameras look along local -Z, with local +Y up. `position` is world translation. `quaternion` is normalized **[x, y, z, w]**, the camera-to-world rotation; it is not a list of roll, pitch and yaw angles. Perspective `fov` is the vertical field of view in degrees. `near` and `far` are in model metres. `aspect` must agree with the capture's integer width/height. `matrixWorld` and `projectionMatrix` are 16-element column-major arrays for inspection/reprojection. Position, quaternion and lens fields are the primary representation; consumers should check redundant matrices rather than treat disagreement as another camera.

0.1 captures perspective cameras only. An orthographic camera requires a future version with explicit extents. Euler angles and an orbit focus point may be useful editor hints, but are not necessary to reconstruct the current camera.

Screen points are normalized [u, v], origin top-left, +u right, +v down. A mark remains aligned to the original capture when the editor displays it at another size using letterboxing. To form a ray, convert to normalized device coordinates [2u-1, 1-2v], unproject with the camera, then intersect the referenced scene. Camera and pixel coordinates alone do not determine depth.

## Frozen view document

Internal `format` is `scribble-space-shot`, `version` is 1. The view contains:

- `id`, `title`, `note`: durable identity and the person's requested change in their own words.
- `scene`: a scene ID, recipe revision and SHA-256 of the UTF-8 JSON workspace snapshot.
- `workspace`: the scene recipe frozen with the view.
- `capture`: the content-addressed clean PNG and pixel dimensions.
- `camera`: the fields described above.
- `marks`: ordered screen annotations.
- `preview`: an annotated PNG, without editor controls or selection handles.
- Storage adapters add `revision`, `createdAt` and `updatedAt`.

The scene, workspace, capture and camera are immutable after the first save. Editing marks, the title or the request creates a new storage revision. To change the viewpoint or geometry, capture a new view. Import creates fresh storage IDs to avoid overwriting existing views.

## Scene recipe and geometry

`workspace.template` is `blank`, `room`, `courtyard` or `model`. Versioned sample recipe definitions live in `public/scene.mjs`. Blank contains a 24 m ground square. Room adds four 3 m walls around a 10 × 8 m footprint. Courtyard is generic demonstration geometry, not a reconstruction of a real building.

For an imported model, `workspace.model.asset` identifies the exact original self-contained GLB and `name` is its display label. External texture/buffer URLs are rejected. The model SHA-256 is part of its asset name. This version supports standard and Meshopt GLB, not Draco/KTX2. Non-GLB native files are not accepted.

`workspace.walls` stores proposed wall volumes separately from the original model: IDs, centerline endpoints `a`/`b`, height, thickness, `precision` (`rough` or `snapped`) and evidence `user-estimated`. Endpoints lie on a common horizontal construction plane. Snapping is an authoring aid, not evidence of physical accuracy. These walls are included in the rendered scene GLB as ordinary mesh nodes carrying `extras.sm3dlId`.

`workspace.measurements` stores endpoint pairs, IDs, method `euclidean-model` and evidence `model-derived`. Values are straight-line distances in the model, not a walkable route, a geodesic, a survey or an accessibility assessment. Measurement labels are view overlays, not exported furniture meshes.

`scene.glb` is an interchange snapshot. It does not preserve Blender modifier stacks, every source material extension, or procedural editing history. The original GLB is retained separately when one was loaded. Native Blender support currently means glTF import and explicit coordinate conversion in consuming tools; a Blender add-on is not included in 0.1.

## Annotations and meaning

All marks have stable IDs. Pencil/eraser marks contain normalized points, normalized stroke width (relative to image width), and color. Arrows contain two points. Text includes a normalized position and size. Images reference a hashed asset and a normalized rectangle; they can be moved/resized independently.

Eraser marks remove earlier annotation pixels, never the clean scene image. The ordered mark list remains the source of the editable overlay. Reference images are attached evidence, not automatically inserted 3D objects.

A mark may have `anchor: null` or an optional point/normal/mesh ID from a raycast at the stroke's last point. This is one supporting surface observation, **not a claim that the entire stroke lies on that surface**. An arrow's last point is its tip. A long pencil stroke may pass over unrelated objects. Do not automatically interpret an arrow as an operation.

Anchors are valid only against the frozen scene revision and exact model. 0.1 does not store triangle barycentric coordinates or guarantee surface tracking after geometry edits. If the model changes, treat the anchor as stale rather than silently attaching it to the nearest new surface.

The person's `note` is the authoritative freeform design request. 0.1 deliberately does not infer formal operations from scribbles. A future intent extension should express proposed add/move/remove/restyle operations, hard/soft constraints, tolerances, references, unresolved questions and proposed/applied status. Such semantics must be authored or confirmed, not silently invented by the exporter.

## Storage profiles

**Static browser profile:** serve `editor.html`, `public/`, `shared/`, `vendor/` and `spec/` over HTTP(S). Saves use IndexedDB on that origin. A small workspace draft uses localStorage. Browser/site-data clearing removes these local saves; export ZIPs for portable backups. No remote backend, telemetry or model API is used. HTTPS images may be fetched only when the user drops an image URL, subject to the source's CORS policy.

**Local server profile:** `node server.mjs`, loopback only, default port 4322. Assets and saved views go to `data/assets` and `data/shots` (or `SCRIBBLE_DATA_DIR`). The server rejects foreign Host headers and cross-origin writes. It is not an authenticated multi-user service and should not be exposed through a public tunnel.

API: `GET api/health`, `GET api/shots`, `GET api/shots/<id>`, `PUT api/shots/<id>` with `{document, revision}`, `POST api/assets` with PNG or GLB bytes, `GET api/assets/<hash>.<extension>`. Conflicting revisions return 409. Writes are serialized per view and JSON records are atomically renamed. Storage data is not included in the static site build.

## Architecture and future adapters

Domain validation and ZIP integrity live in `shared/`, with no DOM, renderer or server dependency. Rendering/navigation, sketch input, storage, package exchange and interface orchestration are separate JavaScript modules. A tool can validate documents without opening a browser; a renderer can be replaced without changing the document contract.

The current adapters include a headless package inspection CLI and a bundled local MCP companion returning view metadata plus images. A native Blender add-on remains future work. For future tool responses, tie proposed changes to view/mark IDs, preserve uncertainty and require a review step before applying scene changes.

Related standards: [glTF 2.0](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html) supplies geometry interchange; [BCF 3.0](https://github.com/buildingSMART/BCF-XML/tree/release_3_0/Documentation) supplies precedents for viewpoint/snapshot exchanges; [W3C Web Annotation](https://www.w3.org/TR/annotation-model/) supplies annotation semantics. [IIIF Presentation 4.0](https://iiif.io/api/presentation/4.0/) has relevant 3D scene/annotation work but was a draft when this profile was prepared. No BCF or IIIF conformance is claimed. A future converter must report information it cannot preserve.

## Evidence and evaluation

Passing a JSON validator proves structural validity, not design correctness. Reprojection tests check pixel/camera consistency; round trips check file preservation; usability trials check whether humans can express intent. To demonstrate better LLM handoffs, compare screenshot-only, screenshot-plus-prose and this package on the same tasks: placement error, constraint violations, clarification burden and reproducibility. No model-performance benefit is established by the format alone.
