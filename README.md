# Sun Tag & Title

Official website for **Sun Tag & Title** — a licensed Maryland tag agency offering fast, reliable, and hassle-free vehicle registration, tags, and title services.

---

## Business Overview

| | |
|---|---|
| **Business Name** | Sun Tag & Title |
| **Type** | Licensed state-authorized tag agency |
| **Location** | 10400 Shaker Dr, Columbia, MD 21046, USA |
| **Phone** | +1 (443) 355-7141 |
| **Email** | amir@suntagandtitle.com |
| **Hours** | Every day: 9 AM – 7:30 PM (EST) |
| **Experience** | 5+ years in business |
| **Vehicles Processed** | 7,000+ |
| **Rating** | 5★ average |

### Services

**Core Services**
- **On-Site Processing** — Same-day Maryland license plates, registration renewals, and title transfers handled in one visit.
- **Specialty Paperwork** — 30-day temporary tags, duplicate titles, and out-of-state vehicle registrations.
- **Consultation** — Expert assistance with MVA flags, jurisdictional citations, and complex registration issues.
- **Digital Tools** — Online MVA fee estimators and a 50-state requirement finder.

**Additional Services**
- **Notary** — In-person public notary services available on-site. No legal advice provided.

---

## Tech Stack

| | |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router) |
| **Language** | TypeScript 5 |
| **React** | React 19 |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | MUI (Material UI) v9 + MUI Icons |
| **Animations** | GSAP 3 |
| **Fonts** | Montserrat, Dancing Script (via `next/font/google`) |

---

## Project Structure

```
app/
├── page.tsx                  # Home page (Hero → Services → About → Contact)
├── layout.tsx                # Root layout (fonts, Navigation, Footer)
├── globals.css               # Tailwind v4 theme + brand CSS variables
├── blog/page.tsx
├── careers/page.tsx
├── faq/page.tsx
├── privacy/page.tsx
├── terms/page.tsx
├── components/
│   ├── Navigation.tsx        # Sticky nav with scroll-aware layout
│   ├── Footer.tsx
│   ├── BackToTop.tsx
│   ├── BorderGlow.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── ServicesSection.tsx
│       ├── AboutSection.tsx
│       └── ContactSection.tsx
├── data/
│   └── links.ts              # Footer navigation links
└── utils/
    └── fonts.ts              # Google Font configuration
docs/
└── colors.json               # Brand color reference
public/                       # Static assets (logo, service images)
```

---

## Brand Colors

| Token | Hex | Usage |
|---|---|---|
| `gold-base` | `#FFC040` | Primary accent, CTAs |
| `gold-light` | `#FFD700` | Hover states |
| `gold-shadow` | `#B8860B` | Borders, subtle tones |
| `blue-base` | `#000080` | Navy accent |
| `blue-glow` | `#1E90FF` | Highlight / "Title" wordmark |
| `red-base` | `#DC143C` | "Tag" wordmark, borders |
| `red-shadow` | `#8B0000` | Deep red accents |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other scripts

```bash
npm run build   # Production build
npm start       # Start production server
npm run lint    # Run ESLint
```

---

## Navigation Behavior

The `Navigation` component uses an `IntersectionObserver` on the `#hero-title` element to detect scroll position:

- **At top (hero visible):** Large centered logo, horizontal desktop nav bar below it, hamburger for mobile.
- **Scrolled (hero offscreen):** Compact sticky bar with logo + brand name centered, nav items split left/right on desktop, hamburger with slide-down dropdown on mobile.

---

## Deployment

Deploy with [Vercel](https://vercel.com) for zero-config Next.js hosting:

```bash
vercel deploy
```

Or use any Node.js-compatible host by running `npm run build && npm start`.
