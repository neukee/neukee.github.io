# NEUKEE — Flagship Living-Motion UI/UX, Card-Stacking Slides & AI-SEO System

## 0. Non-Negotiable Visual Standard
Ban every trace of generic AI-generated templates: **zero sharp 90-degree corners, zero flat single-tone boxes, zero static lifeless backgrounds.** Every pixel must feel like a custom $25,000 flagship Mac software launch page—always subtly in motion, tactile, luminous, and physically layered.

---

## 1. Continuous Living Background & Kinetic Typography (`LivingBackdrop.astro`)
Implement a full-viewport, GPU-composited (`will-change: transform`), 60fps living background layer behind the frosted glass UI:

1. **Perpetual Northern Aurora Lights (Mesh Shader / CSS+Canvas):**
   - Multi-layered, slow-morphing organic aurora ribbons in **Electric Sapphire (`#0A84FF`)**, **Luminous Cyan (`#06B6D4`)**, **Emerald (`#10B981`)**, and **Deep Violet (`#6366F1`)** drifting continuously on a 24-second harmonic loop (`@keyframes auroraDrift`), overlaid with a ultra-fine **2% SVG film-grain noise texture** so gradients look rich and silky with zero color banding.
2. **Kinetic Giant Background Typography (Thick Bold Marquee):**
   - Behind the hero and section transitions, render massive, ultra-bold display typography (`clamp(6rem, 16vw, 15rem)`, weight `900`, tight `-0.05em` tracking, low-opacity `rgba(255,255,255,0.028)` with subtle edge-fade mask) scrolling continuously in opposite horizontal directions (`NODE 26 • ZERO EGRESS • DETERMINISTIC • NEXT 16 •`).
   - Reacts subtly to scroll velocity (`scrollY` skew/parallax) so the background typography feels physically connected to user momentum.
3. **Interactive Cursor Light Field:**
   - A soft radial specular spotlight follows the cursor across the aurora canvas and illuminates frosted card borders as the pointer glides over them.

---

## 2. Stacking Slide Page Transitions (`StackingSlides`)
Give the page the physical feel of **macOS Stage Manager / Keynote slides gliding over one another** as the user scrolls:
- **Sticky Overlapping Card-Slide Sections:**
  - Configure major homepage bands (`Hero`, `Interactive Terminal Showcase`, `Architecture Bento`, `Security & Zero-Egress Vault`, `Fleet Audit Offer`) as full-width rounded frosted glass decks (`rounded-[32px]`, `border-t border-white/15`, `shadow-[0_-24px_60px_rgba(0,0,0,0.85)]`).
  - Use CSS `position: sticky; top: 88px;` paired with a lightweight `requestAnimationFrame` scroll-progress observer: as the next slide rises up over the previous slide, the covered slide smoothly **scales down (`1 -> 0.95`), dims slightly (`brightness(1 -> 0.72)`), and blurs (`0px -> 3px`)**, creating true 3D physical depth.
- **View Transitions API (`<ClientRouter />` / `ViewTransitions` in Astro):**
  - Enable native Astro View Transitions so navigating between `/`, `/security`, and `/guides/*` cross-fades and slides smoothly like a native desktop app without white flashes.

---

## 3. Glassmorphic Floating Navbar & Living Glassmorphic Footer

### A. Smart Auto-Hiding Glassmorphic Navbar (`Navbar.astro`)
- Floating capsule (`rounded-full`, `backdrop-blur-2xl saturate-200 bg-zinc-900/55`, `border border-white/15`, top specular rim highlight).
- **Scroll-Direction Physics:**
  - Scrolling **UP** (`currentScrollY < lastScrollY` beyond 10px): Glides smoothly up and disappears (`translateY(-140%)`, `opacity: 0`).
  - Scrolling **DOWN** (`currentScrollY > lastScrollY`) or near top (`scrollY < 40`): Glides cleanly back into view (`translateY(0)`, `opacity: 1`).

### B. Glassmorphic Monumental Footer (`Footer.astro`)
- Matching frosted obsidian glass container (`rounded-t-[36px] border-t border-white/15 backdrop-blur-2xl bg-zinc-950/70`) bathed in a bottom aurora glow.
- Features an oversized gradient-textured `NEUKEE` wordmark, crisp navigation columns, live system status pill (`v0.1.0 Open Source • Zero Telemetry Verified`), and the **HD Shining Blue Social Dock** (GitHub, X, LinkedIn, Email) where clicking any icon ignites a persistent glowing sapphire aura (`#0A84FF` -> `#38BDF8`) with an animated light sweep.

---

## 4. Custom Textures, Luminous Gradients & HD Squircle Controls
- **Text Gradients:** Headline focal words use multi-stop metallic-luminous gradients (`bg-gradient-to-br from-white via-zinc-100 to-sky-300 bg-clip-text text-transparent`) with subtle text-shadow bloom.
- **Icon & Card Surfaces:** Every icon sits inside a custom **macOS Squircle tile** (`rounded-2xl`) with a 45-degree metallic gradient border, inner top highlight (`inset 0 1px 0 rgba(255,255,255,0.22)`), and dual-tone SVG gradients (never flat monochrome icons).
- **HD Tactile Buttons:** Pill and squircle buttons with animated shimmer border (`conic-gradient` rotating light beam on primary CTA), smooth hover elevation (`-2px`), and physical spring depression on click (`scale(0.96)`).

---

## 5. Maximum AI-Crawler SEO & Online Presence Architecture (`llms.txt` + Structured Data)
Make Neukee effortlessly discoverable and citable by **Google, ChatGPT Search, Perplexity, Claude, and Bing Copilot**:
1. **`public/llms.txt` and `public/llms-full.txt`:**
   - Generate the emerging industry-standard `llms.txt` file at the root (`https://github.io`) containing a crisp, structured summary of Neukee, supported versions (Node.js 22 → 24/26, Next.js 15 → 16), zero-egress security guarantees, CLI commands, and direct canonical links to every guide and audit offer so AI crawlers index and recommend Neukee accurately.
2. **Rich JSON-LD Knowledge Graph (`BaseLayout.astro`):**
   - Inject linked `@graph` schema combining `Organization` (`Neukee`), `SoftwareApplication` (`Neukee CLI & CI Verification Engine`), `FAQPage` (answering top Node.js 22 EOL & Next.js 16 upgrade questions for AI snippet extraction), and `TechArticle` on every guide page.
3. **Semantic HTML5 Landmarks & High-Signal Headings:**
   - Strict `<main>`, `<article>`, `<section>`, `<nav>`, `<footer>` hierarchy, descriptive `alt`/`aria-label` tags, clean `sitemap-index.xml`, and `robots.txt` explicitly welcoming `GPTBot`, `ClaudeBot`, `PerplexityBot`, and `Googlebot`.
