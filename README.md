# Zakir Khan — Blockchain & Web3 Developer Portfolio

A modern, animated portfolio website built with React, Vite, and Framer Motion.

## Tech Stack
- React 19 + Vite
- Framer Motion — Scroll animations, hover effects, page transitions
- React Icons — Icon library
- Custom CSS — Black + Orange theme

## Setup

```bash
npm install
npm run dev
npm run build
```

## Adding Project Demo Videos

Each project card has a video placeholder. To add your demo videos:

1. Create a `public/videos/` folder
2. Place your video files there (e.g., `miniamm-demo.mp4`)
3. In `src/components/Projects.jsx`, replace the `VideoPlaceholder` with:

```jsx
<video src="/videos/miniamm-demo.mp4" controls style={{ width: '100%', borderRadius: '8px' }} />
```

## Deploy to Vercel

### Option 1: Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option 2: GitHub Integration
1. Push this repo to GitHub
2. Go to vercel.com → Import the repository
3. Vercel auto-detects Vite and deploys

The `vercel.json` is already configured.

---
Built by Zakir Khan
