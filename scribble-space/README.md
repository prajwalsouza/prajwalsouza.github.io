# Scribble Space

A portable 3D sketchbook: fly around a scene, freeze the camera, scribble and attach reference images, then export an inspectable SM3DL handoff for a person or an LLM.

**Serve `editor.html` to edit. Serve `demo.html` to demonstrate.** They are separate entry pages sharing the same JavaScript modules. The core editor starts blank for a new browser. The demo explicitly loads a generic courtyard. No personal building model, cached capture or project data is shipped.

## Run without a backend

Download or clone this repository, then:

```sh
python3 -m http.server 4322 --bind 127.0.0.1
```

Open <http://127.0.0.1:4322/editor.html>. This is the quickest way for an LLM or a person to serve the editor. Modules and WebGL require HTTP(S), so double-clicking an HTML file using `file://` is not supported. No npm installation, build command, CDN, account or API key is needed; a pinned Three.js runtime is included with its license.

Saves stay in that browser's IndexedDB. Export packages to keep portable backups. Clear-site-data removes browser saves. Your model is not sent to an LLM or to GitHub by the app.

## Run with local disk saves

Requires Node.js 22 or later, no dependencies to install:

```sh
node server.mjs
```

Open <http://127.0.0.1:4322/editor.html>. The app detects the local server and saves captures under `data/`. Set `PORT` and `SCRIBBLE_DATA_DIR` if needed. This is a local, single-user service; keep it on loopback. The server profile and static profile export the same format.

## Use it

- **Explore:** drag to look; WASD to move; Q/E down/up; Shift faster. Wheel moves forward/back. Home frames the model. Touch can drag to look; full movement is currently keyboard-first.
- **Annotate:** freezes a screenshot and its camera. Use Pencil to draw, or Select area to drag a rectangle (or click a spot) and attach a note right there. Click an existing area to edit its note. Enter attaches, Shift + Enter adds a line, Escape cancels. Undo is always visible; arrows, eraser, references, color and redo sit under the drawing ••• menu. Paste/drop images, then use Select area to move or resize them. Drafts autosave. In MCP mode, **Send to Codex** (Ctrl/Command + Enter) submits both PNGs and exact metadata.
- **Scene → Walls & measurements:** click two points for a wall on the selected horizontal drawing plane; choose free placement or a 10/50 cm snap. Set height/thickness before placing. Measure uses two raycast surface points and reports straight-line model distance. Use Explore to reposition the camera between placements.
- **Scene:** blank ground, empty room, courtyard, or a self-contained GLB up to 64 MB. Standard/Meshopt GLB supported; Draco/KTX2 and external asset URLs are not supported in this release.
- **Views:** reopen a saved screenshot, annotations, scene recipe and exact camera. View details (top •••) contains naming, optional overall context, Save a copy and export.
- **Export:** current view as `.sm3dl.zip`: clean and annotated images, JSON, reference images, original imported GLB when applicable, rendered `scene.glb`, and a readable prompt/specification. Import a package through Load.

The editor is an early working release. It has no automatic LLM editing, multiplayer, CAD solver or Blender add-on. Generated wall dimensions are approximate model values. Rendered GLB is portable geometry, not a lossless native Blender project.

## File map

- `editor.html`: reusable editor entry.
- `demo.html`: separate public demonstration.
- `public/scene.mjs`: Three.js rendering, navigation, raycasts and GLB export.
- `public/sketch.mjs`: editable 2D annotation layer.
- `public/persistence.mjs`: browser/server storage adapters.
- `public/handoff.mjs`: package export/import.
- `public/app.mjs`: interface coordination.
- `shared/`: environment-independent validation, geometry helpers and ZIP primitives.
- `spec/SM3DL.md`: format and storage profiles, also readable inside the editor.
- `spec/view.schema.json`: structural JSON Schema; `validateShot` also applies semantic limits.
- `server.mjs`, `lib/`: optional loopback server and atomic file storage.
- `plugins/scribble-space/`: downloadable Codex plugin with a bundled editor, skill and stdio MCP companion.
- `scripts/publish-demo.mjs`: copies only the public runtime to a website subdirectory, with a release inventory.

## Use from Codex

```sh
codex plugin marketplace add prajwalsouza/Scribble-Space
codex plugin add scribble-space@scribble-space-plugins
```

Start a new task, then ask Codex to open a 3D sketch canvas. It can start the editor, receive explicitly sent PNG images, selected-area notes and cameras through MCP. Autosave does not send. A waiting receive call gets the handoff immediately; an idle host task must be resumed. See [plugin setup and capabilities](docs/CODEX-INTEGRATION.md). This is repo distribution, not an official-directory listing.

## Verify

```sh
npm test
```

See `docs/VERIFICATION.md` for the actual browser and release checks. This repository's tests do not prove physical dimensions or better LLM reasoning.

## Public demo distribution

The canonical source lives in this repository. The website receives an allowlisted static distribution. `index.html` in that distribution is the demo entry; `editor.html` remains separate. No server data, original project files or machine-specific configuration is copied.

```sh
node scripts/publish-demo.mjs /path/to/website/scribble-space
```

The command writes files only; it does not commit, push or deploy. The published demo is intended for https://prajwalsouza.github.io/scribble-space/.

## License

MIT for this app and its original generic scene recipes. See `THIRD-PARTY.md` for the bundled Three.js and Meshopt notices. Imported files retain their own rights; they are user data, not app assets.
