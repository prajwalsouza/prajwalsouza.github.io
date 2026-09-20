# Verification — 2026-09-20

Tested artifact: standalone app source, generated plugin runtime, and static demo distribution. Node.js v26.0.0 was used locally; the documented minimum is Node 22, which was not separately exercised.

## Passed

- Seven automated Node tests: ZIP binary/Unicode round trip and tamper/traversal rejection; camera reprojection and screenshot letterboxing; wall snapping/validation/history; malformed camera/marks; external-URL GLB rejection; HTTP save/revision/immutable-camera/origin/host checks; complete packaged MCP tool transport.
- In-app browser, 1280 × 720: blank scene, courtyard selection, Fly/Sketch/Build switching, frozen camera, pencil and arrow drawing, title/notes, autosave, explicit save, reload and saved-view recovery.
- Browser wall authoring: 10 cm snapping, two-point wall, undo/redo, surface measurement, capture and export. The resulting package contained one wall and one measurement.
- Browser download: a real annotated SM3DL ZIP was downloaded and independently inspected with the Node CLI and Python zipfile; hashes, marks, note, camera and GLB were retained.
- `tests/roundtrip.html`: package import/hash validation, actual GLB load/render/export, PNG normalization, reference-image addition, undo/redo, annotated preview, second export/import and exact camera/mark preservation.
- Local server mode: a browser capture saved to disk and was listed through the API.
- Narrow 390 × 844 CSS viewport in an iframe: populated sketch and blank scene inspected. This verifies responsive layout, not a physical phone or touch/keyboard behavior.
- Separate `demo.html`: live generic courtyard editor and links inspected.
- Plugin manifest and skill validators pass. The Codex CLI recognizes the repo marketplace and lists the plugin as available, not installed.
- Packaged MCP: real stdio initialization/discovery, all six tools, saved PNG response, GLB loading, wait success/timeout, export, invalid IDs/paths, and process shutdown. SDK transport tests do not establish native host installation or embedded-widget rendering.

## Limits

- Native operating-system file pickers, clipboard image input, remote image CORS behavior, physical touch/stylus input and large-model performance were not manually exercised. Their underlying GLB/image/package pipelines have browser integration coverage.
- The editor is keyboard-first for full flight movement; touch supports dragging to look and sketching.
- No Blender add-on, MCP Apps inline iframe, automatic AI scene mutation, or official plugin-directory approval is claimed.
- A browser-injected/otherwise unattributed MutationObserver error appeared while inspecting the iframe demo. No MutationObserver code exists in the shipped app/runtime, and the demo rendered successfully. Its origin was not established.
- Browser storage can be cleared/evicted. ZIP export is the portable backup.

## Reproduce

`npm test`, then `python3 -m http.server 4323 --bind 127.0.0.1`. Open `tests/roundtrip.html`, click its test button, and expect PASS. `tests/layout.html` shows generic scenes at narrow CSS widths. Use `node server.mjs` for the disk-storage profile.

## 0.2 annotation and Send revision

- Eight Node tests pass, including real packaged stdio MCP send/wait/read: drafts do not submit, a pending receive wakes on explicit send with both PNGs, stale revisions fail, retries do not duplicate, sessions are isolated, and later draft edits leave the sent snapshot unchanged.
- Browser: selected two areas on the generic courtyard, attached notes beside them, added pencil ink, sent through the actual packaged MCP process, received both PNG image blocks and exact camera/marks, and visually inspected the returned annotated PNG. The editor reported delivery through MCP. Reopened a selected area to edit its note.
- Browser package round trip passes with region bounds/text/IDs, camera, references and rendered GLB preserved; undo/redo also checked.
- Narrow 390 × 844 CSS iframe checked for blank, annotation tools and anchored note composer. This is responsive layout verification, not a physical phone or stylus test.
- No native Codex host plugin activation or automatic idle-task wake is claimed. Verification used a real stdio MCP client harness; the plugin skill documents the bounded receive-call workflow and idle-task limit.
