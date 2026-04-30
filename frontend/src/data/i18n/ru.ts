export const ru = {
    name: {
        first: 'Андрей',
        last: 'Поляков',
    },

    tagline: 'Охотник за багами',
    location: 'Санкт-Петербург, Россия',
    available: 'На связи',


    nav: {
        about: 'Обо мне',
        projects: 'Проекты',
        skills: 'Навыки',
        experience: 'Опыт',
        whyChooseMe: 'Почему я',
        contact: 'Контакты',
        stats: 'Статистика',
    },

    sections: {
        about: 'Обо мне',
        projects: 'Избранные проекты',
        skills: 'Стек и инструменты',
        experience: 'Опыт работы',
        why: 'Почему я',
        contact: 'Связаться',
        stats: 'Тестовые метрики',
    },

    hero: {
        title: 'Full Stack QA Инженер',
        contactBtn: 'Связаться',
        roles: [
            'Архитектор тестов',
            'Страж качества',
            'Охотник за багами',
        ],
    },


    about: {
        title: 'Обо мне',
        description:
            'Привет, я Андрей — Fullstack QA инженер с 3+ годами опыта в обеспечении качества современных веб-приложений.Специализируюсь на автоматизации тестирования на Python с использованием Playwright и Pytest, обеспечивая контроль качества и стабильность продукта на всех этапах жизненного цикла разработки.',
        socialLinks: '',
    },


    projects: {
        title: 'Мои проекты',
        inProgress: 'Скоро',
        items: [
            {
                id: 'qa-desktop',
                title: 'QA Desktop',
                tag: 'Инструмент для команды',
                description: 'Хаб ссылок команды',
                desc: 'Внутренняя панель для QA-команд — отслеживание прогонов тестов в PROD, Stage и Tools окружениях.',
                stack: ['Electron', 'React', 'Python'],
                status: 'Live',
            },
            {
                id: 'api-template',
                title: 'API HTTPX Template',
                tag: 'Pytest + Allure + CI/CD',
                description: 'Pytest + Allure + CI/CD',
                desc: 'Production-ready шаблон для API тестов. Async HTTPX, Allure отчёты, GitLab CI.',
                stack: ['Python', 'HTTPX', 'Pytest'],
                status: 'Скоро',
            },
            {
                id: 'playwright-template',
                title: 'Playwright Template',
                tag: 'E2E + Page Objects',
                description: 'E2E + Page Object',
                desc: 'Стартер для E2E с Page Object Model, параллельным запуском и детекцией flaky-тестов.',
                stack: ['Playwright', 'TypeScript'],
                status: 'Скоро',
            },
            {
                id: 'qa-metrics',
                title: 'Test Metrics Dashboard',
                tag: 'Allure trends + flaky %',
                description: 'Allure trends + flaky %',
                desc: 'Дашборд со статистикой прогонов, трендами покрытия и процентом flaky-тестов — данные из Allure TestOps и GitLab CI.',
                stack: ['Python', 'Allure', 'Grafana'],
                status: 'Скоро',
            },
        ],
    },

    skills: {
        title: 'Навыки',
    },

    experience: {
        title: 'Опыт работы',
        jobs: [
            {
                title: 'Fullstack QA Engineer',
                company: 'Leads.tech',
                period: 'Фев 2024 — настоящее время',
                points: [
                    'Автоматизация UI и API тестирования на Python (Pytest, Playwright) с отчётами в Allure',
                    'Интеграция автотестов в GitLab CI и TestOps, контроль стабильности и flaky-тестов',
                    'Замещение QA Lead: координация команды из 4 QA-инженеров',
                    'Менторинг manual QA и code review автотестов',
                ],
            },
            {
                title: 'QA Engineer',
                company: 'IT Finance',
                period: 'Сен 2023 — Фев 2024',
                points: [
                    'Нагрузочное тестирование highload-систем (JMeter, Locust)',
                    'Функциональное и интеграционное тестирование монолитной архитектуры (API, UI)',
                    'Работа с БД (PostgreSQL, ClickHouse, Redis), анализ логов и метрик (Kibana, Grafana)',
                    'Проектирование и поддержка API-документации (Swagger / OpenAPI)',
                ],
            },
            {
                title: 'QA Engineer',
                company: 'Легко учиться',
                period: 'Апр 2023 — Авг 2023',
                points: [
                    'Функциональное и интеграционное тестирование веб-приложения',
                    'API-тестирование и работа с БД',
                    'UI-автоматизация (Java, Selenium, Page Object)',
                ],
            },
        ],
    },

    whyChooseMe: {
        title: 'Почему я',
        features: {
            experience: {
                title: '3+ года в QA',
                description: 'Опыт на всех этапах — от стартапа до highload продакшена.',
            },
            automation: {
                title: 'Автоматизация',
                description: 'UI и API автотесты, сокращающие время регресса',
            },
            quality: {
                title: 'Полный цикл QA',
                description: 'От анализа требований до пострелизной поддержки.',
            },
            reliable: {
                title: 'Стабильные тесты',
                description: 'Никаких flaky — только воспроизводимые результаты.',
            },
            teamwork: {
                title: 'Работа в команде',
                description: 'Эффективное взаимодействие с dev, DevOps и менеджментом.',
            },
            remote: {
                title: 'Удалёнка',
                description: 'Самоорганизация, async-коммуникация, ответственность.',
            },
        },
    },

    stats: {
        contributions: 1247,
        repos: 38,
        stars: 412,
        bugs: 873,
        label_contributions: 'Автотестов написано',
        label_repos: 'Тестовых сьютов',
        label_stars: 'CI прогонов / неделя',
        label_bugs: 'Багов поймано',
    },

    contact: {
        title: 'Связаться',
        headline: 'Давай построим что-то, что не сломается.',
        sub: 'Отвечаю в течение 24 часов. Сейчас открыт к ролям QA Lead и Senior SDET.',
        form: {
            name: 'Имя',
            email: 'Email',
            message: 'Сообщение',
            submit: 'Отправить',
            sending: 'Подождите',
            success: 'Сообщение отправлено!',
            errors: {
                nameRequired: 'Введите имя',
                nameShort: 'Имя слишком короткое',
                emailRequired: 'Введите email',
                emailInvalid: 'Неверный email',
                messageRequired: 'Введите сообщение',
                messageShort: 'Сообщение слишком короткое (мин. 10 символов)',
            },
        },
    },

    bugHunter: {
        hint: 'Найди 5 багов на этой странице',
        progress: 'багов найдено',
        complete: 'Все баги пойманы. Из тебя бы вышел отличный QA.',
        cta: 'Режим охоты на баги',
    },

    terminal: {
        windowClosed: 'Окно закрыто',
        reopen: 'кликни чтобы открыть',
        aiActivated: '🤖 AI-режим активирован. Спроси что угодно об Андрее. exit — выйти.',
        aiExit: 'AI-режим выключен.',
        aiError: 'Ошибка AI. Попробуй ещё раз.',
        aiThinking: 'думаю...',
    },

    askAi: {
        title: '# Спроси AI',
        sub: 'Бот знает обо мне всё — задай вопрос',
        placeholder: 'Что хочешь узнать?',
        continue: 'Продолжить в терминале →',
        chips: [
            'Расскажи про стек',
            'Как ты решаешь flaky-тесты?',
            'Почему именно тебя?',
        ],
    },

    footer: {
        copyright: 'Copyright © {year} Андрей Поляков. Все права защищены.',
    },

    chat: {
        title: 'AI Ассистент',
        subtitle: 'Задайте вопрос об Андрее',
        placeholder: 'Начните диалог...',
        inputPlaceholder: 'Введите сообщение...',
        open: 'Открыть чат',
        close: 'Закрыть чат',
        error: 'Произошла ошибка. Попробуйте ещё раз.',
    },
};
