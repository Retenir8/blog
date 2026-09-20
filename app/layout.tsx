import type { Metadata } from 'next';
import 'katex/dist/katex.min.css';
import './globals.css';

const siteUrl = 'https://blog.retenir.chatgpt.site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '个人博客｜AI、实践与长期思考',
  description: '关于 AI 技能、科研竞赛、项目实践、产品与长期成长的个人知识站。',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: siteUrl,
    title: '我在探索 AI 时代真正值得投入的事情。',
    description: '关于 AI 技能、科研竞赛、项目实践、产品与长期成长的个人知识站。',
  },
  twitter: {
    card: 'summary',
    title: '我在探索 AI 时代真正值得投入的事情。',
    description: '关于 AI 技能、科研竞赛、项目实践、产品与长期成长的个人知识站。',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body>{children}</body>
    </html>
  );
}
