import ElasticIcon from '@/assets/elastic.svg';
import PythonIcon from '@/assets/python.svg';
import AllureIcon from '@/assets/allure.svg';
import PydanticIcon from '@/assets/pydantic.svg';
import PytestIcon from '@/assets/pytest.svg';
import PlaywrightIcon from '@/assets/pw.svg';
import Docker from '@/assets/docker.svg';
import SeleniumIcon from '@/assets/selenium.svg';
import { Circle } from 'lucide-react';

export type SkillGroup = 'lang' | 'test' | 'ops' | 'data' | 'perf';

export interface Skill {
    title: string;
    name: string;
    icon: (className: string) => React.ReactNode;
    url: string;
    defaultColor: string;
    hoverColor: string;
    level: number;
    group: SkillGroup;
}

const fallbackIcon = (className: string) => <Circle className={className} />;

export const SKILLS: Skill[] = [
    {
        title: 'Python',
        name: 'Python',
        icon: (className: string) => <PythonIcon className={className} />,
        url: 'https://www.python.org/',
        defaultColor: '#f6e8d2',
        hoverColor: '#3776ab',
        level: 95,
        group: 'lang',
    },
    {
        title: 'Pytest',
        name: 'Pytest',
        icon: (className: string) => <PytestIcon className={className} />,
        url: 'https://docs.pytest.org/en/stable/',
        defaultColor: '#e5efe6',
        hoverColor: '#009fe3',
        level: 95,
        group: 'test',
    },
    {
        title: 'Playwright',
        name: 'Playwright',
        icon: (className: string) => <PlaywrightIcon className={className} />,
        url: 'https://playwright.dev/',
        defaultColor: '#f6e8d2',
        hoverColor: '#2ead33',
        level: 92,
        group: 'test',
    },
    {
        title: 'Selenium',
        name: 'Selenium',
        icon: (className: string) => <SeleniumIcon className={className} />,
        url: 'https://www.selenium.dev/',
        defaultColor: '#e5efe6',
        hoverColor: '#43b02a',
        level: 85,
        group: 'test',
    },
    {
        title: 'Allure',
        name: 'Allure',
        icon: (className: string) => <AllureIcon className={className} />,
        url: 'https://allurereport.org/',
        defaultColor: '#e5efe6',
        hoverColor: '#ff9e2a',
        level: 88,
        group: 'test',
    },
    {
        title: 'Pydantic',
        name: 'Pydantic',
        icon: (className: string) => <PydanticIcon className={className} />,
        url: 'https://docs.pydantic.dev/latest/',
        defaultColor: '#e5efe6',
        hoverColor: '#e92063',
        level: 80,
        group: 'lang',
    },
    {
        title: 'Docker',
        name: 'Docker',
        icon: (className: string) => <Docker className={className} />,
        url: 'https://www.docker.com/',
        defaultColor: '#f6e8d2',
        hoverColor: '#2496ed',
        level: 80,
        group: 'ops',
    },
    {
        title: 'Elastic',
        name: 'Elastic',
        icon: (className: string) => <ElasticIcon className={className} />,
        url: 'https://www.elastic.co/',
        defaultColor: '#f6e8d2',
        hoverColor: '#fed10a',
        level: 70,
        group: 'data',
    },
    {
        title: 'GitLab CI',
        name: 'GitLab CI',
        icon: fallbackIcon,
        url: 'https://docs.gitlab.com/ee/ci/',
        defaultColor: '#e5efe6',
        hoverColor: '#fc6d26',
        level: 85,
        group: 'ops',
    },
    {
        title: 'PostgreSQL',
        name: 'PostgreSQL',
        icon: fallbackIcon,
        url: 'https://www.postgresql.org/',
        defaultColor: '#f6e8d2',
        hoverColor: '#336791',
        level: 75,
        group: 'data',
    },
    {
        title: 'TypeScript',
        name: 'TypeScript',
        icon: fallbackIcon,
        url: 'https://www.typescriptlang.org/',
        defaultColor: '#e5efe6',
        hoverColor: '#3178c6',
        level: 70,
        group: 'lang',
    },
    {
        title: 'Locust',
        name: 'Locust',
        icon: fallbackIcon,
        url: 'https://locust.io/',
        defaultColor: '#f6e8d2',
        hoverColor: '#1f6f5c',
        level: 78,
        group: 'perf',
    },
    {
        title: 'JMeter',
        name: 'JMeter',
        icon: fallbackIcon,
        url: 'https://jmeter.apache.org/',
        defaultColor: '#e5efe6',
        hoverColor: '#d22128',
        level: 72,
        group: 'perf',
    },
    {
        title: 'Postman',
        name: 'Postman',
        icon: fallbackIcon,
        url: 'https://www.postman.com/',
        defaultColor: '#f6e8d2',
        hoverColor: '#ff6c37',
        level: 90,
        group: 'test',
    },
];
