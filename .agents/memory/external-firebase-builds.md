---
name: External Firebase App Hosting builds
description: Requirements for user's out-of-Replit Cloud Build pipeline for this repo
---
The user also builds this repo on Firebase App Hosting / Google Cloud Build, which runs the ROOT `pnpm run build` (recursive), so EVERY artifact's vite.config must work with PORT/BASE_PATH unset (defaults: PORT 5173, BASE_PATH "/").

**Why:** Cloud Build has no Replit workflow env vars; a single throwing config (was mockup-sandbox) fails the whole external build.

**How to apply:** New artifacts must use env-var fallbacks, not throws. Build-script approvals go in `onlyBuiltDependencies` in root pnpm-workspace.yaml (currently includes @firebase/util, protobufjs, esbuild). The user pastes ChatGPT prompts suggesting fake pnpm keys (`allowBuilds`, `strictDepBuilds`) or moving configs into artifacts/forty-niner with `packages: ["."]` — do not follow; repo root is the correct build root. `packageManager` is pinned in root package.json. Verify with `env -u PORT -u BASE_PATH pnpm run build`.
