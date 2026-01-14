import ElasticIcon from '../ui/elastic.svg';
import PythonIcon from '../ui/python.svg';
import AllureIcon from '../ui/allure.svg';
import PydanticIcon from '../ui/pydantic.svg';
import PytestIcon from '../ui/pytest.svg';
import PlaywrightIcon from '../ui/pw.svg';
import Docker from '../ui/docker.svg';
import SeleniumIcon from '../ui/selenium.svg';

export const SKILLS = [
    {
        title: 'Python',
        icon: (className: string) => <PythonIcon className={className}/>,
        url: 'https://www.python.org/',
        defaultColor: '#f6e8d2',
        hoverColor: '#3776ab',
    },
    {
        title: 'Pytest',
        icon: (className: string) => <PytestIcon className={className}/>,
        url: 'https://docs.pytest.org/en/stable/',
        defaultColor: '#e5efe6',
        hoverColor: '#009fe3',
    },
    {
        title: 'Playwright',
        icon: (className: string) => <PlaywrightIcon className={className}/>,
        url: 'https://playwright.dev/',
        defaultColor: '#f6e8d2',
        hoverColor: '#2ead33',
    },
    {
        title: 'Selenium',
        icon: (className: string) => <SeleniumIcon className={className}/>,
        url: 'https://www.selenium.dev/',
        defaultColor: '#e5efe6',
        hoverColor: '#43b02a',
    },
    {
        title: 'Pydantic',
        icon: (className: string) => <PydanticIcon className={className}/>,
        url: 'https://docs.pydantic.dev/latest/',
        defaultColor: '#e5efe6',
        hoverColor: '#e92063',
    },
    {
        title: 'Docker',
        icon: (className: string) => <Docker className={className}/>,
        url: 'https://www.docker.com/',
        defaultColor: '#f6e8d2',
        hoverColor: '#2496ed',
    },
    {
        title: 'Allure',
        icon: (className: string) => <AllureIcon className={className}/>,
        url: 'https://allurereport.org/',
        defaultColor: '#e5efe6',
        hoverColor: '#ff9e2a',
    },
    {
        title: 'Elastic',
        icon: (className: string) => <ElasticIcon className={className}/>,
        url: 'https://www.elastic.co/',
        defaultColor: '#f6e8d2',
        hoverColor: '#fed10a',
    }
];
