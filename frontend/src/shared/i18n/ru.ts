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
        whyChooseMe: 'Почему я',
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
            'Привет, я Андрей — Fullstack QA инженер с 3+ годами опыта в обеспечении качества современных веб-приложений.Специализируюсь на автоматизации тестирования на Python с использованием Playwright и Pytest, обеспечивая контроль качества и стабильность продукта на всех этапах жизненного цикла разработки.',
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

    contact: {
        title: 'Связаться',
        form: {
            name: 'Имя',
            email: 'Email',
            message: 'Сообщение',
            submit: 'Отправить',
            sending: 'Подождите',
            success: 'Сообщение отправлено!',
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
