import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: '关于我｜个人博客',
  description: '我是谁、正在做什么，以及这个博客为什么存在。',
};

export default function AboutPage() {
  return (
    <main>
      <SiteHeader active="about" />
      <section className="page-intro">
        <p className="section-kicker">ABOUT / 关于我</p>
        <h1>我是一名在软件与 AI 方向持续学习、实践和写作的学生。</h1>
        <p>这个博客不是履历展柜，而是我对所学、所做和所相信之事的持续校准。</p>
      </section>

      <section className="content-section about-layout">
        <div>
          <article className="about-block">
            <h2>我正在做什么</h2>
            <p>学习 AI 与软件开发，尝试把新能力放进科研、项目和个人工作流；同时记录那些真正改变判断的过程，而不只保存最后结果。</p>
          </article>
          <article className="about-block">
            <h2>我在意什么</h2>
            <ul>
              <li>一个问题是否真实，是否值得长期投入。</li>
              <li>技术是否帮助人获得更清晰的判断和更大的行动空间。</li>
              <li>项目是否经过验证，而不是只在表达上显得完整。</li>
              <li>成长是否留下可复用的方法，而不是短暂的忙碌感。</li>
            </ul>
          </article>
          <article className="about-block">
            <h2>为什么写这个博客</h2>
            <p>写作迫使模糊的想法暴露边界，也让过去的经验可以重新被检验。这里会持续收录路线、实践和思考，让每一次探索都能成为下一次行动的坐标。</p>
            <a className="inline-link" href="/articles">查看全部内容 <ArrowRight size={15} /></a>
          </article>
        </div>

        <aside className="position-panel">
          <p className="section-kicker">CURRENT POSITION</p>
          <dl>
            <dt>当前身份</dt>
            <dd>软件与 AI 方向学生</dd>
            <dt>正在探索</dt>
            <dd>AI Agent、科研效率、产品验证、OPC</dd>
            <dt>公开内容</dt>
            <dd>指南、项目复盘、长期思考与知识节点</dd>
            <dt>更新原则</dt>
            <dd>诚实记录、持续修正、避免夸张包装</dd>
          </dl>
        </aside>
      </section>
      <SiteFooter />
    </main>
  );
}
