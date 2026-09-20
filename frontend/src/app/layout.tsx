import type { Metadata } from 'next';
import { IBM_Plex_Sans, JetBrains_Mono, Unbounded } from 'next/font/google';
import './globals.css';
import { RemoveHashOnReload } from '@/components/RemoveHashOnReload';
import Script from 'next/script';
import { LanguageProvider } from '@/data/i18n';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

const unbounded = Unbounded({
  variable: '--font-unbounded',
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '700', '800'],
});

const plex = IBM_Plex_Sans({
  variable: '--font-plex',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
});

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Andrey Polyakov — QA Mission Control',
  description: 'Full Stack QA Engineer. Test automation that makes releases boring.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'icon',
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    title: 'Andrey Polyakov — QA Mission Control',
    description: 'Full Stack QA Engineer. Test automation that makes releases boring.',
    siteName: 'Andrey Polyakov',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${unbounded.variable} ${plex.variable} ${jetbrains.variable}`}>
      <head>
        <Script
          strategy='afterInteractive'
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id='gtag-init'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
      </head>
      <body className='antialiased font-[family-name:var(--font-plex)]'>
        <LanguageProvider>
          <RemoveHashOnReload />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
