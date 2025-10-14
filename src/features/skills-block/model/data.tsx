import { cn } from '@/shared/utils/utils';
import ReactIcon from './../ui/react.svg';
import PythonIcon from '../ui/python.svg';
import NodeJsIcon from './../ui/node.svg';
import NextJsIcon from './../ui/nextjs.svg';
import PytestIcon from '../ui/pytest.svg';
import PlaywrightIcon from '../ui/pw.svg';
import Docker from './../ui/docker.svg';
import Strapi from './../ui/strapi.svg';

export const SKILLS = [
  {
    title: 'React',
    icon: (commonClasses: string) => (
      <ReactIcon className={cn(commonClasses, 'text-primary')} />
    ),
    url: 'https://react.dev/',
  },
  {
    title: 'TypeScript',
    icon: (commonClasses: string) => (
      <PythonIcon className={cn(commonClasses, 'text-secondary')} />
    ),
    url: 'https://www.python.org/',
  },
  {
    title: 'React Query',
    icon: (commonClasses: string) => (
      <PytestIcon className={cn(commonClasses, 'text-primary')} />
    ),
    url: 'https://docs.pytest.org/en/stable/',
  },
  {
    title: 'Tailwind CSS',
    icon: (commonClasses: string) => (
      <PlaywrightIcon className={cn(commonClasses, 'text-secondary')} />
    ),
    url: 'https://tailwindcss.com/',
  },
  {
    title: 'Node.js',
    icon: (commonClasses: string) => (
      <NodeJsIcon className={cn(commonClasses, 'text-secondary')} />
    ),
    url: 'https://nodejs.org/',
  },
  {
    title: 'Next.js',
    icon: (commonClasses: string) => (
      <NextJsIcon className={cn(commonClasses, 'text-primary')} />
    ),
    url: 'https://nextjs.org/',
  },
  {
    title: 'Docker',
    icon: (commonClasses: string) => (
      <Docker className={cn(commonClasses, 'text-secondary')} />
    ),
    url: 'https://www.docker.com/',
  },
  {
    title: 'Strapi',
    icon: (commonClasses: string) => (
      <Strapi className={cn(commonClasses, 'text-primary')} />
    ),
    url: 'https://strapi.io/',
  },
];
