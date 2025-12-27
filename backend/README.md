# Portfolio Backend API

FastAPI backend for portfolio website with AI chat assistant, built with clean layered architecture.

## Features

- **AI Chat Assistant** - Groq AI integration with Gemini fallback
- **PostgreSQL Database** - Persistent storage for chat history and request logs
- **Telegram Alerts** - Real-time notifications for chat interactions
- **API Versioning** - Clean `/api/v1/...` structure with legacy support
- **Layered Architecture** - Separation of concerns (API → Services → Repositories)
- **Request Logging** - Automatic HTTP request tracking
- **Docker Ready** - Multi-container deployment with docker-compose

## Architecture

```
backend/
├── src/
│   ├── api/                    # API Layer (HTTP endpoints)
│   │   ├── dependencies.py     # FastAPI dependencies
│   │   ├── v1/
│   │   │   ├── router.py       # Main v1 router
│   │   │   └── endpoints/
│   │   │       ├── chat.py     # Chat endpoints
│   │   │       └── health.py   # Health check
│   │   └── legacy/
│   │       └── router.py       # Deprecated /request endpoints
│   │
│   ├── services/               # Business Logic Layer
│   │   ├── chat_service.py     # Chat orchestration
│   │   ├── telegram_service.py # Telegram notifications
│   │   └── ai/
│   │       ├── base.py         # AIProvider ABC
│   │       ├── groq_provider.py # Primary AI
│   │       └── gemini_provider.py # Fallback AI
│   │
│   ├── repositories/           # Data Access Layer
│   │   ├── chat_repository.py  # Chat CRUD operations
│   │   └── log_repository.py   # Request log CRUD
│   │
│   ├── models/                 # SQLAlchemy ORM Models
│   │   ├── base.py             # Base class
│   │   ├── chat.py             # ChatRequest model
│   │   └── log.py              # RequestLog model
│   │
│   ├── schemas/                # Pydantic DTOs
│   │   └── chat.py             # Request/Response schemas
│   │
│   ├── core/                   # Core Configuration
│   │   ├── config.py           # Settings (env vars)
│   │   ├── database.py         # DB engine & sessions
│   │   └── exceptions.py       # Custom exceptions
│   │
│   └── middleware/
│       └── logging.py          # Request logging middleware
│
├── alembic/                    # Database migrations
├── main.py                     # Application entry point
├── pyproject.toml              # Python dependencies
└── Dockerfile                  # Docker build
```

## API Endpoints

### V1 Endpoints (Current)

**`GET /api/v1/chat/history`**
- Get chat history for current IP
- Response: `{items: [{id, prompt, response, created_at, user_agent}, ...]}`

**`POST /api/v1/chat`**
- Send message to AI assistant
- Request: `{prompt: "your message"}`
- Response: `{answer: "AI response"}`

**`GET /api/v1/health`**
- Health check endpoint
- Response: `{status: "ok"}`

### Legacy Endpoints (Deprecated)

**`GET /request`** - Use `/api/v1/chat/history` instead

**`POST /request`** - Use `/api/v1/chat` instead

## Environment Variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL=postgresql://portfolio_user:portfolio_password@postgres:5432/portfolio_db

# PostgreSQL (for docker-compose)
POSTGRES_USER=portfolio_user
POSTGRES_PASSWORD=portfolio_password
POSTGRES_DB=portfolio_db
POSTGRES_PORT=5432

# AI API Keys
GROK_API_KEY=your_groq_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here

# Telegram Alerts (optional)
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=your_chat_id_here

# Frontend
BACKEND_URL=http://localhost:8000
```

### Getting API Keys

**Groq API:**
1. Visit https://console.groq.com
2. Create account and get API key
3. Add to `GROK_API_KEY` (note: variable name kept for compatibility)

**Gemini API (Fallback):**
1. Visit https://makersuite.google.com/app/apikey
2. Create API key
3. Add to `GEMINI_API_KEY`

**Telegram Bot (Optional):**
1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. Create bot with `/newbot` command
3. Copy token to `TELEGRAM_BOT_TOKEN`
4. Get your chat ID from [@userinfobot](https://t.me/userinfobot)
5. Add to `TELEGRAM_CHAT_ID`

## Setup

### Local Development

1. **Install dependencies:**
   ```bash
   cd backend
   pip install -e .
   ```

2. **Setup PostgreSQL:**
   ```bash
   # Using docker-compose (recommended)
   docker-compose up -d postgres

   # Or install PostgreSQL locally
   # Update DATABASE_URL in .env accordingly
   ```

3. **Run migrations:**
   ```bash
   alembic upgrade head
   ```

4. **Start server:**
   ```bash
   python main.py
   ```

   Server runs on http://localhost:8000

   API docs: http://localhost:8000/docs

### Docker Deployment

```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down

# Rebuild backend only
docker-compose up -d --build backend
```

## Database Migrations

```bash
# Create new migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1

# View migration history
alembic history
```

## Development Workflow

### Adding New Feature

1. **Create model** (if needed) in `src/models/`
2. **Create schema** in `src/schemas/`
3. **Create repository** in `src/repositories/`
4. **Create service** in `src/services/`
5. **Create endpoint** in `src/api/v1/endpoints/`
6. **Add to router** in `src/api/v1/router.py`
7. **Create migration**: `alembic revision --autogenerate -m "add_feature"`

### Testing API

```bash
# Health check
curl http://localhost:8000/api/v1/health

# Send chat message
curl -X POST http://localhost:8000/api/v1/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hello, who are you?"}'

# Get chat history
curl http://localhost:8000/api/v1/chat/history
```

## Telegram Integration

When enabled (both `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` set), the backend sends alerts for every chat interaction:

**Alert includes:**
- User's IP address
- Message/prompt sent to AI
- Browser information (extracted from User-Agent)

**Format:**
```
🤖 Новый запрос к AI ассистенту

👤 IP: 192.168.1.100
💬 Запрос:
Hello, who are you?

🌐 Браузер: Chrome
```

**Non-blocking:** Telegram errors don't affect chat functionality.

## Architecture Principles

### Layered Architecture

1. **API Layer** (`src/api/`)
   - HTTP request handling
   - Input validation (Pydantic schemas)
   - Response formatting
   - Dependency injection

2. **Service Layer** (`src/services/`)
   - Business logic
   - Orchestration between repositories
   - External API integration (AI, Telegram)
   - Error handling and fallbacks

3. **Repository Layer** (`src/repositories/`)
   - Database operations (CRUD)
   - Query building
   - Transaction management

4. **Model Layer** (`src/models/`)
   - SQLAlchemy ORM models
   - Database schema definition

### Dependency Injection

```python
# src/api/dependencies.py
def get_chat_service(db: Session = Depends(get_db)) -> ChatService:
    chat_repo = ChatRepository(db)
    return ChatService(chat_repo)

# src/api/v1/endpoints/chat.py
@router.post("")
def send_chat_prompt(
    request: Request,
    prompt: str = Body(..., embed=True),
    chat_service: ChatService = Depends(get_chat_service)
):
    # chat_service is automatically injected
    ...
```

### AI Provider Pattern

```python
# src/services/ai/base.py
class AIProvider(ABC):
    @abstractmethod
    def get_answer(self, prompt: str) -> str:
        pass

# Primary: Groq, Fallback: Gemini
try:
    answer = self.primary_ai.get_answer(prompt)
except AIProviderError:
    answer = self.fallback_ai.get_answer(prompt)
```

## CORS Configuration

Allowed origins (configured in `src/core/config.py`):
- http://localhost:3000
- http://127.0.0.1:3000
- https://apolyakov.tech
- https://www.apolyakov.tech
- https://api.apolyakov.tech
- https://www.api.apolyakov.tech

## Troubleshooting

### Port already in use
```bash
# Find process using port 8000
lsof -i :8000  # macOS/Linux
netstat -ano | findstr :8000  # Windows

# Kill process
kill -9 <PID>
```

### Database connection error
```bash
# Check PostgreSQL is running
docker-compose ps postgres

# Check DATABASE_URL format
# postgresql://user:password@host:port/database
```

### Telegram alerts not working
```bash
# Check environment variables are set
docker-compose exec backend env | grep TELEGRAM

# Check logs for detailed error
docker-compose logs -f backend | grep Telegram
```

### Migration conflicts
```bash
# Reset database (⚠️ deletes all data)
docker-compose down -v
docker-compose up -d postgres
alembic upgrade head
```

## Tech Stack

- **FastAPI** 0.126.0 - Modern async web framework
- **SQLAlchemy** 2.0.45 - ORM with async support
- **PostgreSQL** 16 - Production database
- **Alembic** 1.14.0 - Database migrations
- **Pydantic** 2.12.5 - Data validation
- **Uvicorn** 0.38.0 - ASGI server
- **Groq AI** - Primary LLM provider
- **Google Gemini** - Fallback LLM provider
- **Telegram Bot API** - Real-time alerts

## License

Private project - All rights reserved
