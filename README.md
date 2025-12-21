# Portfolio - apolyakov.tech

Full-stack QA portfolio 

## Quick Start (Docker)


```bash
# Run in background
docker-compose up -d --build

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f frontend
docker-compose logs -f backend

# Stop
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Rebuild single service
docker-compose up --build frontend
```

## Development (Docker)

```bash
# Start dev environment with hot reload
docker-compose -f docker-compose.dev.yml up --build

```

## Environment Variables

Create `.env` in project root:
```
GEMINI_API_KEY=
BACKEND_URL=
```

## Tech Stack

**Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Framer Motion

**Backend:** FastAPI, SQLAlchemy, Google Gemini API
