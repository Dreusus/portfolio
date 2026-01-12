# Frontend для Portfolio

Next.js приложение для сайта-портфолио с современным стеком технологий и Feature-Sliced Design архитектурой.

## Возможности

- **Современный стек** - Next.js 15 + React 19 + TypeScript
- **Адаптивный дизайн** - Mobile-first подход с плавными анимациями
- **AI Чат-виджет** - Интерактивный ассистент с интеграцией с backend
- **Многоязычность** - Поддержка английского и русского языков
- **Feature-Sliced Design** - Масштабируемая архитектура приложения
- **Tailwind CSS 4** - Современная утилитарная CSS библиотека
- **Анимации** - Framer Motion для плавных переходов
- **Формы** - React Hook Form + Zod для валидации
- **Оптимизация производительности** - Turbopack для быстрой разработки

## Структура проекта

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Корневой layout
│   │   ├── page.tsx            # Главная страница
│   │   └── globals.css         # Глобальные стили
│   │
│   ├── pages/                  # Компоненты страниц
│   │   └── home/
│   │       └── ui/
│   │           └── HomePage.tsx # Главная страница
│   │
│   ├── widgets/                # Сложные UI компоненты
│   │   ├── header/             # Шапка сайта
│   │   ├── footer/             # Подвал сайта
│   │   ├── hero-section/       # Героическая секция
│   │   ├── about-section/      # Секция "О себе"
│   │   ├── experience-section/ # Секция опыта работы
│   │   ├── contact-section/    # Секция контактов
│   │   └── chat-widget/        # AI чат-виджет
│   │
│   ├── features/               # Бизнес-функции
│   │   ├── about-block/        # Блок информации о себе
│   │   ├── choose-me-block/    # Блок "Почему выбирают меня"
│   │   ├── contact-block/      # Блок контактной формы
│   │   ├── experience-block/   # Блок опыта работы
│   │   ├── project-block/      # Блок проектов
│   │   └── skills-block/       # Блок навыков
│   │
│   └── shared/                 # Переиспользуемый код
│       ├── ui/                 # UI компоненты
│       ├── hooks/              # React hooks
│       ├── i18n/               # Интернационализация
│       ├── types/              # TypeScript типы
│       ├── utils/              # Утилиты
│       ├── assets/             # Статические ресурсы
│       ├── consts/             # Константы
│       ├── lib/                # Библиотеки
│       └── model/              # Модели данных
│
├── public/                     # Публичные файлы
├── package.json                # Зависимости
└── tsconfig.json               # TypeScript конфигурация
```

## Архитектура

Проект построен по методологии **Feature-Sliced Design (FSD)** - современной архитектуре для фронтенд приложений:

### Слои (Layers)

1. **app/** - Инициализация приложения
   - Роутинг (Next.js App Router)
   - Глобальные стили
   - Провайдеры и обёртки

2. **pages/** - Компоненты страниц
   - Композиция виджетов и features
   - Страничная логика

3. **widgets/** - Сложные составные компоненты
   - Шапка, подвал, секции
   - Композиция features и UI компонентов
   - Бизнес-контекст отдельных блоков страницы

4. **features/** - Бизнес-функции
   - Пользовательские сценарии
   - Взаимодействие с API
   - Бизнес-логика

5. **shared/** - Переиспользуемый код
   - UI компоненты (кнопки, инпуты, формы)
   - Хуки, утилиты, типы
   - Интернационализация

### Структура слайсов

Каждый слайс (feature/widget) может содержать:

```
feature-name/
├── index.ts              # Публичный API
├── ui/                   # UI компоненты
├── model/                # Бизнес-логика, данные
├── api/                  # API запросы (если нужно)
└── lib/                  # Вспомогательные функции
```

## Основные компоненты

### Widgets (Виджеты)

- **Header** - Шапка сайта с навигацией и переключателем языка
- **Footer** - Подвал с социальными ссылками
- **HeroSection** - Героическая секция с приветствием
- **AboutSection** - Секция "О себе"
- **ExperienceSection** - Секция опыта работы
- **ContactSection** - Секция контактов с формой
- **ChatWidget** - AI чат-ассистент

### Features (Функции)

- **AboutBlock** - Информация о себе
- **WhyChooseMeBlock** - Преимущества работы со мной
- **ContactBlock** - Контактная форма с валидацией
- **ExperienceBlock** - Опыт работы с компаниями
- **ProjectBlock** - Портфолио проектов
- **SkillsBlock** - Технические навыки

### Shared UI (Общие компоненты)

- **Button** - Переиспользуемая кнопка
- **Input** - Поле ввода
- **Textarea** - Текстовая область
- **Label** - Метка для форм
- **Form** - Обёртка для форм
- **BlockContainer** - Контейнер для блоков
- **BlockTitle** - Заголовок блока
- **ProjectCard** - Карточка проекта
- **DynamicLogo** - Динамический логотип
- **IPhoneMockup** - Мокап iPhone
- **LanguageSwitcher** - Переключатель языка
- **Socials** - Социальные ссылки
- **Spotlight** - Световой эффект

## Интернационализация (i18n)

Приложение поддерживает два языка:
- Английский (en)
- Русский (ru)

### Структура переводов

```typescript
// src/shared/i18n/ru.ts
export const ru = {
  nav: {
    home: "Главная",
    about: "О себе",
    experience: "Опыт",
    contact: "Контакты",
  },
  hero: {
    title: "QA автоматизатор",
    subtitle: "Привет, я Андрей Поляков",
    // ...
  },
  // ...
}
```

### Использование

```tsx
import { useLanguage } from '@/shared/i18n';

function MyComponent() {
  const { t } = useLanguage();
  return <h1>{t.hero.title}</h1>;
}
```

## AI Чат-виджет

Интерактивный чат-ассистент для взаимодействия с посетителями:

### Возможности
- Отправка сообщений в AI
- Просмотр истории чата
- Адаптивный интерфейс
- Интеграция с backend API

### API интеграция

```typescript
// Отправка сообщения
POST ${BACKEND_URL}/api/v1/chat
Body: { prompt: "ваше сообщение" }

// Получение истории
GET ${BACKEND_URL}/api/v1/chat/history
```

## Локальная разработка

### Установка

```bash
cd frontend
pnpm install
```

### Переменные окружения

Создайте `.env.local` файл:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id
```

### Запуск dev сервера

```bash
# С Turbopack (рекомендуется)
pnpm dev

# Без Turbopack
pnpm dev --no-turbo
```

Приложение будет доступно на http://localhost:3000

### Сборка для production

```bash
# Сборка
pnpm build

# Запуск production сервера
pnpm start
```

### Линтинг

```bash
pnpm lint
```

## Docker развёртывание

Frontend можно запустить в Docker контейнере:

```bash
# Из корня проекта
docker-compose up -d frontend

# Просмотр логов
docker-compose logs -f frontend

# Пересборка
docker-compose up -d --build frontend
```

## Формы и валидация

### Контактная форма

Используется **React Hook Form** + **Zod** для валидации:

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Имя обязательно'),
  email: z.string().email('Неверный email'),
  message: z.string().min(10, 'Минимум 10 символов'),
});

function ContactForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  });
  // ...
}
```

### Отправка форм

Формы отправляются через **Formspree**:

```tsx
import { useForm } from '@formspree/react';

function ContactForm() {
  const [state, handleSubmit] = useForm("your_formspree_id");
  // ...
}
```

## Анимации

Используется **Framer Motion** для анимаций:

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Контент
</motion.div>
```

## Стилизация

### Tailwind CSS 4

Проект использует Tailwind CSS 4 с утилитарным подходом:

```tsx
<div className="flex items-center justify-center gap-4 p-6">
  <Button className="bg-primary text-white hover:bg-primary/90">
    Кнопка
  </Button>
</div>
```

### Утилиты

- **cn()** - Для условных классов (clsx + tailwind-merge)
- **CVA** - Class Variance Authority для вариантов компонентов

```tsx
import { cn } from '@/shared/utils/utils';

<div className={cn(
  "base-class",
  isActive && "active-class",
  className
)} />
```

## Хуки

### useIsMobile

Определяет мобильное устройство:

```tsx
import { useIsMobile } from '@/shared/hooks/useIsMobile';

function MyComponent() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileView /> : <DesktopView />;
}
```

## Технологический стек

- **Next.js** 15.5.9 - React фреймворк
- **React** 19.0.0 - UI библиотека
- **TypeScript** 5 - Типобезопасность
- **Tailwind CSS** 4 - Утилитарный CSS
- **Framer Motion** 12.20.1 - Анимации
- **React Hook Form** 7.56.4 - Управление формами
- **Zod** 3.25.36 - Валидация схем
- **Formspree** 3.0.0 - Отправка форм
- **Lucide React** 0.510.0 - Иконки
- **Embla Carousel** 8.6.0 - Карусель
- **Shadcn/ui** - Библиотека компонентов
- **pnpm** - Пакетный менеджер

## Оптимизация

### Производительность

- **Turbopack** - Быстрая сборка в dev режиме
- **Code splitting** - Автоматическое разделение кода
- **Image optimization** - Оптимизация изображений Next.js
- **Font optimization** - Оптимизация шрифтов

### SEO

- Мета теги для каждой страницы
- Open Graph теги
- Favicon и иконки приложения
- Sitemap (если настроен)

## Решение проблем

### Порт 3000 занят

```bash
# Найти процесс
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Использовать другой порт
pnpm dev -p 3001
```

### Ошибки сборки

```bash
# Очистить кэш
rm -rf .next node_modules
pnpm install
pnpm build
```

### Проблемы с TypeScript

```bash
# Проверить типы
pnpm tsc --noEmit
```

### Backend недоступен

1. Проверьте `NEXT_PUBLIC_BACKEND_URL` в `.env.local`
2. Убедитесь что backend запущен
3. Проверьте CORS настройки в backend

## Лицензия

Приватный проект - Все права защищены
