import { ArrowRight } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { articleSummaries } from '@/lib/articles';

const needs = [
  ['我想掌握 AI 技能', '从工具使用到个人工作流', '查看路线', '/guides#ai'],
  ['我准备开始做科研', '从选题、检索到实验与写作', '查看路线', '/guides#research'],
  ['我准备参加竞赛', '从组队、项目设计到答辩', '查看路线', '/guides#competition'],
  ['我想做项目或产品', '从想法、验证到真实交付', '查看实践', '/practice'],
  ['我对未来有些迷茫', '关于选择、成长与长期投入', '阅读思考', '/thoughts'],
  ['我想看看你的经历', '项目、学习与探索中的真实过程', '了解更多', '/about'],
];

const coordinates = [
  { name: 'AI', progress: 82, status: '深入中', href: '/guides#ai' },
  { name: '科研', progress: 62, status: '实践中', href: '/guides#research' },
  { name: '竞赛', progress: 71, status: '持续复盘', href: '/guides#competition' },
  { name: '产品', progress: 54, status: '探索中', href: '/practice' },
  { name: 'OPC / 创业', progress: 38, status: '试验中', href: '/thoughts' },
  { name: '人生与成长', progress: 78, status: '长期记录', href: '/thoughts' },
];

const updates = [
  ['2026.09', '研究 Agent 在科研场景中的使用方式'],
  ['2026.09', '整理项目从想法到上线的完整复盘'],
  ['2026.08', '重新思考个人工作流与长期能力杠杆'],
];

export default function Home() {
  return (
    <main className="site-main">
      <SiteHeader active="home" />

      <section className="home-hero page-shell">
        <div className="coordinate-label" aria-hidden="true">
          <span>当前位置</span>
          <strong>起点 / 2026</strong>
        </div>
        <div className="home-hero-copy">
          <p className="section-kicker">探索、实践与长期思考</p>
          <h1>我在探索 AI 时代真正值得投入的事情。</h1>
          <p>
            这里记录 AI 技能、科研竞赛、项目实践、产品与创业，
            也记录我对成长、选择与时代变化的长期思考。
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#start">
              从哪里开始 <ArrowRight size={16} />
            </a>
            <a className="secondary-button" href="#latest">
              查看最近更新
            </a>
          </div>
        </div>
        <aside className="focus-panel" aria-label="当前关注">
          <span>当前关注</span>
          <p>AI Agent · 科研效率 · OPC · 产品验证</p>
          <i aria-hidden="true" />
          <small>持续更新于 2026.09</small>
        </aside>
      </section>

      <section className="page-section page-shell" id="start">
        <div className="section-heading">
          <div>
            <p className="section-kicker">问题导航</p>
            <h2>你现在最想解决什么问题？</h2>
          </div>
          <p>不必从分类开始，先从你真正关心的问题进入。</p>
        </div>
        <div className="need-grid">
          {needs.map(([title, description, action, href], index) => (
            <a className="route-card" href={href} key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <strong>{action} <ArrowRight size={15} /></strong>
            </a>
          ))}
        </div>
      </section>

      <section className="page-section page-shell" id="latest">
        <div className="section-heading compact-heading">
          <div>
            <p className="section-kicker">精选内容</p>
            <h2>最近值得读</h2>
          </div>
          <a className="inline-link" href="/articles">
            查看全部内容 <ArrowRight size={15} />
          </a>
        </div>
        <div className="reading-index">
          {articleSummaries.slice(0, 5).map((article, index) => (
            <a href={`/articles/${article.slug}`} key={article.slug}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
              </div>
              <small>{article.tag} · {article.readingTime}</small>
              <ArrowRight size={16} />
            </a>
          ))}
        </div>
      </section>

      <section className="page-section page-shell exploration-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">持续探索</p>
            <h2>我的探索坐标</h2>
          </div>
          <p>这些不是能力评分，而是我当前投入注意力的相对位置。</p>
        </div>
        <div className="coordinate-grid">
          {coordinates.map((item) => (
            <a href={item.href} key={item.name}>
              <div className="coordinate-meta">
                <strong>{item.name}</strong>
                <span>{item.status}</span>
              </div>
              <div className="progress-track" aria-label={`${item.name}：${item.status}`}>
                <i style={{ width: `${item.progress}%` }} />
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="page-section page-shell activity-section">
        <div className="section-heading compact-heading">
          <div>
            <p className="section-kicker">当前动态</p>
            <h2>最近在做什么</h2>
          </div>
          <a className="inline-link" href="/about">
            了解我的位置 <ArrowRight size={15} />
          </a>
        </div>
        <div className="activity-list">
          {updates.map(([date, content]) => (
            <div key={content}>
              <time>{date}</time>
              <i aria-hidden="true" />
              <p>{content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="collaboration-band page-shell">
        <div>
          <p className="section-kicker">一起做有意思的事情</p>
          <h2>如果你也在认真解决问题，我们可以聊聊。</h2>
          <p>AI / 科研 / 竞赛 / 产品 / OPC / 内容合作</p>
        </div>
        <a className="primary-button" href="/collaborate">
          查看合作方式 <ArrowRight size={16} />
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}
