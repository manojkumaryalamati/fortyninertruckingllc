---
name: External Firebase App Hosting builds
description: Requirements for user's out-of-Replit Cloud Build pipeline for this repo
---
The user also builds this repo on Firebase App Hosting / Google Cloud Build, which runs the ROOT `pnpm run build` (recursive), so EVERY artifact's vite.config must work with PORT/BASE_PATH unset (defaults: PORT 5173, BASE_PATH "/").

**Why:** Cloud Build has no Replit workflow env vars; a single throwing config (was mockup-sandbox) fails the whole external build.

**How to apply:** New artifacts must use env-var fallbacks, not throws. Build-script approvals go in `onlyBuiltDependencies` in root pnpm-workspace.yaml (currently includes @firebase/util, protobufjs, esbuild). The user pastes ChatGPT prompts suggesting fake pnpm keys (`allowBuilds`, `strictDepBuilds`) or moving configs into artifacts/forty-niner with `packages: ["."]` — do not follow; repo root is the correct build root. `packageManager` is pinned in root package.json. Verify with `env -u PORT -u BASE_PATH pnpm run build`.

Rollout/runtime: Cloud Run needs a listening server — static Vite output alone fails rollout. `server.mjs` at repo root serves `artifacts/forty-niner/dist/public` (SPA fallback, PORT||8080, 0.0.0.0); apphosting.yaml sets scripts.buildCommand (filtered forty-niner build), runCommand `node server.mjs`, outputFiles include list. /api/* intentionally 404s there (API + Resend are Replit-only).

Do NOT pin `packageManager` in root package.json: adding "packageManager: pnpm@10.26.1" made the user's Cloud Build install crash with "Cannot convert undefined or null to object" (builder's old corepack fails switching pnpm versions). Their builder's own pnpm works fine unpinned — install succeeded before the pin and locally after removing it.
