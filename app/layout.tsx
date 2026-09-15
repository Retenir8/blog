import type { Metadata } from 'next';
import './globals.css';

const siteUrl = 'https://clear-thoughts-blog.merry-fern-7951.chatgpt.site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '个人博客',
  description: '关于技术、产品与持续成长的个人记录。',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: siteUrl,
    title: '在复杂世界里，做清晰的事。',
    description: '关于技术、产品与持续成长的个人记录。',
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1734,
        height: 907,
        alt: '在复杂世界里，做清晰的事。',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '在复杂世界里，做清晰的事。',
    description: '关于技术、产品与持续成长的个人记录。',
    images: [`${siteUrl}/og.png`],
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
