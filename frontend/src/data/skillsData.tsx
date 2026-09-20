import ElasticIcon from '@/assets/elastic.svg';
import PythonIcon from '@/assets/python.svg';
import AllureIcon from '@/assets/allure.svg';
import PydanticIcon from '@/assets/pydantic.svg';
import PytestIcon from '@/assets/pytest.svg';
import PlaywrightIcon from '@/assets/pw.svg';
import Docker from '@/assets/docker.svg';
export type SkillGroup = 'lang' | 'test' | 'ops' | 'data' | 'perf';

export interface Skill {
    title: string;
    name: string;
    icon: (className: string) => React.ReactNode;
    url: string;
    defaultColor: string;
    hoverColor: string;
    since: number;
    group: SkillGroup;
}

/** Monogram badge for tools without a brand SVG. Inherits `color` from the wrapper. */
const letterIcon = (label: string) =>
    function LetterIcon(className: string) {
        return (
            <span
                className={`${className} grid place-items-center font-[family-name:var(--font-jetbrains)] text-[11px] font-bold leading-none tracking-wide`}
                style={{ background: 'currentColor' }}
                aria-hidden
            >
                <span style={{ color: '#05070d' }}>{label}</span>
            </span>
        );
    };

export const SKILLS: Skill[] = [
    {
        title: 'Python',
        name: 'Python',
        icon: (className: string) => <PythonIcon className={className} />,
        url: 'https://www.python.org/',
        defaultColor: '#f6e8d2',
        hoverColor: '#3776ab',
        since: 2023,
        group: 'lang',
    },
    {
        title: 'Pytest',
        name: 'Pytest',
        icon: (className: string) => <PytestIcon className={className} />,
        url: 'https://docs.pytest.org/en/stable/',
        defaultColor: '#e5efe6',
        hoverColor: '#009fe3',
        since: 2023,
        group: 'test',
    },
    {
        title: 'Playwright',
        name: 'Playwright',
        icon: (className: string) => <PlaywrightIcon className={className} />,
        url: 'https://playwright.dev/',
        defaultColor: '#f6e8d2',
        hoverColor: '#2ead33',
        since: 2023,
        group: 'test',
    },
    {
        title: 'Allure',
        name: 'Allure',
        icon: (className: string) => <AllureIcon className={className} />,
        url: 'https://allurereport.org/',
        defaultColor: '#e5efe6',
        hoverColor: '#ff9e2a',
        since: 2023,
        group: 'test',
    },
    {
        title: 'Pydantic',
        name: 'Pydantic',
        icon: (className: string) => <PydanticIcon className={className} />,
        url: 'https://docs.pydantic.dev/latest/',
        defaultColor: '#e5efe6',
        hoverColor: '#e92063',
        since: 2024,
        group: 'lang',
    },
    {
        title: 'Docker',
        name: 'Docker',
        icon: (className: string) => <Docker className={className} />,
        url: 'https://www.docker.com/',
        defaultColor: '#f6e8d2',
        hoverColor: '#2496ed',
        since: 2023,
        group: 'ops',
    },
    {
        title: 'Elastic',
        name: 'Elastic',
        icon: (className: string) => <ElasticIcon className={className} />,
        url: 'https://www.elastic.co/',
        defaultColor: '#f6e8d2',
        hoverColor: '#fed10a',
        since: 2024,
        group: 'data',
    },
    {
        title: 'GitLab CI',
        name: 'GitLab CI',
        icon: letterIcon('CI'),
        url: 'https://docs.gitlab.com/ee/ci/',
        defaultColor: '#e5efe6',
        hoverColor: '#fc6d26',
        since: 2023,
        group: 'ops',
    },
    {
        title: 'PostgreSQL',
        name: 'PostgreSQL',
        icon: letterIcon('PG'),
        url: 'https://www.postgresql.org/',
        defaultColor: '#f6e8d2',
        hoverColor: '#336791',
        since: 2023,
        group: 'data',
    },
    {
        title: 'TypeScript',
        name: 'TypeScript',
        icon: letterIcon('TS'),
        url: 'https://www.typescriptlang.org/',
        defaultColor: '#e5efe6',
        hoverColor: '#3178c6',
        since: 2024,
        group: 'lang',
    },
    {
        title: 'Locust',
        name: 'Locust',
        icon: letterIcon('LC'),
        url: 'https://locust.io/',
        defaultColor: '#f6e8d2',
        hoverColor: '#1f6f5c',
        since: 2024,
        group: 'perf',
    },
    {
        title: 'Postman',
        name: 'Postman',
        icon: letterIcon('PM'),
        url: 'https://www.postman.com/',
        defaultColor: '#f6e8d2',
        hoverColor: '#ff6c37',
        since: 2023,
        group: 'test',
    },
    {
        title: 'ClickHouse',
        name: 'ClickHouse',
        icon: letterIcon('CH'),
        url: 'https://clickhouse.com/',
        defaultColor: '#e5efe6',
        hoverColor: '#faff69',
        since: 2024,
        group: 'data',
    },
    {
        title: 'Kibana',
        name: 'Kibana',
        icon: letterIcon('KB'),
        url: 'https://www.elastic.co/kibana/',
        defaultColor: '#f6e8d2',
        hoverColor: '#e8488b',
        since: 2024,
        group: 'data',
    },
    {
        title: 'Grafana',
        name: 'Grafana',
        icon: letterIcon('GF'),
        url: 'https://grafana.com/',
        defaultColor: '#e5efe6',
        hoverColor: '#f46800',
        since: 2024,
        group: 'data',
    },
];
