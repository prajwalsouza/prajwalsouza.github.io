# Codex plugin and MCP

The downloadable `scribble-space` plugin contains a ready-to-run editor, a skill and a bundled stdio MCP server. **Node.js 22+ is the only runtime prerequisite.** Normal installation does not run npm or download dependencies.

## Install from the public repo marketplace

```sh
codex plugin marketplace add prajwalsouza/Scribble-Space
codex plugin add scribble-space@scribble-space-plugins
```

Start a new Codex task after installation. Enable the plugin's MCP connection if the client asks. Try: “Open a 3D sketch canvas so I can show you what I mean.”

Alternatively clone/download the repository and add its root as a local marketplace. The repository contains `.agents/plugins/marketplace.json`. A standalone plugin ZIP is also attached to the GitHub release for copying into a developer's own marketplace.

The plugin is distributed through this public repository. It has not been submitted to or approved for the universal OpenAI Plugins Directory. That official-directory submission is a separate process; current public MCP submissions expect a stable HTTPS service. This package intentionally runs locally for developer use.

## Interaction

1. Codex calls `open_sketch`; the plugin starts its editor on a free loopback port.
2. Codex opens the returned URL in its browser panel, or gives the user the URL when that panel is unavailable.
3. The user flies, freezes the view, and draws. Local disk saves happen automatically.
4. Codex waits for a new save or lists views, then calls `read_sketch` to receive images and precise JSON.
5. Codex interprets the requested change and edits the user's project within the task's authorization.

An autosave can be an unfinished thought. `wait_for_sketch` is a change notification aid, not an approval signal. Drawings are not sent to an AI model until the host calls a tool that returns their content.

## Tools

| Tool | Result |
| --- | --- |
| `open_sketch` | Local editor URL, timestamp; optional generic template, brief, user-selected GLB path. |
| `list_sketches` | Saved view IDs, titles, revisions and timestamps. |
| `read_sketch` | Saved document plus annotated PNG; optionally both clean and annotated PNGs. |
| `wait_for_sketch` | Changed views since a timestamp; bounded to 25 seconds. |
| `export_sketch` | A ZIP on local disk with images, recipe, camera and original model. |
| `read_format_spec` | Complete SM3DL specification. |

The MCP export does not contain a freshly rendered `scene.glb`; use the browser Export button for that. It retains an original loaded GLB and the wall recipe.

## Packaging

`plugins/scribble-space/plugin.json` and `mcp.json` use the portable Agent Plugins layout. `.codex-plugin/plugin.json` and `.mcp.json` provide compatibility metadata. `${PLUGIN_ROOT}` addresses the installed runtime, and `${PLUGIN_DATA}` holds writable project data. The MCP transport is stdio; its HTTP server is loopback-only and is not an internet MCP endpoint.

The plugin's `app/` is a generated, allowlisted copy of the core app. Source lives in the repository root. Rebuild after changing core files:

```sh
npm ci --prefix mcp
node scripts/build-plugin.mjs
npm test
```

`MCP_BUILD_RUNTIME` can point at a separate build-dependency directory. Pinned versions are in `mcp/package-lock.json`; bundled dependency versions and licenses are recorded in the plugin. No personal model, capture or data directory is bundled.

## Evidence and limits

The packaged server is tested over real stdio JSON-RPC: initialization, discovery, every tool, invalid input, HTTP editor startup, GLB transfer, PNG return, waiting, export and shutdown. Manifest and skill validation also pass. Actual Codex host installation/rendering must be distinguished from these transport tests; see the verification log for the tested host state.

This release uses the browser panel for its editable canvas. A future MCP Apps adapter can render inline in compatible hosts; it is not implemented here.

Official references checked September 20, 2026: [Plugins](https://learn.chatgpt.com/docs/plugins), [Package your plugin](https://developers.openai.com/plugins/build/plugins), [Build an MCP server](https://developers.openai.com/plugins/build/mcp-server), [Add custom UI](https://developers.openai.com/plugins/build/chatgpt-ui).
