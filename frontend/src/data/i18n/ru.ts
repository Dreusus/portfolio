export const ru = {
    name: {
        first: 'Андрей',
        last: 'Поляков',
    },

    tagline: 'Охотник за багами',
    location: 'Санкт-Петербург, Россия',
    available: 'На связи',

    hero: {
        title: 'Lead QA Engineer',
        contactBtn: 'Связаться',
        roles: [
            'Архитектор автотестов',
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

    skills: {
        title: 'Навыки',
    },

    experience: {
        title: 'Опыт работы',
        jobs: [
            {
                title: 'Lead QA',
                company: 'SMS.TECH',
                period: 'Июн 2026 — настоящее время',
                from: '2026-06',
                to: null as string | null,
                note: null as string | null,
                points: [
                    'Руковожу QA-командой: процессы, приоритеты, ревью тестов и релизов',
                    'Стратегия автоматизации: pytest + Playwright, Allure TestOps, GitLab CI на стендах',
                    'Внедряю AI-агентов в процесс QA: ревью, пайплайн задач, анализ покрытия',
                    'Нагрузочное тестирование и наблюдаемость: Locust, Kibana, Grafana, ClickHouse',
                ],
            },
            {
                title: 'Fullstack QA Engineer',
                company: 'Leads.Tech',
                period: 'Сен 2023 — Июн 2026',
                from: '2023-09',
                to: '2026-06' as string | null,
                note: 'ITF + Leads.Tech, одна команда' as string | null,
                points: [
                    'Автоматизация UI и API на Python (Pytest, Playwright) с отчётами в Allure',
                    'Интеграция автотестов в GitLab CI и TestOps, контроль flaky-тестов',
                    'Нагрузочное тестирование highload-систем (Locust)',
                    'БД и наблюдаемость: PostgreSQL, ClickHouse, Redis, Kibana, Grafana',
                    'Замещение QA Lead: координация 4 QA, менторинг manual QA',
                ],
            },
            {
                title: 'QA Engineer',
                company: 'Легко учиться',
                period: 'Апр 2023 — Авг 2023',
                from: '2023-04',
                to: '2023-08' as string | null,
                note: null as string | null,
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
        items: [
            { value: 3, suffix: '+', label: 'года в QA' },
            { value: 3, suffix: '', label: 'компании' },
            { value: 4, suffix: '', label: 'QA в команде' },
            { value: 2, suffix: '', label: 'стека автотестов: UI и API' },
        ],
    },

    contact: {
        title: 'Связаться',
        headline: 'Давай построим что-то, что не сломается.',
        sub: 'Отвечаю в течение дня. Пишите про QA, автоматизацию и AI в тестировании.',
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

    terminal: {
        aiActivated: '🤖 AI-режим активирован. Спроси что угодно об Андрее. exit — выйти.',
        aiExit: 'AI-режим выключен.',
        aiError: 'Ошибка AI. Попробуй ещё раз.',
        aiThinking: 'думаю...',
    },

    footer: {
        copyright: 'Copyright © {year} Андрей Поляков. Все права защищены.',
    },

    mc: {
        brand: 'mission control',
        stages: { boot: 'boot', run: 'run', stack: 'stack', history: 'history', contact: 'contact' },
        status: { available: 'на связи', local: 'SPB', bugHunt: 'Охота на баги', bugsFound: 'багов' },
        boot: {
            lines: ['init qa-core', 'load suites', 'attach playwright', 'connect allure', 'ready'],
            ok: 'ok',
            subtitle: 'Lead QA · SMS.TECH · Санкт-Петербург',
            scroll: 'листай, чтобы запустить',
            primaryCta: 'Написать',
            secondaryCta: 'Опыт',
        },
        terminal: {
            title: 'andrey@portfolio',
            hint: 'набери «help» — или «ai», чтобы поговорить с ботом',
            placeholder: 'help',
            help: 'команды: whoami · skills · experience · contact · ai · sudo bug-hunt · clear',
            notFound: 'команда не найдена',
            aiPrompt: 'ai>',
            whoami: 'Андрей Поляков — Lead QA @ SMS.TECH · Санкт-Петербург',
            experienceLines: [
                '2023 · Легко учиться · QA Engineer',
                '2023–2026 · Leads.Tech · Fullstack QA Engineer',
                '2026– · SMS.TECH · Lead QA',
            ],
            bugStart: 'Bug Hunter включён. По странице бегают 5 багов — лови.',
            bugStop: 'Bug Hunter выключен.',
            allCaught: 'Все 5 багов пойманы. Релиз одобрен.',
        },
        manifest: {
            lines: ['Делаю релизы скучными.', 'Тесты, которые не флакают.', 'Баги умирают до прода.'],
        },
        stack: {
            label: 'поле стека',
            title: 'Инструменты, с которыми выпускаю',
            hint: 'проведи курсором по полю · кликни по иконке',
            all: 'все',
            groups: { lang: 'lang', test: 'test', ops: 'ops', data: 'data', perf: 'perf' },
            since: 'с',
            docs: 'доки',
            usedAt: {
                Python: 'Основной язык всех моих фреймворков.',
                Pytest: 'Фикстуры, параметризация, плагины, маркеры.',
                Playwright: 'E2E с Page Object, параллель, трейсы.',
                Allure: 'Отчёты, TestOps, мониторинг flaky.',
                Pydantic: 'Валидация контрактов в API-тестах.',
                Docker: 'Изолированные окружения, CI-образы.',
                Elastic: 'Разбор логов при охоте на flaky.',
                'GitLab CI': 'Пайплайны, триггеры стендов, ночные прогоны.',
                PostgreSQL: 'Проверки данных и фикстуры прямо из БД.',
                TypeScript: 'Playwright-сьюты и тулинг.',
                Locust: 'Нагрузочные сценарии для highload API.',
                Postman: 'Исследовательское API-тестирование, коллекции.',
                ClickHouse: 'Проверки событий и агрегатов в тестах SMS-платформы.',
                Kibana: 'Логи стендов при разборе падений.',
                Grafana: 'Метрики стендов и нагрузочных прогонов.',
            } as Record<string, string>,
        },
        history: {
            label: 'история прогонов',
            title: 'Этапы карьеры',
            running: 'running',
            passed: 'passed',
            stage: 'этап',
            units: { year: 'г.', month: 'мес.' },
        },
        contact: {
            label: 'финальная стадия',
            socials: 'open',
            form: 'написать',
            wave: 'RELEASE APPROVED',
        },
        bugs: {
            hint: 'лови багов',
            done: 'Все баги пойманы. Из тебя вышел бы отличный QA.',
        },
        footer: {
            built: 'Собрано на Next.js, motion и слишком большом количестве кофе.',
        },
    },
};
