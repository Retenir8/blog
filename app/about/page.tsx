import type { Metadata } from 'next';
import { BlogLayout, PageHeading } from '@/components/blog-layout';
export const metadata: Metadata = { title: '关于与合作｜Retenir 的博客' };
export default function AboutPage() {
  return (
    <BlogLayout active="about">
      <PageHeading title="关于我" description="做自己喜欢的事情，拥有独立的人格，才能不被时代裹挟。" />
      <div className="about-profile-mobile">
        <div className="avatar-placeholder">
          <img src="/retenir-avatar.jpg" alt="Retenir 的头像" width="72" height="72" />
        </div>
        <div>
          <h2>Retenir</h2>
          <p>这个世界太想听年少有为的故事了，但漫慢来，比快快</p>
        </div>
      </div>
      <section className="about-section">
        <p>
          做自己喜欢的事情，拥有独立的人格，才能不被时代裹挟。
        </p>
      </section>
      <section className="about-section">
        <h2>我在关注</h2>
        <div className="topic-inline">
          {['AI', '科研', '竞赛', '产品', '创业'].map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </div>
      </section>
      <section className="about-section" id="contact">
        <h2>合作与交流</h2>
        <p>
          如果你正在做有意思的事情，
          <br />
          欢迎来和我交流。
        </p>
        <div className="topic-inline">
          {['AI', '科研', '竞赛', '产品', '创业', '内容合作'].map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </div>
        <div className="contact-layout">
          <div className="contact-options">
            <a href="https://github.com/Retenir8" target="_blank" rel="noopener noreferrer">GitHub · Retenir8 ↗</a>
            <a href="mailto:wangxinsong5689@163.com">wangxinsong5689@163.com ↗</a>
          </div>
        </div>
      </section>
      <section className="about-section">
        <h2>影像来源</h2>
        <p className="asset-credit">
          地球背景来自{' '}
          <a
            href="https://svs.gsfc.nasa.gov/30002"
            target="_blank"
            rel="noreferrer"
          >
            NASA「蓝色弹珠」影像
          </a>
          。<br />
          影像鸣谢：NASA/NOAA/GSFC/Suomi NPP/VIIRS/Norman
          Kuring。仅作背景展示，不代表相关机构为本站背书。
        </p>
        <p className="asset-credit">
          白天云层：<a href="https://unsplash.com/photos/blue-sky-with-white-clouds-xtgONQzGgOE" target="_blank" rel="noreferrer">uriel / Unsplash</a>（Unsplash License）。
          <br />
          夜晚银河：<a href="https://www.eso.org/public/images/eso0932a/" target="_blank" rel="noreferrer">ESO/S. Brunier</a>，
          <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">CC BY 4.0</a>。
          图片经网页适配裁切及蓝色遮罩处理。
        </p>
      </section>
    </BlogLayout>
  );
}
