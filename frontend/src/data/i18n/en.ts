export const en = {
  name: {
    first: 'Andrey',
    last: 'Polyakov',
  },

  tagline: 'Bug Hunter',
  location: 'Saint Petersburg, Russia',
  available: 'Online',

  nav: {
    about: 'About',
    projects: 'Projects',
    skills: 'Skills',
    experience: 'Experience',
    whyChooseMe: 'Why Choose Me',
    contact: 'Contact',
    stats: 'Stats',
  },

  sections: {
    about: 'About',
    projects: 'Selected Projects',
    skills: 'Stack & Tools',
    experience: 'Experience',
    why: 'Why Choose Me',
    contact: 'Get in Touch',
    stats: 'Test Stats',
  },

  hero: {
    title: 'Full Stack QA Engineer',
    contactBtn: 'Contact Me',
    roles: [
      'Test Architect',
      'Quality Guardian',
      'Bug Hunter',
    ],
  },


  about: {
    title: 'About Me',
    description:
      "Hi, I'm Andrey — a Fullstack QA Engineer with 3+ years of experience ensuring the quality and reliability of modern web applications. I specialize in Python, Playwright, and Pytest, focusing on building robust automated test frameworks and delivering seamless user experiences.",
    socialLinks: '',
  },

  projects: {
    title: 'My Projects',
    inProgress: 'Soon',
    items: [
      {
        id: 'qa-desktop',
        title: 'QA Desktop',
        tag: 'Team View Tool',
        description: 'Team links hub',
        desc: 'Internal dashboard for QA teams — track test runs across PROD, Stage, and Tools environments.',
        stack: ['Electron', 'React', 'Python'],
        status: 'Live',
      },
      {
        id: 'api-template',
        title: 'API HTTPX Template',
        tag: 'Pytest + Allure + CI/CD',
        description: 'Pytest + Allure + CI/CD',
        desc: 'Production-ready boilerplate for API testing. Async HTTPX, Allure reports, GitLab CI.',
        stack: ['Python', 'HTTPX', 'Pytest'],
        status: 'Soon',
      },
      {
        id: 'playwright-template',
        title: 'Playwright Template',
        tag: 'E2E + Page Objects',
        description: 'E2E + Page Object',
        desc: 'Opinionated E2E starter with Page Object Model, parallel execution, flaky-test detection.',
        stack: ['Playwright', 'TypeScript'],
        status: 'Soon',
      },
      {
        id: 'qa-metrics',
        title: 'Test Metrics Dashboard',
        tag: 'Allure trends + flaky %',
        description: 'Allure trends + flaky %',
        desc: 'Dashboard with run statistics, coverage trends and flaky-test ratio — pulled from Allure TestOps and GitLab CI.',
        stack: ['Python', 'Allure', 'Grafana'],
        status: 'Soon',
      },
    ],
  },


  skills: {
    title: 'Skills',
  },


  experience: {
    title: 'Experience',
    jobs: [
      {
        title: 'Fullstack QA Engineer',
        company: 'Leads.tech',
        period: 'Feb 2024 — Present',
        points: [
          'UI & API test automation with Python (Pytest, Playwright) and Allure reports',
          'CI/CD integration with GitLab and Allure TestOps, flaky test monitoring',
          'Acting QA Lead: coordinating a team of 4 QA engineers',
          'Mentoring manual QA and code review of autotests',
        ],
      },
      {
        title: 'QA Engineer',
        company: 'IT Finance',
        period: 'Sep 2023 — Feb 2024',
        points: [
          'Load testing of highload systems (JMeter, Locust)',
          'Functional and integration testing of monolithic architecture (API, UI)',
          'Database work (PostgreSQL, ClickHouse, Redis), log and metrics analysis (Kibana, Grafana)',
          'API documentation design and maintenance (Swagger / OpenAPI)',
        ],
      },
      {
        title: 'QA Engineer',
        company: 'Easy to learn',
        period: 'Apr 2023 — Aug 2023',
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

  stats: {
    contributions: 1247,
    repos: 38,
    stars: 412,
    bugs: 873,
    label_contributions: 'Autotests written',
    label_repos: 'Test suites',
    label_stars: 'CI runs / week',
    label_bugs: 'Bugs caught',
  },

  contact: {
    title: 'Contact Me',
    headline: "Let's build something that doesn't break.",
    sub: 'Reply within 24h. Currently open to QA Lead and Senior SDET roles.',
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

  bugHunter: {
    hint: 'Find 5 bugs on this page',
    progress: 'bugs found',
    complete: "All bugs squashed. You'd make a great QA.",
    cta: 'Bug Hunter Mode',
  },

  terminal: {
    windowClosed: 'Window closed',
    reopen: 'click to reopen',
    aiActivated: '🤖 AI mode activated. Ask anything about Andrey. exit — to leave.',
    aiExit: 'AI mode deactivated.',
    aiError: 'AI error. Try again.',
    aiThinking: 'thinking...',
  },

  askAi: {
    title: '# Ask the AI',
    sub: 'The bot knows everything about me — ask away',
    placeholder: 'What do you want to know?',
    continue: 'Continue in terminal →',
    chips: [
      "What's your stack?",
      'How do you fix flaky tests?',
      'Why hire you?',
    ],
  },

  footer: {
    copyright: 'Copyright © {year} Andrey Polyakov. All rights reserved.',
  },


  chat: {
    title: 'AI Assistant',
    subtitle: 'Ask me anything about Andrey',
    placeholder: 'Start a conversation...',
    inputPlaceholder: 'Type your message...',
    open: 'Open chat',
    close: 'Close chat',
    error: 'Sorry, something went wrong. Please try again.',
  },

  mc: {
    brand: 'mission control',
    stages: { boot: 'boot', run: 'run', suites: 'suites', stack: 'stack', history: 'history', contact: 'contact' },
    status: { available: 'available', local: 'SPB', hire: 'Hire me', cv: 'Download CV', bugHunt: 'Bug hunt', bugsFound: 'bugs' },
    boot: {
      lines: ['init qa-core', 'load suites', 'attach playwright', 'connect allure', 'ready'],
      ok: 'ok',
      subtitle: 'Full Stack QA Engineer · Saint Petersburg · open to QA Lead / Senior SDET',
      scroll: 'scroll to run',
    },
    terminal: {
      title: 'andrey@portfolio',
      hint: 'type "help" — or "ai" to talk to the bot',
      placeholder: 'help',
      help: 'commands: whoami · skills · projects · contact · cv · ai · sudo bug-hunt · clear',
      notFound: 'command not found',
      aiPrompt: 'ai>',
      bugStart: 'Bug Hunter armed. 5 bugs are loose on this page — catch them.',
      bugStop: 'Bug Hunter disarmed.',
      cv: 'CV is on the way — write me at the bottom and I will send the fresh one.',
      allCaught: 'All 5 bugs squashed. Release approved.',
    },
    manifest: {
      lines: ['I make releases boring.', 'Tests that never flake.', 'Bugs die before prod.'],
    },
    suites: {
      label: 'test suites',
      title: 'Selected work',
      passed: 'PASSED',
      soon: 'SOON',
      open: 'Open repository',
      hint: 'keep scrolling',
    },
    stack: {
      label: 'stack field',
      title: 'Tools I ship with',
      hint: 'drag the cursor through the field · click an icon',
      all: 'all',
      groups: { lang: 'lang', test: 'test', ops: 'ops', data: 'data', perf: 'perf' },
      coverage: 'coverage',
      docs: 'docs',
      usedAt: {
        Python: 'Core language of every framework I build.',
        Pytest: 'Fixtures, parametrization, plugins, custom markers.',
        Playwright: 'E2E with Page Objects, parallel runs, traces.',
        Selenium: 'Legacy UI suites, Page Object refactoring.',
        Allure: 'Reports, TestOps, flaky monitoring.',
        Pydantic: 'Contract validation for API tests.',
        Docker: 'Isolated test envs, CI images.',
        Elastic: 'Log analysis while hunting flaky tests.',
        'GitLab CI': 'Pipelines, stage triggers, nightly runs.',
        PostgreSQL: 'Data checks and fixtures straight from the DB.',
        TypeScript: 'Playwright suites and tooling.',
        Locust: 'Load scenarios for highload APIs.',
        JMeter: 'Performance baselines and reports.',
        Postman: 'Exploratory API testing and collections.',
      } as Record<string, string>,
    },
    history: {
      label: 'run history',
      title: 'Career stages',
      running: 'running',
      passed: 'passed',
      stage: 'stage',
    },
    contact: {
      label: 'final stage',
      socials: 'open',
      form: 'send a message',
      wave: 'RELEASE APPROVED',
    },
    bugs: {
      hint: 'catch the bugs',
      done: 'All bugs squashed. You would make a great QA.',
    },
    footer: {
      built: 'Built with Next.js, motion and too much coffee.',
    },
  },
};
