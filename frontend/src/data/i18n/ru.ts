export const ru = {
    name: {
        first: 'Андрей',
        last: 'Поляков',
    },


    nav: {
        about: 'Обо мне',
        projects: 'Проекты',
        skills: 'Навыки',
        experience: 'Опыт',
        whyChooseMe: 'Подход',
        contact: 'Контакты',
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
            'Привет, я Андрей — Fullstack QA инженер с 3+ годами опыта в обеспечении качества современных веб-приложений. Специализируюсь на автоматизации тестирования на Python с использованием Playwright и Pytest, обеспечивая контроль качества и стабильность продукта на всех этапах жизненного цикла разработки.',
        socialLinks: '',
    },


    projects: {
        title: 'Мои проекты',
        inProgress: 'Скоро',
        items: {
            qaDesktop: {
                title: 'QA Desktop',
                description: 'Хаб ссылок команды',
            },
            pytestFramework: {
                title: 'API HTTPX Template',
                description: 'Pytest + Allure + CI/CD',
            },
            playwrightTemplate: {
                title: 'Playwright Template',
                description: 'E2E + Page Object',
            },
        },
    },

    // Skills
    skills: {
        title: 'Навыки',
    },

    // Experience
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
        title: 'Подход к работе',
        subtitle: 'Фокус на процессе: как переводить QA из ручного хаоса в стабильный и предсказуемый релизный контур.',
        workflowTitle: 'Процесс работы',
        workflow: {
            audit: {
                title: 'Аудит рисков и покрытия',
                description: 'Проверяю критичные пользовательские сценарии, API-цепочки и узкие места текущего регресса.',
            },
            strategy: {
                title: 'Стратегия автоматизации',
                description: 'Фиксирую приоритеты, стек, quality-gates и метрики стабильности для команды.',
            },
            implementation: {
                title: 'Внедрение в CI/CD',
                description: 'Реализую и поддерживаю автотесты, отчётность и контроль flaky-тестов.',
            },
            release: {
                title: 'Релиз и передача практик',
                description: 'Синхронизирую QA с dev/DevOps и закрепляю рабочий процесс внутри команды.',
            },
        },
        outcomesTitle: 'Что получает команда',
        outcomes: {
            speed: {
                title: 'Быстрый фидбек',
                description: 'Сокращение времени проверки изменений и меньше ручной рутины.',
            },
            stability: {
                title: 'Стабильная регрессия',
                description: 'Предсказуемые прогоны без хаотичных падений и ложных тревог.',
            },
            visibility: {
                title: 'Прозрачное качество',
                description: 'Понятные отчёты и метрики для решений по релизу.',
            },
            ownership: {
                title: 'Устойчивый процесс',
                description: 'Не набор тестов, а воспроизводимая QA-система в продуктовой команде.',
            },
        },
    },

    contact: {
        title: 'Связаться',
        subtitle: 'Если есть задача по тестированию или автоматизации, напишите в удобный канал или сразу через форму.',
        channels: {
            telegram: 'Telegram',
            linkedin: 'LinkedIn',
            github: 'GitHub',
        },
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
                submitFailed: 'Не удалось отправить сообщение. Попробуйте ещё раз.',
                network: 'Проблема сети. Попробуйте позже.',
            },
        },
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
