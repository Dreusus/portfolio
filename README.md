# Portfolio - apolyakov.tech

Full-stack portfolio website with AI chat assistant. Built with modern tech stack and clean architecture.

## Features

- **AI Chat Assistant** - Intelligent assistant powered by Groq AI with Gemini fallback
- **Real-time Telegram Alerts** - Get notified when users interact with AI assistant
- **Responsive Design** - Mobile-first design with smooth animations
- **Multi-language** - English and Russian support
- **PostgreSQL Database** - Persistent storage for chat history and analytics
- **RESTful API** - Versioned API endpoints with OpenAPI documentation
- **Docker Ready** - Multi-container deployment with orchestration

## Quick Start (Docker)

```bash
# 1. Create .env file (see Environment Variables section)
cp .env.example .env
# Edit .env and add your API keys

# 2. Start all services
docker-compose up -d --build

# 3. Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

**Services:**
- `postgres` - PostgreSQL 16 database
- `backend` - FastAPI application (port 8000)
- `frontend` - Next.js application (port 3000)

## Docker Commands

```bash
# View logs (all services)
docker-compose logs -f

# View specific service logs
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f postgres

# Restart single service
docker-compose restart backend

# Rebuild single service
docker-compose up -d --build backend

# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ deletes database)
docker-compose down -v

# Check service status
docker-compose ps
```

## Environment Variables

Create `.env` file in project root (use `.env.example` as template):

```env
# Database (PostgreSQL)
DATABASE_URL=postgresql://portfolio_user:portfolio_password@postgres:5432/portfolio_db
POSTGRES_USER=portfolio_user
POSTGRES_PASSWORD=portfolio_password
POSTGRES_DB=portfolio_db
POSTGRES_PORT=5432

# AI API Keys (required)
GROK_API_KEY=your_groq_api_key_here          # Primary AI provider
GEMINI_API_KEY=your_gemini_api_key_here      # Fallback AI provider

# Telegram Alerts (optional)
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHI...    # Bot token from @BotFather
TELEGRAM_CHAT_ID=your_chat_id                # Your Telegram chat ID

# URLs
BACKEND_URL=http://localhost:8000            # Backend URL for frontend
```

### Getting API Keys

**Groq API (Primary):**
1. Visit [console.groq.com](https://console.groq.com)
2. Create account and generate API key
3. Add to `GROK_API_KEY` in `.env`

**Gemini API (Fallback):**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create API key
3. Add to `GEMINI_API_KEY` in `.env`

**Telegram Bot (Optional):**
1. Message [@BotFather](https://t.me/BotFather) → `/newbot`
2. Copy token to `TELEGRAM_BOT_TOKEN`
3. Get your chat ID from [@userinfobot](https://t.me/userinfobot)
4. Add to `TELEGRAM_CHAT_ID`

## Project Structure

```
portfolio_dreusus/
├── frontend/                # Next.js application
│   ├── src/
│   │   ├── app/            # Next.js App Router
│   │   ├── pages/          # Page components
│   │   ├── widgets/        # Complex UI components (Header, Footer, ChatWidget)
│   │   ├── features/       # Feature modules (about, contact, projects, skills)
│   │   └── shared/         # Reusable code (ui, hooks, i18n, utils)
│   └── package.json
│
├── backend/                 # FastAPI application
│   ├── src/
│   │   ├── api/            # API endpoints (v1 + legacy)
│   │   ├── services/       # Business logic
│   │   ├── repositories/   # Data access layer
│   │   ├── models/         # SQLAlchemy models
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── core/           # Configuration
│   │   └── middleware/     # Request logging
│   ├── alembic/            # Database migrations
│   ├── pyproject.toml      # Python dependencies
│   └── main.py             # Application entry point
│
├── docker-compose.yml       # Production orchestration
├── .env.example            # Environment template
└── README.md               # This file
```

## Local Development

### Frontend

```bash
cd frontend
pnpm install
pnpm dev        # http://localhost:3000
```

### Backend

```bash
cd backend

# Install dependencies
pip install -e .

# Start PostgreSQL (via Docker)
docker-compose up -d postgres

# Run migrations
alembic upgrade head

# Start server
python main.py  # http://localhost:8000
```

## API Documentation

Backend provides versioned API with automatic documentation:

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

### Endpoints

**Current (v1):**
- `GET /api/v1/chat/history` - Get chat history
- `POST /api/v1/chat` - Send message to AI
- `GET /api/v1/health` - Health check

**Legacy (deprecated):**
- `GET /request` - Old chat history endpoint
- `POST /request` - Old chat endpoint

## Database Migrations

```bash
cd backend

# Create new migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1

# View history
alembic history
```

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS
- **Framer Motion** - Animations
- **Shadcn/ui** - Component library
- **React Hook Form + Zod** - Form validation
- **Formspree** - Contact form backend

### Backend
- **FastAPI** 0.126.0 - Modern async web framework
- **SQLAlchemy** 2.0.45 - ORM with async support
- **PostgreSQL** 16 - Production database
- **Alembic** - Database migrations
- **Pydantic** 2.12.5 - Data validation
- **Uvicorn** - ASGI server
- **Groq AI** - Primary LLM provider
- **Google Gemini** - Fallback LLM provider
- **Telegram Bot API** - Real-time notifications

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **pnpm** - Fast package manager

## Architecture

### Frontend (Feature-Sliced Design)
- **app/** - Routes and layouts
- **pages/** - Page-level components
- **widgets/** - Complex composed components
- **features/** - Business features
- **shared/** - Reusable utilities

### Backend (Layered Architecture)
- **API Layer** - HTTP endpoints, validation
- **Service Layer** - Business logic, orchestration
- **Repository Layer** - Database operations
- **Model Layer** - ORM entities

## Telegram Integration

When configured, backend sends real-time alerts for AI chat interactions:

```
🤖 Новый запрос к AI ассистенту

👤 IP: 192.168.1.100
💬 Запрос:
Hello, tell me about this portfolio

🌐 Браузер: Chrome
```

Errors are non-blocking - chat continues working even if Telegram is unavailable.

## Troubleshooting

### Port already in use
```bash
# Check what's using ports
docker-compose down
lsof -i :3000  # Frontend
lsof -i :8000  # Backend
lsof -i :5432  # PostgreSQL
```

### Database connection issues
```bash
# Check PostgreSQL is running
docker-compose ps postgres

# View PostgreSQL logs
docker-compose logs postgres

# Reset database (⚠️ deletes all data)
docker-compose down -v
docker-compose up -d postgres
```

### Frontend can't connect to backend
```bash
# Check BACKEND_URL in .env
echo $BACKEND_URL

# Check CORS settings in backend/src/core/config.py
# Ensure your frontend URL is in cors_origins list
```

### Telegram alerts not working
```bash
# Check environment variables
docker-compose exec backend env | grep TELEGRAM

# View backend logs for Telegram errors
docker-compose logs -f backend | grep Telegram
```

## Documentation

- **Backend README:** [backend/README.md](backend/README.md) - Detailed backend architecture
- **Database Guide:** [backend/README_DATABASE.md](backend/README_DATABASE.md) - Database setup and migrations
- **Quick Start Guide:** [QUICKSTART_DATABASE.md](QUICKSTART_DATABASE.md) - Quick database setup
- **Claude Instructions:** [CLAUDE.md](CLAUDE.md) - AI assistant guidance

## License

Private project - All rights reserved
