import { Project } from '@/shared/types';

export const PROJECTS: Project[] = [
  {
    title: 'PackPal',
    description: 'Travel App',
    imageUrl: '/images/packpal-project.png',
    url: 'https://packpal.me/',
  },
  {
    title: 'QrStat',
    description: 'Feedback with QR-code',
    imageUrl: '/images/qrstat-project.png',
    url: 'https://github.com/qrstat',
    inProgress: true,
  },
  {
    title: 'mini-chat',
    description: 'Backend chat App',
    imageUrl: '/images/mini-chat-project.png',
    url: 'https://github.com/meshulga/mini-chat',
    inProgress: true,
  },
];
