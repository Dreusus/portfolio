# Portfolio - apolyakov.tech

Full-stack portfolio website with AI chat assistant.

## Quick Start (Docker)

```bash
# 1. Clone and navigate
git clone <repo-url>
cd portfolio_dreusus

# 2. Create .env file
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY

# 3. Run
docker-compose up --build
```

**Services:**
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

## Docker Commands

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

## Local Development (without Docker)

### Frontend
```bash
cd frontend
pnpm install
pnpm dev
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
```

## Environment Variables

Create `.env` in project root:
```
GEMINI_API_KEY=your_api_key_here
```

## Tech Stack

**Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Framer Motion

**Backend:** FastAPI, SQLAlchemy, Google Gemini API
