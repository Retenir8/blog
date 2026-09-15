import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: '关于｜个人博客',
  description: '关于这位写作者，以及这个博客为何存在。',
};

const topics = ['技术与人', '产品判断', '思考方法', '数字生活'];

export default function AboutPage() {
  return (
    <main>
      <div className="page-nebula page-nebula-about" aria-hidden="true" />
      <SiteHeader active="about" />

      <section className="inner-hero about-hero">
        <p className="section-kicker">ABOUT</p>
        <h1>你好，我在这里记录<br />值得慢下来思考的事。</h1>
        <p>
          这是一个关于技术、产品与日常观察的个人空间。
          比起追逐每一个新消息，我更想理解变化背后的原因。
        </p>
      </section>

      <section className="content-section about-page-grid">
        <article className="glass-card profile-card">
          <p className="section-kicker">WHY I WRITE</p>
          <h2>写作，让模糊的判断变得可见。</h2>
          <div className="prose-copy">
            <p>
              很多想法在脑海里显得完整，直到它们需要被写下来。写作迫使我确认概念的边界、证据的重量，以及自己真正相信什么。
            </p>
            <p>
              这里的文章来自正在经历的项目、读过的书、使用过的工具和生活里的微小观察。它们不是最终答案，而是持续更新的坐标。
            </p>
          </div>
        </article>

        <aside className="glass-card topics-card">
          <p className="section-kicker">CURRENTLY EXPLORING</p>
          <h2>持续关注</h2>
          <ul>
            {topics.map((topic, index) => (
              <li key={topic}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {topic}
              </li>
            ))}
          </ul>
          <a href="/articles">
            浏览全部文章 <ArrowRight size={16} />
          </a>
        </aside>
      </section>

      <SiteFooter />
    </main>
  );
}
