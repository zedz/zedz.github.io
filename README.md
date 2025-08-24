
# Zedz Resume (Vite + React + TS)

- L3 privacy: noindex headers/meta, robots.txt disallow, email obfuscation, WeChat hidden
- Minimal public view: only Levels 1 & 2 by default; append `?code=****2025` to unlock full resume

## Quick Start (local)
npm i
npm run dev

## Build
npm run build
npm run preview

## Vercel
- Framework: Vite
- Build Command: npm run build
- Output Directory: dist

## Change the unlock code
- In `src/App.tsx`, search `zedz2025` and replace with your secret string.
