# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack portfolio website with an AI chat assistant feature. Monorepo structure with Next.js frontend and FastAPI backend.

## Commands

### Frontend (run from `frontend/` directory)
```bash
pnpm install       # Install dependencies
pnpm dev           # Start dev server with Turbopack
pnpm build         # Production build
pnpm start         # Start production server
pnpm lint          # Run ESLint
```

### Backend (run from `backend/` directory)
```bash
pip install -r requirements.txt   # Install dependencies
python main.py                    # Run FastAPI server
docker build -t backend .         # Build Docker image
```

## Architecture

### Frontend (`frontend/`)
- **Next.js 15** with App Router and Turbopack
- **React 19** + TypeScript
- **Tailwind CSS 4** for styling
- **Shadcn/ui** components (New York style, neutral base)
- **Framer Motion** for animations
- **React Hook Form + Zod** for form validation
- **Formspree** for contact form submission

**Feature-Sliced Design (FSD) pattern:**
- `src/app/` - Next.js app directory (routes, layout)
- `src/pages/` - Page-level components
- `src/widgets/` - Large composed components (Header, Footer, sections)
- `src/features/` - Feature blocks (about, contact, experience, projects, skills)
- `src/shared/` - Reusable code (ui components, hooks, i18n, types, assets)

**Key conventions:**
- Path alias: `@/*` maps to `./src/*`
- SVGs imported as React components via SVGR
- Custom i18n with React Context (English/Russian support in `shared/i18n/`)
- Mobile detection via `useIsMobile` hook

### Backend (`backend/`)
- **FastAPI** with Uvicorn server
- **SQLAlchemy** ORM with SQLite database
- **Google Gemini API** integration for AI chat responses

**API endpoints:**
- `GET /request` - Retrieve chat requests by user IP
- `POST /request` - Send prompt to Gemini, store conversation

**Files:**
- `main.py` - FastAPI routes
- `db.py` - SQLAlchemy models and database functions
- `gemini_client.py` - Gemini API wrapper
- `config.py` - Configuration (API keys)

## Environment Variables

Frontend:
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics measurement ID

Backend:
- Gemini API key configured in `config.py` (should migrate to env vars)
