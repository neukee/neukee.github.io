# NEUKEE — $10,000 Bespoke macOS-Grade UI/UX & Interactive Motion Specification

## 0. Mission & Visual Standard
Upgrade the entire `neukee.github.io` website from a standard dark developer template into a **$10,000 bespoke, ultra-crafted, macOS-inspired interactive product experience** (comparable to Linear, Raycast, Apple macOS Sequoia/Sonoma product pages, and Cron/Notion Calendar).

- **Zero Generic AI Boxes:** Ban sharp 90-degree rectangles, flat single-color borders, and lifeless static backgrounds. Every container, button, and card must feature multi-layered inner specular highlights (`inset 0 1px 0 rgba(255,255,255,0.12)`), soft ambient depth shadows, continuous squircle-like radii (`rounded-2xl` / `rounded-3xl`), and tactile micro-interactions.
- **No Unattached Font Guessing:** Use `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Plus Jakarta Sans", sans-serif` with tight editorial tracking (`-0.035em` on hero display headings, `-0.02em` on H2/H3, `1.65` line-height on body) and `"SF Mono", "JetBrains Mono", monospace` for code/CLI elements. (Note: Replace font family tokens cleanly via CSS variables `--font-display`, `--font-sans`, `--font-mono` so custom font files/names can be swapped in one line).

---

## 1. Vibrant Color Grading & Layered Atmosphere
Move away from flat `#09090B` black to a **rich, deep obsidian-indigo atmospheric palette** with vibrant luminous accents:
- **Canvas Base:** `#05060A` (deep space obsidian) layered with radial atmospheric mesh gradients (`#0F172A` slate-blue and `#091E2C` deep cyan-emerald).
- **Vibrant Accent Palette:**
  - **Electric Emerald-Cyan (Primary / Verified / Safe):** `#10B981` → `#06B6D4` gradient highlights with soft outer bloom (`rgba(16, 185, 129, 0.28)`).
  - **Luminous Sapphire Blue (Interactive Focus & Social Active State):** `#0A84FF` (macOS System Blue) → `#38BDF8` electric glow.
  - **Solar Amber & Coral (Drift & Breaking Change Badges):** `#F59E0B` and `#FB7185` with frosted translucent pill backgrounds (`bg-amber-500/10 border-amber-400/30`).
- **Frosted Glassmorphism (`macos-glass` utility):**
  - `background: rgba(18, 20, 28, 0.62);`
  - `backdrop-filter: blur(24px) saturate(180%);`
  - `border: 1px solid rgba(255, 255, 255, 0.10);`
  - `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.14), 0 24px 48px -12px rgba(0, 0, 0, 0.65);`

---

## 2. Custom Interactive Background Architecture (`InteractiveCanvas.astro`)
The background must **never feel empty or static**. Implement a full-viewport, GPU-accelerated `<canvas>` + interactive SVG/CSS backdrop layer (`pointer-events: none; position: fixed; inset: 0; z-index: 0;`) running at 60fps:

1. **Cursor-Reactive Magnetic Node & Dependency Graph Field:**
   - Render a subtle, high-precision architectural dot-and-constellation mesh representing package dependency nodes and verification paths.
   - As the user's cursor moves across the viewport, nearby nodes smoothly gravitate toward the cursor (`lerp` easing), illuminating connecting vector lines in **Luminous Sapphire (`#0A84FF`)** and **Emerald (`#10B981`)** within a 220px spotlight halo, while distant nodes gently fade back.
2. **Scroll-Linked Parallax & Depth Telemetry:**
   - Bind `window.scrollY` (via `requestAnimationFrame`) to shift ambient nebula light orbs, rotate subtle geometric verification rings, and advance a faint architectural coordinate grid—giving the physical sensation of gliding through depth layers as the user scrolls down the page.
3. **Spotlight Card Borders:**
   - Every bento card and terminal panel listens to `pointermove` to position a radial specular sheen (`--mouse-x`, `--mouse-y`) along its frosted border, mimicking brushed anodized aluminum catching light on a MacBook Pro.

---

## 3. Smart Auto-Hiding macOS Floating Dock Navbar (`Navbar.astro`)
Implement a floating, pill-shaped frosted macOS glass navigation bar (`top-4 mx-auto max-w-5xl rounded-full`) with **scroll-direction detection**:
- **Scroll Behavior (Exact Specification):**
  - Track `lastScrollY` vs `currentScrollY` with a `10px` jitter threshold.
  - **When scrolling UP (`currentScrollY < lastScrollY`):** Smoothly slide the navbar **up and out of view** (`transform: translateY(-140%); opacity: 0; transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease;`).
  - **When scrolling DOWN (`currentScrollY > lastScrollY`) or at the very top (`scrollY < 40`):** Smoothly glide the navbar **back down into view** (`transform: translateY(0); opacity: 1;`).
- **macOS Dock Magnification & Squircle Icons:**
  - Navbar links and action buttons feature smooth spring hover lift (`scale(1.03)`) and tactile press compression (`active:scale-[0.96]`).

---

## 4. HD macOS Squircle Buttons & Shining Blue Social Icons

### A. HD Tactile Mac-Style Buttons (`.btn-mac-primary`, `.btn-mac-glass`)
- **Shape:** Authentic macOS continuous rounded corners (`border-radius: 14px` for standard buttons, `9999px` for pill docks)—never sharp boxes.
- **3D Layered Lighting & Press Physics:**
  - Top specular rim highlight: `box-shadow: inset 0 1px 0.5px rgba(255, 255, 255, 0.45), inset 0 -1px 1px rgba(0, 0, 0, 0.25), 0 8px 20px -4px rgba(10, 132, 255, 0.45);`
  - Hover state: Subtle luminous gradient shift + `translateY(-1px)`.
  - Active/Pressed state (`:active`): Instant physical depression (`transform: translateY(1px) scale(0.97)`) and deeper inner shadow so clicking feels like pressing a physical MacBook keycap or macOS Control Center toggle.

### B. HD Social Media Squircle Icons with "Shining Blue" Active State
- Render crisp, high-DPI (`viewBox="0 0 24 24"`, `1.75px` optical stroke) **macOS App-Icon Squircles** (`width: 44px; height: 44px; border-radius: 12px;`) for **GitHub, X (Twitter), LinkedIn, and Discord/Email** in the Hero trust dock and Footer.
- **Interactive "Shining Blue" Click & Engagement State:**
  - Default state: Frosted dark anodized glass (`rgba(255,255,255,0.06)`) with crisp silver-white icon.
  - **On Click / Active Engagement (`.is-shining-blue`):** Immediately transitions into a **vibrant shining macOS Sapphire Blue (`#0A84FF` → `#38BDF8`)** with an animated radial light sweep (`@keyframes shineSweep`), an outer luminous halo (`box-shadow: 0 0 24px rgba(10, 132, 255, 0.75), inset 0 1px 1px rgba(255,255,255,0.6)`), and persists that energized state in `localStorage` (`neukee_engaged_socials`) alongside a subtle micro-pulse badge—visually rewarding authentic user interaction.

---

## 5. Smooth Scrolling & Scroll-Choreographed Reveals
- **Lenis-Style Inertial Smooth Scroll:** Implement silky smooth anchor scrolling (`scroll-behavior: smooth` + custom cubic-bezier easing handler for all `#section` links) so jumping to `#how-it-works`, `#ci-engine`, or `#fleet-audit` glides effortlessly.
- **Choreographed Entrance Animations:** Use `IntersectionObserver` to animate cards, terminal lines, and metrics into view with staggered `translateY(18px) -> 0`, `scale(0.98) -> 1`, and `opacity: 0 -> 1` transitions (`cubic-bezier(0.16, 1, 0.3, 1)`).
