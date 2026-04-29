export const en = {
  name: {
    first: 'Andrey',
    last: 'Polyakov',
  },

  tagline: 'Bug Hunter',
  location: 'Moscow, Russia',
  available: 'Available for hire',

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
    stats: 'GitHub Activity',
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
        id: 'flaky-detector',
        title: 'Flaky Test Detector',
        tag: 'OSS · 240★',
        description: 'OSS · 240★',
        desc: 'CLI that mines CI history to flag unstable tests before they erode trust in your pipeline.',
        stack: ['Go', 'GitHub API'],
        status: 'Live',
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
        company: 'Легко учиться',
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
    label_contributions: 'Contributions / yr',
    label_repos: 'Public repos',
    label_stars: 'Stars earned',
    label_bugs: 'Bugs hunted',
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
};
