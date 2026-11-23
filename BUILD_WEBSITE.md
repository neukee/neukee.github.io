# NEUKEE — Production Website & Lead-Generation Engine Specification

## 0. Execution Rules (Strict Requirements)
- **Zero Stubs or Placeholders:** Every page, component, guide article, and interactive widget must be 100% implemented with full production copy and working vanilla JS/TypeScript interactivity. Do not write `<!-- TODO -->` or abbreviated text.
- **Tech Stack:** Astro 4/5 (Static Site Generation) + Tailwind CSS + TypeScript. Zero external runtime dependencies or heavy client-side frameworks required; use clean semantic HTML, Tailwind utility classes, and lightweight inline `<script>` tags for interactive tabs, copy-to-clipboard buttons, and form validation.
- **Deployment Target:** GitHub Pages at `https://github.io` via `.github/workflows/deploy.yml`. Ensure `astro.config.mjs` sets `site: 'https://github.io'` and `output: 'static'`.

---

## 1. Visual Design System & Brand Identity
- **Theme:** Ultra-crisp dark engineering aesthetic (inspired by Linear, Vercel, and Raycast).
- **Color Palette:**
  - Page Background: `#09090B` (`zinc-950`)
  - Card / Surface Background: `#111113` with `1px solid #27272A` (`zinc-800`) border and subtle hover glow (`hover:border-zinc-700`)
  - Primary Text: `#FAFAFA` (`zinc-50`)
  - Secondary / Muted Text: `#A1A1AA` (`zinc-400`)
  - Primary Accent (Verified / Safe / CTA): `#10B981` (`emerald-500`) with dark text `#052E16` on solid primary buttons
  - Warning Accent (Drift / Breaking): `#F59E0B` (`amber-500`)
  - Error Accent (Blocker / ABI Fail): `#EF4444` (`red-500`)
- **Typography:**
  - Google Fonts: `Inter` (weights 400, 500, 600, 700) for UI/headings and `JetBrains Mono` (weights 400, 500, 600) for CLI commands, code blocks, badges, and terminal outputs.
- **Logo SVG (`src/components/Logo.astro`):**
  - Clean geometric terminal + paw badge in `#10B981` paired with bold uppercase `NEUKEE` wordmark.

---

## 2. Complete Repository File Tree
Generate every file listed below:

```text
/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   ├── robots.txt
│   ├── favicon.svg
│   └── og-preview.svg
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── GuideLayout.astro
│   ├── components/
│   │   ├── Logo.astro
│   │   ├── Navbar.astro
│   │   ├── TerminalDemo.astro
│   │   ├── FleetAuditSection.astro
│   │   └── Footer.astro
│   └── pages/
│       ├── index.astro
│       ├── security.astro
│       └── guides/
│           ├── index.astro
│           ├── node-22-eol-migration-checklist.astro
│           ├── node-22-to-26-breaking-changes.astro
│           ├── nextjs-15-to-16-upgrade-guide.astro
│           └── verify-ai-agent-prs-in-ci.astro
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## 3. Configuration & Deployment Files

### `package.json`
Include `astro`, `@astrojs/tailwind`, `tailwindcss`, and `@astrojs/sitemap` so `sitemap-index.xml` generates automatically at build time.

### `astro.config.mjs`
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://github.io',
  output: 'static',
  integrations: [tailwind(), sitemap()],
});
```

### `public/robots.txt`
```text
User-agent: *
Allow: /

Sitemap: https://github.io/sitemap-index.xml
```

### `.github/workflows/deploy.yml`
```yaml
name: Deploy Neukee Site to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - name: Install dependencies
        run: npm ci
      - name: Build static site
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 4. Component Specifications

### A. `BaseLayout.astro`
- Props: `title`, `description`, `canonicalPath`, `ogType` (default `'website'`), `jsonLd` (optional object).
- Includes complete `<head>` with viewport, canonical URL (`https://github.io${canonicalPath}`), OpenGraph tags, Twitter card tags, Google Fonts (`Inter` + `JetBrains Mono`), and injected `<script type="application/ld+json">`.
- Default JSON-LD on homepage: `SoftwareApplication` schema linking to `https://github.com` under Apache-2.0 license.

### B. `Navbar.astro`
- Sticky top bar (`backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/80`).
- Left: `<Logo />` + `v0.1.0 Dec 8` emerald pill badge.
- Center links (responsive mobile menu toggle included):
  - `How It Works` (`/#how-it-works`)
  - `CI Verification` (`/#ci-engine`)
  - `Upgrade Guides` (`/guides`)
  - `Security` (`/security`)
- Right CTAs:
  - GitHub link (`https://github.com`) with GitHub SVG icon + `Star on GitHub`
  - Solid emerald button: `Free Fleet Audit` (`/#fleet-audit`)

### C. `TerminalDemo.astro`
- Interactive macOS/Linux window frame with 3 clickable tabs + a "Copy Output / Command" button with live `"Copied!"` feedback:
  1. **Tab 1: `CLI Scan (v0.1.0)`** — Shows `neukee scan --target node24,next16` flagging:
     - `[ERROR] RUNTIME_DRIFT` (`.nvmrc` specifies `24` vs `Dockerfile` `FROM node:20-alpine`)
     - `[ERROR] NATIVE_ADDON_ABI` (`pnpm-lock.yaml` transitive `canvas@2.11.2` missing Node-API prebuilt for Node 24)
     - `[WARN] NEXT16_ASYNC_REQUEST_API` (`src/app/dashboard/page.tsx:14:22` synchronous `cookies()`)
     - Each finding includes a clickable release-note source URL (`nodejs.org` / `nextjs.org`).
  2. **Tab 2: `CI Behavioral Diff (v0b)`** — Shows PR #482 (`chore(deps): bump next 15.2 -> 16.0`), cached `main` baseline SHA `9f8a21c`, CI time `4m 12s`, `42/45 routes exercised`, `0 egress calls`, `[ACTION REQUIRED] POST /api/checkout` (0 DB rows inserted vs 1 baseline row due to dropped cookie header) with local replay command `npx neukee replay --diff-id chk_09a1`, and `[HARMLESS DOCUMENTED] GET /api/products` (`Cache-Control` default shift).
  3. **Tab 3: `GitHub Action (SARIF)`** — Shows complete `.github/workflows/neukee.yml` uploading `neukee.sarif` to GitHub Code Scanning (`github/codeql-action/upload-sarif@v3`).

### D. `FleetAuditSection.astro` (`#fleet-audit`)
- High-contrast lead-generation section targeting CTOs, VPs of Engineering, and Founders facing the **April 30, 2027 Node.js 22 EOL**:
- **Left Card — Free 15-Minute Fleet Readiness Call:**
  - Bullet points: Live scan on 1–2 repos, Node 24/26 & Next.js 16 blocker check, CI time & effort estimate.
  - Primary CTA button linking to `https://cal.com` (opens in new tab) + secondary `mailto:hello@neukee.dev?subject=Fleet%20Readiness%20Audit` fallback.
- **Right Card — Request a 48-Hour Full-Fleet Audit Blueprint:**
  - Interactive form with:
    - Work Email (`input[type="email"]`, required)
    - Company / GitHub Org Name (`input[type="text"]`, required)
    - Repository Count (`select`: `1–10 repositories`, `11–50 repositories`, `51–200 repositories`, `200+ repositories`)
    - Primary Target (`select`: `Node.js 22 EOL -> Node 24 / 26`, `Next.js 15 -> 16`, `Both Node.js & Next.js`, `Continuous AI/Dependency PR Verification`)
  - Client-side JS handler that validates inputs, displays a sleek confirmation state with a downloadable/copyable pre-call checklist, and triggers a pre-filled `mailto:hello@neukee.dev` dispatch so zero leads are lost even on static hosting.

---

## 5. Page-by-Page Content Requirements

### 1. `src/pages/index.astro` (Landing Page)
- **Hero Section:**
  - Eyebrow: `NODE.JS 22 EOL: APRIL 30, 2027 • OPEN-SOURCE & AIR-GAPPED`
  - H1: `Know what breaks before you upgrade Node.js or Next.js.`
  - Subheadline: `Point Neukee at your repository and target version. It checks your code, lockfiles, and deployment configs against official release notes—catching runtime drift, native C++ addon blockers, and silent regressions before they hit production.`
  - Copyable CLI pill: `npx neukee scan --target node26`
  - Trust bar: `🔒 Zero Network Calls` | `📚 Release-Note Cited` | `🎯 Deterministic SARIF` | `🛡️ Hostile-Input Hardened`
- **Interactive `<TerminalDemo />`**
- **Section `#how-it-works` — "Upgrades rarely fail on the change you read about."**
  - 3 detailed cards:
    1. **Runtime & Deploy Drift** (`.nvmrc`, `package.json#engines`, `Dockerfile`, CI workflows, Vercel/Lambda configs).
    2. **What You Really Install** (Lockfile-level inspection of `pnpm-lock.yaml` & `package-lock.json` for C++ native addons and React 19 peer conflicts without running `npm install`).
    3. **Continuous Behavioral Verification (`#ci-engine`)** (Self-hosted CI engine that compares cached `main` behavioral snapshots against dependency & AI-agent PRs across HTTP, `undici`, and PostgreSQL row deltas with automatic two-run noise masking).
- **Section — "Built to be the safest binary in your CI."** (4 security pillars + link to `/security`).
- **Section — Transparent Roadmap (`v0.1.0 Dec 8, 2026` → `v0b Design Partner Alpha` → `v1 Enterprise Platform`).**
- **`<FleetAuditSection />`**

### 2. `src/pages/security.astro`
• Full technical security architecture page for InfoSec & CTO reviews:
	• Zero-egress guarantee (enforced by automated network-blocking unit tests).
	• Static AST (oxc-parser) and lockfile parsing—zero execution of untrusted code or lifecycle scripts.
	• Hostile-input protections (file size caps, symlink refusal, bounded matching, .gitignore parity).
	• CI Sandbox & Compliance (NODE_EXTRA_CA_CERTS zero-egress proxy, CODEOWNERS-locked configuration so AI coding agents cannot bypass checks, and signed in-toto attestations for SOC 2 CC8.1 / PCI-DSS 6.3.3).

3. src/pages/guides/index.astro + 4 Full SEO Guide Pages (GuideLayout.astro)

Each guide must include a table of contents, real code examples (before vs after), Article JSON-LD schema, and an end-of-article CTA banner linking to neukee/neukee and /#fleet-audit:
1. node-22-eol-migration-checklist.astro: Complete timeline (Node.js 22 EOL April 30, 2027; Node 24 LTS; Node 26 LTS) and 7-point engineering audit checklist.
2. node-22-to-26-breaking-changes.astro: OpenSSL 3.5 2048-bit RSA minimums, V8/ABI native addon rebuilds (NODE_MODULE_VERSION), require(esm) edge cases, and removed deprecated Node APIs.
3. nextjs-15-to-16-upgrade-guide.astro: Async request APIs (cookies(), headers(), params, searchParams), fetch and GET route handler caching defaults, React 19 peer dependency resolution, and what @next/codemod misses.
4. verify-ai-agent-prs-in-ci.astro: Why unit tests with mocked fetch/database calls fail to catch subtle regressions in Renovate, Dependabot, and AI coding agent PRs—and how side-by-side behavioral diffing solves code review bottlenecks.
