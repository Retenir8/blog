import type { Metadata } from 'next';
import 'katex/dist/katex.min.css';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { VisitProvider } from '@/components/visit-stats';
import { themeScript } from '@/lib/theme';

const siteUrl = process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Retenir 的博客｜经验、AI 与同行',
  description: '分享自己的经验，探索 AI 的边界，寻找同行的人。',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: siteUrl,
    title: 'Retenir 的博客｜经验、AI 与同行',
    description: '分享自己的经验，探索 AI 的边界，寻找同行的人。',
  },
  twitter: {
    card: 'summary',
    title: 'Retenir 的博客｜经验、AI 与同行',
    description: '分享自己的经验，探索 AI 的边界，寻找同行的人。',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <VisitProvider>
          <div className="sky-background" aria-hidden="true">
            <img
              className="earth-background"
              src="/earth-nasa.jpg"
              alt=""
              width="1024"
              height="991"
            />
          </div>
          {children}
          </VisitProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
