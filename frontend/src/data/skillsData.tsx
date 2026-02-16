import ElasticIcon from '@/assets/elastic.svg';
import PythonIcon from '@/assets/python.svg';
import AllureIcon from '@/assets/allure.svg';
import PydanticIcon from '@/assets/pydantic.svg';
import PytestIcon from '@/assets/pytest.svg';
import PlaywrightIcon from '@/assets/pw.svg';
import Docker from '@/assets/docker.svg';
import SeleniumIcon from '@/assets/selenium.svg';

export const SKILLS = [
    {
        title: 'Python',
        icon: (className: string) => <PythonIcon className={className}/>,
        url: 'https://www.python.org/',
        defaultColor: '#d4a73a',
        hoverColor: '#3776ab',
    },
    {
        title: 'Pytest',
        icon: (className: string) => <PytestIcon className={className}/>,
        url: 'https://docs.pytest.org/en/stable/',
        defaultColor: '#c9a227',
        hoverColor: '#009fe3',
    },
    {
        title: 'Playwright',
        icon: (className: string) => <PlaywrightIcon className={className}/>,
        url: 'https://playwright.dev/',
        defaultColor: '#d4a73a',
        hoverColor: '#2ead33',
    },
    {
        title: 'Selenium',
        icon: (className: string) => <SeleniumIcon className={className}/>,
        url: 'https://www.selenium.dev/',
        defaultColor: '#c9a227',
        hoverColor: '#43b02a',
    },
    {
        title: 'Pydantic',
        icon: (className: string) => <PydanticIcon className={className}/>,
        url: 'https://docs.pydantic.dev/latest/',
        defaultColor: '#d4a73a',
        hoverColor: '#e92063',
    },
    {
        title: 'Docker',
        icon: (className: string) => <Docker className={className}/>,
        url: 'https://www.docker.com/',
        defaultColor: '#c9a227',
        hoverColor: '#2496ed',
    },
    {
        title: 'Allure',
        icon: (className: string) => <AllureIcon className={className}/>,
        url: 'https://allurereport.org/',
        defaultColor: '#d4a73a',
        hoverColor: '#ff9e2a',
    },
    {
        title: 'Elastic',
        icon: (className: string) => <ElasticIcon className={className}/>,
        url: 'https://www.elastic.co/',
        defaultColor: '#c9a227',
        hoverColor: '#fed10a',
    }
];
