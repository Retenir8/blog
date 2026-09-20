import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { articleSummaries } from '@/lib/articles';

export const metadata: Metadata = {
  title: '思考｜个人博客',
  description: '关于 AI 时代、成长、产品、教育和生活的长期判断。',
};

export default function ThoughtsPage() {
  const pinned = articleSummaries.find((article) => article.slug === 'ai-as-collaborator');

  return (
    <main>
      <SiteHeader active="thoughts" />
      <section className="page-intro">
        <p className="section-kicker">LONG-TERM THINKING / 长期思考</p>
        <h1>记录尚未成为答案、但值得继续追问的问题。</h1>
        <p>不追逐每一个新观点，尽量把变化背后的结构、选择和代价写清楚。</p>
      </section>

      <section className="content-section">
        <div className="route-tabs" aria-label="思考主题">
          {['AI 时代', '成长', '教育', '产品', '创业', '生活'].map((item) => <span className="filter-chip" key={item}>{item}</span>)}
        </div>

        {pinned && (
          <a aria-label={`阅读置顶文章：${pinned.title}`} className="pinned-thought" href={`/articles/${pinned.slug}`}>
            <div>
              <p className="section-kicker">置顶思考</p>
              <span className="thought-index">AI / 协作 / 判断</span>
            </div>
            <div>
              <h2>{pinned.title}</h2>
              <p>{pinned.lead}</p>
              <span className="project-link">继续阅读 <ArrowRight size={15} /></span>
            </div>
          </a>
        )}

        <div className="thought-list">
          {articleSummaries.map((article) => (
            <a href={`/articles/${article.slug}`} key={article.slug}>
              <time dateTime={article.dateISO}>{article.date}</time>
              <strong>{article.title}</strong>
              <span>{article.type} · {article.readingTime}</span>
            </a>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
