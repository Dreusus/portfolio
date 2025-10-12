import { cn } from '@/shared/utils/utils';
import ReactIcon from './../ui/react.svg';
import TypescriptIcon from './../ui/typescript.svg';
import NodeJsIcon from './../ui/node.svg';
import NextJsIcon from './../ui/nextjs.svg';
import ReactQuery from './../ui/react-query.svg';
import Tailwind from './../ui/tailwind.svg';
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
      <TypescriptIcon className={cn(commonClasses, 'text-secondary')} />
    ),
    url: 'https://www.typescriptlang.org/',
  },
  {
    title: 'React Query',
    icon: (commonClasses: string) => (
      <ReactQuery className={cn(commonClasses, 'text-primary')} />
    ),
    url: 'https://tanstack.com/query/latest/',
  },
  {
    title: 'Tailwind CSS',
    icon: (commonClasses: string) => (
      <Tailwind className={cn(commonClasses, 'text-secondary')} />
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
