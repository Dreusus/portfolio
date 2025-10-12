import { ContentNav } from '@/shared/types';
import { BlockIds } from '../types/blocks';

export const CONTENT_NAVIGATION_MENU: ContentNav[] = [
  { title: 'About', link: BlockIds.AboutMe },
  { title: 'Projects', link: BlockIds.Projects },
  { title: 'Skills', link: BlockIds.Skills },
  { title: 'Experience', link: BlockIds.Experience },
  { title: 'Why Choose Me', link: BlockIds.WhyChooseMe },
  { title: 'Contact', link: BlockIds.Contact },
];

export const MOBILE_CONTENT_NAVIGATION_MENU: string[] = [
  'Projects',
  'Experience',
  'Contact',
];
