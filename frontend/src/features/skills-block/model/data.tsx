import {cn} from '../../../shared/utils/utils';
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
        icon: (commonClasses: string) => (
            <PythonIcon className={cn(commonClasses, 'text-secondary')}/>
        ),
        url: 'https://www.python.org/',
    },
    {
        title: 'Pytest',
        icon: (commonClasses: string) => (
            <PytestIcon className={cn(commonClasses, 'text-primary')}/>
        ),
        url: 'https://docs.pytest.org/en/stable/',
    },
    {
        title: 'Playwright',
        icon: (commonClasses: string) => (
            <PlaywrightIcon className={cn(commonClasses, 'text-secondary')}/>
        ),
        url: 'https://playwright.dev/',
    },
    {
        title: 'Selenium',
        icon: (commonClasses: string) => (
            <SeleniumIcon className={cn(commonClasses, 'text-primary')}/>
        ),
        url: 'https://www.selenium.dev/',

    },

    {
        title: 'Pydantic',
        icon: (commonClasses: string) => (
            <PydanticIcon className={cn(commonClasses, 'text-primary')}/>
        ),
        url: 'https://docs.pydantic.dev/latest/',
    },
    {
        title: 'Docker',
        icon: (commonClasses: string) => (
            <Docker className={cn(commonClasses, 'text-secondary')}/>
        ),
        url: 'https://www.docker.com/',
    },
    {
        title: 'Allure',
        icon: (commonClasses: string) => (
            <AllureIcon className={cn(commonClasses, 'text-primary')}/>
        ),
        url: 'https://allurereport.org/',
    },
    {
        title: 'Elastic',
        icon: (commonClasses: string) => (
            <ElasticIcon className={cn(commonClasses, 'text-secondary')}/>
        ),
        url: 'https://www.elastic.co/',
    }
];
