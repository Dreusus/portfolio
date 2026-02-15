import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { RemoveHashOnReload } from '@/components/RemoveHashOnReload';
import Script from 'next/script';
import { LanguageProvider } from '@/data/i18n';
import { ChatWidget } from '@/components/ChatWidget';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Andrey Polyakov | Full Stack QA Engineer',
    template: '%s | Andrey Polyakov',
  },
  description: 'Portfolio of Andrey Polyakov - Full Stack QA Engineer specializing in test automation with Python, Playwright, and Pytest. Building reliable autotests and ensuring product quality.',
  keywords: ['QA Engineer', 'Test Automation', 'Python', 'Playwright', 'Pytest', 'Selenium', 'Full Stack QA'],
  authors: [{ name: 'Andrey Polyakov' }],
  creator: 'Andrey Polyakov',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://apolyakov.tech',
    siteName: 'Andrey Polyakov Portfolio',
    title: 'Andrey Polyakov | Full Stack QA Engineer',
    description: 'Portfolio of Andrey Polyakov - Full Stack QA Engineer specializing in test automation',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Andrey Polyakov Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andrey Polyakov | Full Stack QA Engineer',
    description: 'Portfolio of Andrey Polyakov - Full Stack QA Engineer',
  },
  robots: {
    index: true,
    follow: true,
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className='scroll-smooth' lang='en'>
      {/* Google Analytics */}
      {GA_MEASUREMENT_ID && (
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
      )}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <RemoveHashOnReload />
          <div className='flex flex-1 flex-col items-center min-h-screen font-[family-name:var(--font-geist-sans)]'>
            {children}
          </div>
          <ChatWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
