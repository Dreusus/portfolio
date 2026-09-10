import { ProjectCard } from '@/components';

// The app serves project shots from /images; previews are self-contained, so
// the screen art is inlined instead.
const SHOT =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="390" height="844" viewBox="0 0 390 844">
      <rect width="390" height="844" fill="#f8faf6"/>
      <rect x="0" y="0" width="390" height="120" fill="#e5efe6"/>
      <circle cx="60" cy="60" r="26" fill="#93b18b"/>
      <rect x="100" y="46" width="150" height="12" rx="6" fill="#93b18b"/>
      <rect x="100" y="68" width="96" height="10" rx="5" fill="#c9d9c5"/>
      <rect x="24" y="160" width="342" height="180" rx="18" fill="#ffffff" stroke="#e2e8e0"/>
      <rect x="24" y="368" width="342" height="180" rx="18" fill="#f6e8d2"/>
      <rect x="24" y="576" width="342" height="180" rx="18" fill="#ffffff" stroke="#e2e8e0"/>
    </svg>`
  );

export const Default = () => (
  <ProjectCard
    title='QA Desktop'
    description='Test-run dashboard for distributed QA teams'
    imageUrl={SHOT}
    url='#'
  />
);

export const InProgress = () => (
  <ProjectCard
    title='API Template'
    description='Pytest + httpx starter for API suites'
    imageUrl={SHOT}
    url='#'
    inProgress
    inProgressLabel='Soon'
  />
);

export const Row = () => (
  <div className='flex gap-4'>
    <ProjectCard
      title='QA Desktop'
      description='Test-run dashboard for distributed QA teams'
      imageUrl={SHOT}
      url='#'
    />
    <ProjectCard
      title='Playwright Template'
      description='E2E starter with fixtures and Allure reporting'
      imageUrl={SHOT}
      url='#'
      inProgress
      inProgressLabel='Soon'
    />
  </div>
);
