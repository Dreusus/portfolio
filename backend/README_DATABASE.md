# Настройка PostgreSQL для логирования активности

## Обзор

Система логирования отслеживает:
- **Все HTTP запросы** к API (URL, метод, IP, user-agent, время ответа)
- **ChatRequest** - запросы к AI чату с полной историей диалогов

## Структура базы данных

### Таблица `chat_requests`
Хранит историю всех AI чат запросов:
- `id` - уникальный идентификатор
- `ip_address` - IP адрес пользователя
- `prompt` - запрос пользователя
- `response` - ответ AI
- `created_at` - время запроса
- `user_agent` - браузер/клиент пользователя
- `session_id` - ID сессии для группировки активности

### Таблица `request_logs`
Логирует все HTTP запросы к серверу:
- `id` - уникальный идентификатор
- `timestamp` - время запроса
- `ip_address` - IP адрес клиента
- `method` - HTTP метод (GET, POST, etc.)
- `path` - путь запроса
- `query_params` - query параметры
- `user_agent` - информация о клиенте
- `referer` - источник перехода
- `status_code` - код ответа
- `response_time_ms` - время обработки в миллисекундах
- `session_id` - ID сессии

## Быстрый старт с Docker

### 1. Настройка переменных окружения

Скопируйте `.env.example` в `.env` и заполните значения:

```bash
cp ../.env.example ../.env
```

Пример `.env`:
```env
# PostgreSQL
POSTGRES_USER=portfolio_user
POSTGRES_PASSWORD=your_secure_password_here
POSTGRES_DB=portfolio_db
POSTGRES_PORT=5432

# AI API Keys
GEMINI_API_KEY=your_gemini_key
GROK_API_KEY=your_grok_key
```

### 2. Запуск с Docker Compose

Из корневой директории проекта:

```bash
# Запустить все сервисы (PostgreSQL, Backend, Frontend)
docker-compose up -d

# Только PostgreSQL и Backend
docker-compose up -d postgres backend

# Посмотреть логи
docker-compose logs -f backend
```

PostgreSQL будет доступен на `localhost:5432`.

### 3. Проверка работы

```bash
# Проверить статус контейнеров
docker-compose ps

# Подключиться к PostgreSQL
docker-compose exec postgres psql -U portfolio_user -d portfolio_db

# В psql можно выполнить:
\dt                          # список таблиц
SELECT COUNT(*) FROM request_logs;
SELECT * FROM chat_requests ORDER BY created_at DESC LIMIT 10;
```

## Локальная разработка (без Docker)

### 1. Установка зависимостей

```bash
pip install -r requirements.txt
```

### 2. Варианты БД

#### Вариант A: Использовать SQLite (по умолчанию)

Ничего настраивать не нужно - SQLite работает из коробки:

```bash
python main.py
```

База данных будет создана в файле `chat_requests.db`.

#### Вариант B: Подключиться к PostgreSQL

Установите PostgreSQL локально или используйте внешний сервер:

```bash
# В .env или экспортируйте переменную:
export DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

python main.py
```

### 3. Миграции с Alembic

После изменения моделей в `db.py`:

```bash
# Создать миграцию
alembic revision --autogenerate -m "описание изменений"

# Применить миграции
alembic upgrade head

# Откатить миграцию
alembic downgrade -1
```

## Просмотр данных

### SQL запросы для аналитики

```sql
-- Топ 10 IP адресов по количеству запросов
SELECT ip_address, COUNT(*) as request_count
FROM request_logs
GROUP BY ip_address
ORDER BY request_count DESC
LIMIT 10;

-- Самые медленные эндпоинты
SELECT path, AVG(response_time_ms) as avg_time, COUNT(*) as requests
FROM request_logs
WHERE response_time_ms IS NOT NULL
GROUP BY path
ORDER BY avg_time DESC;

-- Активность за последние 24 часа
SELECT DATE_TRUNC('hour', timestamp) as hour, COUNT(*) as requests
FROM request_logs
WHERE timestamp > NOW() - INTERVAL '24 hours'
GROUP BY hour
ORDER BY hour;

-- История чатов конкретного пользователя
SELECT created_at, prompt, response
FROM chat_requests
WHERE ip_address = '123.456.789.0'
ORDER BY created_at DESC;
```

### Python API для чтения логов

```python
from db import session, RequestLog, ChatRequest
from sqlalchemy import select, func

with session() as s:
    # Получить все запросы за сегодня
    today_logs = s.execute(
        select(RequestLog)
        .where(RequestLog.timestamp >= func.current_date())
    ).scalars().all()

    # Статистика по IP
    ip_stats = s.execute(
        select(
            RequestLog.ip_address,
            func.count().label('count')
        )
        .group_by(RequestLog.ip_address)
    ).all()
```

## Безопасность

- **Не коммитьте `.env` файл** в git
- Используйте сильные пароли для PostgreSQL в продакшене
- В продакшене рекомендуется настроить SSL для PostgreSQL
- Регулярно делайте бэкапы базы данных:

```bash
# Бэкап
docker-compose exec postgres pg_dump -U portfolio_user portfolio_db > backup.sql

# Восстановление
docker-compose exec -T postgres psql -U portfolio_user portfolio_db < backup.sql
```

## Troubleshooting

### База данных не создается

```bash
# Пересоздать volume
docker-compose down -v
docker-compose up -d postgres

# Проверить логи PostgreSQL
docker-compose logs postgres
```

### Ошибки подключения

```bash
# Проверить переменные окружения
docker-compose exec backend env | grep DATABASE

# Проверить доступность PostgreSQL
docker-compose exec backend nc -zv postgres 5432
```

### Миграции не применяются

```bash
# Проверить текущую версию БД
alembic current

# Посмотреть историю миграций
alembic history

# Применить миграции принудительно
alembic upgrade head --sql > migration.sql  # Посмотреть SQL
alembic upgrade head
```

## Производительность

### Индексы

Таблицы уже содержат оптимальные индексы:
- По IP адресу и времени (для фильтрации по пользователям)
- По timestamp (для временных запросов)
- По path (для аналитики эндпоинтов)

### Очистка старых данных

Если БД разрастается, можно настроить автоматическую очистку:

```sql
-- Удалить request_logs старше 6 месяцев
DELETE FROM request_logs
WHERE timestamp < NOW() - INTERVAL '6 months';

-- Или создать партиционирование по месяцам (для больших объемов)
```
