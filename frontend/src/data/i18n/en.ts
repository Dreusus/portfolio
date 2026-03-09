export const en = {
  name: {
    first: 'Andrey',
    last: 'Polyakov',
  },

  nav: {
    about: 'About',
    projects: 'Projects',
    skills: 'Skills',
    experience: 'Experience',
    whyChooseMe: 'Approach',
    contact: 'Contact',
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
    items: {
      qaDesktop: {
        title: 'QA Desktop',
        description: 'Team links hub',
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
    title: 'Work Approach',
    subtitle: 'Focus on execution: turning QA from manual chaos into a stable and predictable release pipeline.',
    workflowTitle: 'Process',
    workflow: {
      audit: {
        title: 'Risk & Coverage Audit',
        description: 'I review critical user journeys, API chains, and weak spots in the current regression.',
      },
      strategy: {
        title: 'Automation Strategy',
        description: 'I define priorities, stack, quality gates, and stability metrics for the team.',
      },
      implementation: {
        title: 'CI/CD Integration',
        description: 'I implement and maintain automated tests, reporting, and flaky-test control.',
      },
      release: {
        title: 'Release & Team Handoff',
        description: 'I align QA with dev/DevOps workflows and transfer working practices to the team.',
      },
    },
    outcomesTitle: 'What The Team Gets',
    outcomes: {
      speed: {
        title: 'Faster Feedback',
        description: 'Shorter verification cycles and less manual routine on each change.',
      },
      stability: {
        title: 'Stable Regression',
        description: 'Predictable runs without random failures and noisy false alarms.',
      },
      visibility: {
        title: 'Quality Visibility',
        description: 'Clear reports and metrics for release decisions and prioritization.',
      },
      ownership: {
        title: 'Sustainable Process',
        description: 'Not just tests, but a repeatable QA operating model inside the product team.',
      },
    },
  },

  // Contact
  contact: {
    title: 'Contact Me',
    subtitle: 'If you have a QA or automation task, message me in any channel or send details through the form.',
    channels: {
      telegram: 'Telegram',
      linkedin: 'LinkedIn',
      github: 'GitHub',
    },
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
        submitFailed: 'Failed to send message. Please try again.',
        network: 'Network error. Please try again later.',
      },
    },
  },

  // Footer
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
