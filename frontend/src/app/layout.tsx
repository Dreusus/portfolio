import type { Metadata } from 'next';
import { Manrope, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { RemoveHashOnReload } from '@/components/RemoveHashOnReload';
import Script from 'next/script';
import { LanguageProvider } from '@/data/i18n';
import { ChatWidget } from '@/components/ChatWidget';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

const mainSans = Manrope({
  variable: '--font-main-sans',
  subsets: ['latin'],
});

const mainMono = IBM_Plex_Mono({
  variable: '--font-main-mono',
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Andrey',
  description: 'Portfolio created by Andrey',
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
    title: 'Andrey',
    description: 'Portfolio created by Andrey',
    siteName: 'portfolio Andrey',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasGa = Boolean(GA_MEASUREMENT_ID);

  return (
    <html className='scroll-smooth' lang='en'>
      <head>
        {hasGa && (
          <>
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
          </>
        )}
      </head>
      <body className={`${mainSans.variable} ${mainMono.variable}`}>
        <LanguageProvider>
          <RemoveHashOnReload />
          <div className='flex min-h-screen flex-1 flex-col items-center font-sans'>
            {children}
          </div>
          <ChatWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
