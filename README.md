# Neel Prajapati — Cinematic VFX Portfolio

<div align="center">

**An immersive, scroll-driven 3D web portfolio built with React, HTML5 Canvas, and a custom frame-sequence engine.**

[![Live Demo](https://img.shields.io/badge/Live-neelprajapatiportfolio.work-ffffff?style=for-the-badge&logo=googlechrome&logoColor=black)](https://neelprajapatiportfolio.work)
[![GitHub](https://img.shields.io/badge/GitHub-Neel--2606-181717?style=for-the-badge&logo=github)](https://github.com/Neel-2606)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Neel_Prajapati-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/neel-prajapati)

*Scroll through 800 frames of cinematic 3D animation while exploring achievements, projects, and skills.*

</div>

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Why This Approach?](#why-this-approach)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [How the Canvas Engine Works](#how-the-canvas-engine-works)
- [Portfolio Content Timeline](#portfolio-content-timeline)
- [UI Components & Interactions](#ui-components--interactions)
- [Frame Extraction Pipeline](#frame-extraction-pipeline)
- [Performance Optimizations](#performance-optimizations)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Customization Guide](#customization-guide)
- [Browser Support](#browser-support)
- [Known Limitations](#known-limitations)
- [About the Author](#about-the-author)
- [Connect](#connect)
- [License](#license)

---

## Overview

This repository contains the source code for **Neel Prajapati's cinematic portfolio** — a single-page web experience that presents a resume, project history, and contact information through an interactive 3D scroll journey.

Instead of embedding a heavy video file or relying on WebGL/Three.js, the site renders a **pre-extracted sequence of 800 WebP frames** on an HTML5 `<canvas>`. Scroll position is mapped directly to the current frame, producing a buttery-smooth, scrubbable cinematic effect that feels like flying through a 3D world.

The experience is layered with:

- A retro **terminal boot sequence** during asset loading
- **Glassmorphism modals** for detailed content
- A **quest-log sidebar** for section navigation
- **Cinematic overlays** (vignette, film grain, gradient)
- A **custom hardware-accelerated cursor**
- **Background audio** with user-controlled mute toggle

This project demonstrates advanced front-end engineering: scroll synchronization, canvas rendering, asset preloading strategies, and polished cinematic UI — all without a CSS framework or animation library driving the core experience.

---

## Live Demo

| Resource | URL |
|----------|-----|
| **Portfolio (Production)** | [https://neelprajapatiportfolio.work](https://neelprajapatiportfolio.work) |
| **GitHub Repository** | [https://github.com/Neel-2606/Neel-VFX-Portfolio](https://github.com/Neel-2606/Neel-VFX-Portfolio) |
| **LinkedIn** | [https://www.linkedin.com/in/neel-prajapati](https://www.linkedin.com/in/neel-prajapati) |

---

## Why This Approach?

Traditional portfolio sites use static layouts or autoplay videos. Both have trade-offs:

| Approach | Problem |
|----------|---------|
| **`<video>` scrubbing** | Buffering lag, imprecise frame seeking, large file sizes, poor mobile performance |
| **WebGL / Three.js** | High complexity, heavy bundle size, overkill for a linear cinematic journey |
| **Static images + CSS parallax** | Limited depth; doesn't feel truly cinematic |

**This project's solution:** Extract a source video into 800 uniformly spaced `.webp` frames, preload them into memory, and draw the correct frame onto a canvas based on scroll progress. The result is:

- **Instant frame response** — no decode delay during scroll
- **Predictable performance** — each frame is a decoded bitmap ready to blit
- **Smaller total payload** — WebP at quality 55 vs. a single large MP4
- **Full scroll control** — Lenis smooth scrolling + direct frame mapping

---

## Key Features

### Cinematic Scroll Engine
- 800-frame image sequence rendered on HTML5 Canvas
- Scroll position (0 → 1) mapped linearly to frame index (0 → 799)
- `object-fit: cover` equivalent drawing logic for any viewport aspect ratio
- 30,000px virtual scroll height (24,000px on mobile) for fine-grained scrubbing

### Terminal Boot Sequence
- Retro green-on-black BIOS-style loading screen
- Progress-driven log lines that appear as frames load (0% → 100%)
- ASCII progress bar: `[████████████        ] 60%`
- Themed boot messages referencing the portfolio's AI/ML projects

### Smooth Scrolling (Lenis)
- Custom easing curve for cinematic feel
- Integrated with `requestAnimationFrame` render loop
- Scroll paused when modals are open
- Programmatic scroll-to-section for quest log navigation

### Glassmorphism UI
- Translucent modal panels with backdrop blur
- Badge chips for tech stacks and achievements
- Bullet lists with custom markers
- Slide-up fade entrance animations (pure CSS)

### Quest Log Navigation
- Fixed right-side timeline with dot nodes for each portfolio section
- Active section highlighted based on scroll position
- Hover reveals section title labels
- Click scrolls smoothly to that section's frame range

### Custom Cursor
- Dual-layer cursor: inner dot + outer ring follower
- `mix-blend-mode: difference` for inverted-color effect
- Expands on interactive elements (buttons, links, quest nodes)
- Disabled on touch/mobile devices

### Cinematic Overlays
- **Gradient overlay** — darkens top and bottom for text readability
- **Vignette** — inset box-shadow for film-like edge darkening
- **Film grain** — SVG noise filter at 3% opacity

### Background Audio
- Looping cinematic soundtrack hosted on Supabase CDN
- Auto-plays muted on load (browser autoplay policy compliant)
- Toggle mute/unmute via floating control button (Lucide icons)
- Audio pauses when user mutes

### Responsive Design
- Mobile-optimized typography with `clamp()` sizing
- Quest log and scroll timeline hidden on small screens
- Nav links collapse on mobile; brand logo remains
- Increased canvas scale on mobile to crop edge watermarks

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser                                  │
├─────────────────────────────────────────────────────────────────┤
│  React App (App.jsx)                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐ │
│  │ Lenis Scroll │──│ Frame Index  │──│ Canvas 2D Renderer    │ │
│  │   Engine     │  │  Calculator  │  │ (drawImage per frame) │ │
│  └──────────────┘  └──────────────┘  └───────────────────────┘ │
│         │                  │                      │              │
│         ▼                  ▼                      ▼              │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐ │
│  │ Text Overlay │  │ Quest Log    │  │ Cinematic Overlays    │ │
│  │ Opacity/Transform│ Active Section│  │ Gradient/Vignette/Grain│
│  └──────────────┘  └──────────────┘  └───────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│  Asset Layer                                                     │
│  • 800 × frame_XXXX.webp (1280×720, WebP q55) in public/frames/ │
│  • dragon.mp4 audio stream (Supabase CDN, not in repo)          │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Mount** → Start chunked preload of 800 WebP frames (20 at a time)
2. **Each frame loads** → `img.decode()` forces GPU decode → update progress bar
3. **100% loaded** → Hide boot screen → Initialize Lenis + render loop
4. **User scrolls** → Lenis fires scroll event → compute `progress = scrollY / maxScroll`
5. **Each animation frame** → `targetFrame = progress × 799` → draw frame on canvas
6. **Same frame** → Update text overlay opacity/transform + active quest node + timeline bar

---

## Tech Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Framework** | React | 19.2 | Component architecture, state management |
| **Build Tool** | Vite | 8.0 | Fast dev server, optimized production builds |
| **Smooth Scroll** | Lenis | 1.3 | Buttery scroll interpolation |
| **Icons** | Lucide React | 1.16 | Volume, close, and UI icons |
| **Rendering** | HTML5 Canvas 2D | — | Frame-sequence playback |
| **Styling** | Vanilla CSS | — | Zero CSS framework; full design control |
| **Fonts** | Google Fonts | — | Inter (body), Space Grotesk (headings) |
| **Linting** | ESLint | 10.0 | Code quality (flat config) |
| **Frame Extraction** | Python + OpenCV | — | Offline video → WebP pipeline |

> **Note:** `framer-motion` and `gsap` are listed in `package.json` but are not currently imported in the application. All animations are handled via CSS keyframes, inline style transforms, and the canvas render loop.

---

## Project Structure

```
Neel-VFX-Portfolio/
├── public/
│   ├── frames/                    # 800 pre-rendered WebP frames
│   │   ├── frame_0000.webp
│   │   ├── frame_0001.webp
│   │   └── ... frame_0799.webp
│   └── vite.svg                   # Favicon
├── src/
│   ├── App.jsx                    # Main app: canvas engine, UI, scroll logic, content data
│   ├── App.css                    # Legacy Vite boilerplate styles (unused by main app)
│   ├── index.css                  # Global styles: overlays, modals, cursor, responsive
│   └── main.jsx                   # React DOM entry point
├── extract.py                     # OpenCV script to extract frames from source video
├── index.html                     # HTML shell + Google Fonts preload
├── vite.config.js                 # Vite configuration (React plugin)
├── eslint.config.js               # ESLint flat config
├── package.json                   # Dependencies and scripts
├── package-lock.json
├── .gitignore                     # Ignores node_modules, dist, dragon.mp4 source video
└── README.md                      # This file
```

### Key Files Explained

| File | Responsibility |
|------|----------------|
| `src/App.jsx` | Single-file application containing all logic: frame preloading, Lenis setup, canvas rendering, text overlay animation, modal state, quest log, audio control, and the `textData` content array |
| `src/index.css` | ~730 lines of cinematic styling: loading screen, glassmorphism modals, custom cursor, quest log, scroll timeline, responsive breakpoints |
| `extract.py` | Offline pipeline: reads `public/dragon.mp4`, uniformly samples 800 frames, resizes to 1280×720, saves as WebP at quality 55 |
| `public/frames/` | 800 WebP images (~55% quality) — the visual backbone of the scroll experience |

---

## How the Canvas Engine Works

### 1. Frame Preloading

On mount, the app loads all 800 frames in **chunks of 20** to avoid overwhelming the browser's network queue:

```javascript
const loadFrame = (index) => {
  const img = new Image();
  img.src = `/frames/frame_${String(index).padStart(4, '0')}.webp`;
  img.onload = async () => {
    await img.decode(); // Force GPU decode before scroll begins
    frames[index] = img;
  };
};
```

Each image is explicitly decoded via `img.decode()` so the GPU holds a ready bitmap — eliminating micro-stutters during fast scrolling.

### 2. Scroll → Frame Mapping

```javascript
const progress = scrollY / (documentHeight - windowHeight);  // 0.0 → 1.0
const targetFrame = progress * (TOTAL_FRAMES - 1);           // 0 → 799
```

The current frame is set directly to the target (no interpolation lerp) for instant scroll response.

### 3. Canvas Drawing (Cover Fit)

The renderer calculates aspect-ratio-aware dimensions so frames always fill the viewport, cropping overflow — equivalent to CSS `object-fit: cover`:

```javascript
if (canvasRatio > imgRatio) {
  drawWidth = canvas.width;
  drawHeight = canvas.width / imgRatio;
  offsetY = (canvas.height - drawHeight) / 2;
} else {
  drawWidth = canvas.height * imgRatio;
  drawHeight = canvas.height;
  offsetX = (canvas.width - drawWidth) / 2;
}
ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
```

### 4. Render Loop

A single `requestAnimationFrame` loop handles everything:

```
requestAnimationFrame → update frame → draw canvas → update text overlays
                     → update scroll timeline → lenis.raf() → repeat
```

Lenis's `raf()` call is integrated inside the render loop so scroll physics and canvas drawing stay in sync.

### 5. Text Overlay Synchronization

Each content section in `textData` has a `start` and `end` progress value (0–1). As the user scrolls:

- **Opacity** fades in/out within a ±0.015 window around section bounds
- **Scale** animates from 0.95 → 1.0 on entry
- **TranslateY** slides text up/down alternating by section index
- **Active section** is determined by nearest center distance to current progress

---

## Portfolio Content Timeline

The scroll journey is divided into **16 sections**, each mapped to a specific frame range:

| # | Section ID | Title | Scroll Range | Alignment |
|---|------------|-------|--------------|-----------|
| 1 | `intro` | NEEL PRAJAPATI | 1% – 6% | Left |
| 2 | `education` | EDUCATION | 8% – 12% | Right |
| 3 | `skills` | SKILLS & TECH | 14% – 19% | Left |
| 4 | `nasa` | NASA SPACE APPS | 21% – 25% | Right |
| 5 | `ingenius` | INGENIUS 7.0 | 27% – 31% | Left |
| 6 | `dotslash` | DOTSLASH 9.0 | 33% – 37% | Right |
| 7 | `ibm` | IBM AI CHALLENGE | 39% – 43% | Left |
| 8 | `hackovate` | HACKOVATE | 45% – 49% | Right |
| 9 | `isro` | ISRO SPACETECH | 51% – 55% | Left |
| 10 | `gcp` | GOOGLE PROGRAMS | 57% – 61% | Right |
| 11 | `neuralize` | NEURALIZE AI/ML | 63% – 67% | Left |
| 12 | `codevimarsh` | CODE VIMARSH | 69% – 73% | Right |
| 13 | `agriforge` | AGRIFORGE AI | 75% – 81% | Left |
| 14 | `urbanintel` | URBAN INTEL AI | 83% – 88% | Right |
| 15 | `eunoia` | EUNOIA HOMOEOPATHY | 90% – 94% | Left |
| 16 | `final` | LET'S BUILD THE FUTURE | 95% – 99% | Center |

Each section includes:
- **Title** and **subtitle** displayed as lower-third cinematic text
- **Badges** — tech tags shown in the modal (e.g., "EfficientNet", "TinyLlama LLM")
- **Bullets** — detailed achievement descriptions in the "Read More" modal
- **Links** — GitHub, LinkedIn, Portfolio, Email (on intro and final sections)

### Highlighted Projects

<details>
<summary><strong>AgriForge AI — KrishiMitra (SSIP Funded)</strong></summary>

- AI-powered platform providing 24×7 farmer support in 10+ Indian languages via voice and text
- EfficientNet integration for crop disease detection
- Awarded ₹2.43 Lakh SSIP (Student Startup and Innovation Policy) research funding from Govt. of Gujarat

</details>

<details>
<summary><strong>Urban Intel AI — Smart City Governance</strong></summary>

- Hybrid AI system with 6 Random Forest models predicting urban risks (traffic, water scarcity, health hazards)
- Private TinyLlama LLM for real-time policy recommendations with data sovereignty
- Built for Ingenius 7.0 hackathon — 1st Runner Up among 180+ teams

</details>

<details>
<summary><strong>Mumbai Pulse — NASA Space Apps Winner 2025</strong></summary>

- AI-powered system analyzing NASA datasets to monitor air quality, heat, and environmental risks
- Built for NASA Space Apps Challenge — Winner 2025

</details>

<details>
<summary><strong>IBM AI Challenge — 2nd Rank Gujarat</strong></summary>

- AI solution focused on strengthening India's agricultural ecosystem
- Secured 2nd position across Gujarat among shortlisted teams

</details>

---

## UI Components & Interactions

### Persistent Navbar
- Fixed top bar with "NEEL." brand (scrolls to top on click)
- External links: GitHub, LinkedIn, Portfolio
- `pointer-events: none` on container, `auto` on interactive children

### Quest Log (Desktop)
- Vertical dot timeline on the right edge
- 16 nodes corresponding to content sections
- Active node glows white with scale transform
- Hover reveals section title label

### Scroll Timeline (Desktop)
- Thin vertical progress bar on the right (20%–80% viewport height)
- Fills proportionally to scroll progress
- Hidden on mobile

### Read More Modals
- Triggered by "Read More" button on each text block
- Glassmorphism panel with gradient background, blur, and inset border
- Contains full section details: title, subtitle, badges, bullet points, links
- Click outside or X button to close
- Lenis scroll frozen while modal is open

### Audio Control
- Floating circular button (bottom-right)
- Volume2 / VolumeX icons from Lucide
- Handles browser autoplay restrictions (starts muted, unmutes on user interaction)

### Custom Cursor (Desktop)
- Inner dot (8px, white, mix-blend-mode: difference)
- Outer ring follower (40px, transitions with delay)
- Expands to 60px ring on hover over interactive elements
- Default cursor hidden via `cursor: none` on body

---

## Frame Extraction Pipeline

The `extract.py` script converts a source video into the 800-frame WebP sequence:

### Prerequisites
```bash
pip install opencv-python
```

### Usage
1. Place your source video at `public/dragon.mp4`
2. Run the extraction script:
   ```bash
   python extract.py
   ```
3. Frames are saved to `public/frames/frame_0000.webp` through `frame_0799.webp`

### How It Works

```python
TARGET_FRAMES = 800
indices = [int(math.floor(i * (total_frames - 1) / (TARGET_FRAMES - 1)))
           for i in range(TARGET_FRAMES)]
```

- **Uniform sampling** across the entire video duration ensures the last frame of the video maps to frame 799
- Each frame is **resized to 1280×720** using `INTER_AREA` interpolation (best for downscaling)
- Saved as **WebP at quality 55** for optimal size/quality balance
- Progress logged every 100 frames

### Regenerating Frames

If you replace the source video or want a different frame count:

1. Update `TARGET_FRAMES` in both `extract.py` and `App.jsx` (`TOTAL_FRAMES`)
2. Delete existing frames in `public/frames/`
3. Run `python extract.py`
4. Adjust `textData` scroll ranges if the visual pacing changes

---

## Performance Optimizations

| Optimization | Implementation |
|--------------|----------------|
| **Chunked preloading** | Load 20 frames at a time to prevent network congestion |
| **GPU decode** | `img.decode()` on every frame before scroll begins |
| **Direct frame mapping** | No double-smoothing lerp — scroll maps 1:1 to frame index |
| **WebP format** | ~55% quality WebP vs. PNG/JPEG for 800 frames |
| **Canvas over video** | No video decode pipeline; instant frame blitting |
| **will-change hints** | CSS `will-change: transform` on animated elements |
| **Fixed positioning** | Canvas and overlays use `position: fixed` — no layout reflow |
| **Pointer-events layering** | Non-interactive layers set to `pointer-events: none` |
| **Mobile simplification** | Quest log, timeline, and custom cursor disabled on touch devices |
| **Source video excluded** | `dragon.mp4` gitignored; only compressed frames in repo |

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** (comes with Node.js)
- **Python 3** + OpenCV (only if regenerating frames)

### Installation

```bash
# Clone the repository
git clone https://github.com/Neel-2606/Neel-VFX-Portfolio.git

# Enter the project directory
cd Neel-VFX-Portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will be available at **http://localhost:5173**

> **First load note:** The boot sequence will display while all 800 frames preload. On a fast connection this takes 10–30 seconds. Subsequent loads benefit from browser caching.

### Production Build

```bash
npm run build    # Output to dist/
npm run preview  # Preview production build locally
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Create optimized production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |
| `python extract.py` | Extract 800 WebP frames from source video |

---

## Deployment

The project is a static SPA built with Vite. Deploy the `dist/` folder to any static host:

### Vercel / Netlify / Cloudflare Pages

```bash
npm run build
# Deploy the dist/ directory
```

**Build settings:**
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 18+

### Important Notes

- All 800 frame images must be deployed alongside the built assets
- The audio file is loaded from Supabase CDN (external dependency)
- Ensure your host supports serving `.webp` files with correct MIME type
- Consider enabling CDN caching for the `frames/` directory (assets are immutable)

---

## Customization Guide

### Adding a New Portfolio Section

1. Open `src/App.jsx` and add an entry to the `textData` array:

```javascript
{
  id: "my-project",
  start: 0.XX,    // Scroll progress where section begins (0–1)
  end: 0.XX,      // Scroll progress where section ends
  align: "left",  // "left" | "right" | "center"
  title: "MY PROJECT",
  subtitle: "Project Tagline",
  badges: ["React", "Node.js"],
  bullets: [
    "Description point 1",
    "Description point 2"
  ]
}
```

2. Ensure `start`/`end` values don't overlap with adjacent sections
3. A new quest log node will appear automatically

### Changing Scroll Length

Adjust the `.scroll-container` height in `src/index.css`:

```css
.scroll-container {
  height: 30000px; /* Increase for slower scroll, decrease for faster */
}
```

### Replacing the 3D Animation

1. Place new source video at `public/dragon.mp4`
2. Run `python extract.py`
3. Re-tune all `textData` `start`/`end` values to match new visual pacing

### Theming

Key CSS variables and classes in `src/index.css`:

| Element | Location |
|---------|----------|
| Boot screen colors | `.terminal-boot` (green `#00ff41`) |
| Modal glass effect | `.modal-content.glass-panel` |
| Text typography | `.text-title`, `.text-subtitle` |
| Overlay intensity | `.overlay-gradient`, `.overlay-vignette`, `.overlay-grain` |

---

## Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome 90+ | Full | Recommended |
| Firefox 90+ | Full | |
| Safari 15+ | Full | WebP support required |
| Edge 90+ | Full | |
| Mobile Safari | Partial | Quest log, cursor, timeline hidden |
| Mobile Chrome | Partial | Same mobile optimizations |

**Requirements:** WebP image support, Canvas 2D API, ES2020+ JavaScript, CSS `backdrop-filter`

---

## Known Limitations

- **Initial load time:** 800 images must preload before the experience begins (~10–30s on first visit)
- **Memory usage:** All 800 decoded frames reside in memory (~200–400MB depending on frame size)
- **No SSR:** Pure client-side rendering; boot screen visible until assets load
- **Audio autoplay:** Browsers require muted autoplay; user must interact to hear audio
- **Frame extraction not automated:** Regenerating frames requires manual Python script execution
- **Single-page only:** No routing; entire portfolio is one scroll experience

---

## About the Author

**Neel Prajapati** is an AI & Web Enthusiast based in Vadodara, India.

- 🎓 B.E. Computer Science & Engineering at MS University of Baroda (CGPA: 8.2, 2024–2028)
- 🏆 NASA Space Apps Winner 2025
- 🥈 IBM AI Challenge — 2nd Rank Gujarat
- 🥈 Ingenius 7.0 — 1st Runner Up (180+ teams)
- 💰 SSIP Funded — AgriForge AI (₹2.43 Lakh)
- ☁️ Google Cloud Career Launchpad — Diamond League
- 🤖 Core Team — Neuralize AI/ML Club, MSU

**Skills:** Java, Python, C/C++, JavaScript, React, Machine Learning, Generative AI, Data Analysis

---

## Connect

| Platform | Link |
|----------|------|
| **Portfolio** | [neelprajapatiportfolio.work](https://neelprajapatiportfolio.work) |
| **GitHub** | [@Neel-2606](https://github.com/Neel-2606) |
| **LinkedIn** | [Neel Prajapati](https://www.linkedin.com/in/neel-prajapati) |
| **Email** | neelprajapati2601@gmail.com |
| **Phone** | +91 9638209670 |

---

## License

This project is open source and available for personal portfolio inspiration. The 3D animation assets and audio are proprietary creative works. Please do not redistribute the frame sequences or audio without permission.

---

<div align="center">

**Built with React 19, Vite 8, Lenis, and the HTML5 Canvas API.**

*Engineered by [Neel Prajapati](https://github.com/Neel-2606)*

</div>
