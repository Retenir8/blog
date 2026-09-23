import type { Metadata } from 'next';
import 'katex/dist/katex.min.css';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { themeScript } from '@/lib/theme';

const siteUrl = process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '个人博客｜记录与思考',
  description: '关于 AI，关于选择，关于正在经历的世界。',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: siteUrl,
    title: '我想记录一些真正值得留下的东西。',
    description: '关于 AI，关于选择，关于正在经历的世界。',
  },
  twitter: {
    card: 'summary',
    title: '我想记录一些真正值得留下的东西。',
    description: '关于 AI，关于选择，关于正在经历的世界。',
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
        </ThemeProvider>
      </body>
    </html>
  );
}
