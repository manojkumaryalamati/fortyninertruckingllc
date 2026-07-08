---
name: External Firebase App Hosting builds
description: Requirements for user's out-of-Replit Cloud Build pipeline for this repo
---
The user also builds this repo on Firebase App Hosting / Google Cloud Build, which runs the ROOT `pnpm run build` (recursive), so EVERY artifact's vite.config must work with PORT/BASE_PATH unset (defaults: PORT 5173, BASE_PATH "/").

**Why:** Cloud Build has no Replit workflow env vars; a single throwing config (was mockup-sandbox) fails the whole external build.

**How to apply:** New artifacts must use env-var fallbacks, not throws. Build-script approvals go in `onlyBuiltDependencies` in root pnpm-workspace.yaml (currently includes @firebase/util, protobufjs, esbuild). The user pastes ChatGPT prompts suggesting fake pnpm keys (`allowBuilds`, `strictDepBuilds`) or moving configs into artifacts/forty-niner with `packages: ["."]` — do not follow; repo root is the correct build root. `packageManager` is pinned in root package.json. Verify with `env -u PORT -u BASE_PATH pnpm run build`.

Rollout/runtime: Cloud Run needs a listening server — static Vite output alone fails rollout. `server.mjs` at repo root serves `artifacts/forty-niner/dist/public` (SPA fallback, PORT||8080, 0.0.0.0); apphosting.yaml sets scripts.buildCommand (filtered forty-niner build), runCommand `node server.mjs`, outputFiles include list. /api/* intentionally 404s there (API + Resend are Replit-only).

Do NOT pin `packageManager` in root package.json: adding "packageManager: pnpm@10.26.1" made the user's Cloud Build install crash with "Cannot convert undefined or null to object" (builder's old corepack fails switching pnpm versions). Their builder's own pnpm works fine unpinned — install succeeded before the pin and locally after removing it.

SWITCHED TO CLASSIC FIREBASE HOSTING (static): App Hosting/Cloud Run abandoned per user — apphosting.yaml and server.mjs deleted. firebase.json at repo root: public=artifacts/forty-niner/dist/public, SPA rewrite to /index.html, predeploy runs the filtered forty-niner build. .firebaserc default project: fortyninertruckingllc. User deploys from their machine (`firebase deploy --only hosting`) — CLI login can't happen in Replit. Remind them to delete the old App Hosting backend in Firebase console so pushes stop triggering failed Cloud Builds.

Production unstyled-UI incident: user's Windows build produced 8.5KB CSS (correct: ~118KB) because pnpm-workspace.yaml overrides excluded all non-linux-x64 platform binaries (tailwind oxide, lightningcss, rollup, esbuild). Removed all "-" platform-exclusion overrides so off-Replit builds work. Do not re-add them while the user builds/deploys from their own machine. Also removed an invalid `allowBuilds:` yaml section that crept in (not a pnpm key).
