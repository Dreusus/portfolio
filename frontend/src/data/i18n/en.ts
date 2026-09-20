export const en = {
  name: {
    first: 'Andrey',
    last: 'Polyakov',
  },

  tagline: 'Bug Hunter',
  location: 'Saint Petersburg, Russia',
  available: 'Online',

  about: {
    title: 'About Me',
    description:
      "Hi, I'm Andrey — a Fullstack QA Engineer with 3+ years of experience ensuring the quality and reliability of modern web applications. I specialize in Python, Playwright, and Pytest, focusing on building robust automated test frameworks and delivering seamless user experiences.",
    socialLinks: '',
  },


  skills: {
    title: 'Skills',
  },


  experience: {
    title: 'Experience',
    jobs: [
      {
        title: 'Lead QA',
        company: 'SMS.TECH',
        period: 'Jun 2026 — Present',
        from: '2026-06',
        to: null as string | null,
        note: null as string | null,
        points: [
          'Leading the QA team: processes, priorities, test and release reviews',
          'Automation strategy: pytest + Playwright, Allure TestOps, GitLab CI across stages',
          'Bringing AI agents into QA: reviews, task pipeline, coverage analysis',
          'Load testing and observability: Locust, Kibana, Grafana, ClickHouse',
        ],
      },
      {
        title: 'Fullstack QA Engineer',
        company: 'Leads.Tech',
        period: 'Sep 2023 — Jun 2026',
        from: '2023-09',
        to: '2026-06' as string | null,
        note: 'ITF + Leads.Tech, one team' as string | null,
        points: [
          'UI and API automation in Python (Pytest, Playwright) with Allure reports',
          'Integrating autotests into GitLab CI and TestOps, flaky-test monitoring',
          'Load testing of highload systems (Locust)',
          'Databases and observability: PostgreSQL, ClickHouse, Redis, Kibana, Grafana',
          'Acting QA Lead: coordinating 4 QA engineers, mentoring manual QA',
        ],
      },
      {
        title: 'QA Engineer',
        company: 'Easy to learn',
        period: 'Apr 2023 — Aug 2023',
        from: '2023-04',
        to: '2023-08' as string | null,
        note: null as string | null,
        points: [
          'Functional and integration testing of web application',
          'API testing and database work',
          'UI automation (Java, Selenium, Page Object)',
        ],
      },
    ],
  },


  whyChooseMe: {
    title: 'Why Choose Me',
    features: {
      experience: {
        title: '3+ Years in QA',
        description: 'Experience at all stages — from startup to highload production.',
      },
      automation: {
        title: 'Automation',
        description: 'UI and API autotests that reduce regression time.',
      },
      quality: {
        title: 'Full QA Cycle',
        description: 'From requirements analysis to post-release support.',
      },
      reliable: {
        title: 'Stable Tests',
        description: 'No flaky tests — only reproducible results.',
      },
      teamwork: {
        title: 'Teamwork',
        description: 'Effective collaboration with dev, DevOps and management.',
      },
      remote: {
        title: 'Remote Work',
        description: 'Self-organization, async communication, responsibility.',
      },
    },
  },

  contact: {
    title: 'Contact me',
    form: {
      name: 'Name',
      email: 'Email Address',
      message: 'Message',
      submit: 'Submit',
      sending: 'Please wait',
      success: 'Message sent successfully!',
      errors: {
        nameRequired: 'Name is required',
        nameShort: 'Name is too short',
        emailRequired: 'Email is required',
        emailInvalid: 'Invalid email',
        messageRequired: 'Message is required',
        messageShort: 'Message is too short (min 10 chars)',
      },
    },
  },

  terminal: {
    aiActivated: '🤖 AI mode activated. Ask anything about Andrey. exit — to leave.',
    aiExit: 'AI mode deactivated.',
    aiError: 'AI error. Try again.',
    aiThinking: 'thinking...',
  },

  footer: {
    copyright: 'Copyright © {year} Andrey Polyakov. All rights reserved.',
  },

  mc: {
    brand: 'mission control',
    stages: { boot: 'boot', now: 'now', stack: 'stack', history: 'history', contact: 'contact' },
    status: { available: 'available', local: 'SPB', bugHunt: 'Bug hunt', bugsFound: 'bugs' },
    boot: {
      lines: ['init qa-core', 'load suites', 'attach playwright', 'connect allure', 'ready'],
      ok: 'ok',
      subtitle: 'Lead QA · SMS.TECH · Saint Petersburg',
      scroll: 'scroll to run',
      primaryCta: 'Write me',
      secondaryCta: 'Experience',
    },
    terminal: {
      title: 'andrey@portfolio',
      hint: 'click a command or type it and press Enter',
      welcome: 'Hi. This terminal knows a few commands:',
      placeholder: 'type a command, e.g. whoami',
      aiPlaceholder: 'ask anything about Andrey…',
      runLabel: 'run',
      commands: [
        { cmd: 'whoami', desc: 'who I am' },
        { cmd: 'skills', desc: 'tools I work with' },
        { cmd: 'experience', desc: 'career in three lines' },
        { cmd: 'contact', desc: 'how to reach me' },
        { cmd: 'ai', desc: 'talk to the bot about me' },
        { cmd: 'bug-hunt', desc: 'game: catch 5 bugs on the page' },
        { cmd: 'help', desc: 'this list' },
        { cmd: 'clear', desc: 'clear the screen' },
      ],
      aiSuggestions: ['What do you do at SMS.TECH?', 'Which test stack do you use?'],
      notFound: 'command not found',
      aiPrompt: 'ai>',
      whoami: 'Andrey Polyakov — Lead QA @ SMS.TECH · Saint Petersburg',
      experienceLines: [
        '2023 · Easy to learn · QA Engineer',
        '2023–2026 · Leads.Tech · Fullstack QA Engineer',
        '2026– · SMS.TECH · Lead QA',
      ],
      bugStart: 'Bug Hunter armed. 5 bugs are loose on this page — catch them.',
      bugStop: 'Bug Hunter disarmed.',
      allCaught: 'All 5 bugs squashed. Release approved.',
    },
    now: {
      label: 'now · current run',
      role: 'Lead QA',
      company: 'SMS.TECH · since June 2026',
      items: [
        {
          title: 'QA team',
          desc: 'Processes, priorities, test and release reviews for a team of four.',
        },
        {
          title: 'Test automation',
          desc: 'pytest + Playwright, Allure TestOps, GitLab CI pipelines across the stages.',
        },
        {
          title: 'AI in the QA cycle',
          desc: 'Agents for code review, task pipelines and coverage analysis.',
        },
      ],
    },
    stack: {
      label: 'stack field',
      title: 'Tools I ship with',
      hint: 'drag the cursor through the field · click an icon',
      all: 'all',
      groups: { lang: 'lang', test: 'test', ops: 'ops', data: 'data', perf: 'perf' },
      since: 'since',
      docs: 'docs',
      usedAt: {
        Python: 'Core language of every framework I build.',
        Pytest: 'Fixtures, parametrization, plugins, custom markers.',
        Playwright: 'E2E with Page Objects, parallel runs, traces.',
        Allure: 'Reports, TestOps, flaky monitoring.',
        Pydantic: 'Contract validation for API tests.',
        Docker: 'Isolated test envs, CI images.',
        Elastic: 'Log analysis while hunting flaky tests.',
        'GitLab CI': 'Pipelines, stage triggers, nightly runs.',
        PostgreSQL: 'Data checks and fixtures straight from the DB.',
        TypeScript: 'Playwright suites and tooling.',
        Locust: 'Load scenarios for highload APIs.',
        Postman: 'Exploratory API testing and collections.',
        ClickHouse: 'Checking events and aggregates in SMS platform tests.',
        Kibana: 'Stage logs when digging into failures.',
        Grafana: 'Stage and load-test metrics.',
      } as Record<string, string>,
    },
    history: {
      label: 'run history',
      title: 'Career stages',
      running: 'running',
      passed: 'passed',
      stage: 'stage',
      units: { year: 'yr', month: 'mo' },
    },
    contact: {
      label: 'final stage',
      socials: 'open',
      form: 'send a message',
      wave: 'RELEASE APPROVED',
    },
    bugs: {
      intro: 'Five bugs are crawling over the page. Click them. Esc stops the game.',
      hint: 'catch the bugs',
      stop: 'stop the game',
      done: 'All bugs squashed. You would make a great QA.',
    },
    footer: {
      built: 'Built with Next.js, motion and too much coffee.',
    },
  },
};
