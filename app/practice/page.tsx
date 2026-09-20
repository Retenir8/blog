import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: '实践｜个人博客',
  description: '项目、产品与个人工作流中的真实实践和复盘。',
};

const projects = [
  {
    type: '产品',
    status: '已复盘',
    title: '小产品从想法到上线',
    description: '围绕一个具体使用时刻完成取舍、验证与交付，记录哪些判断真正影响了结果。',
    role: '产品判断 / 验证 / 实现',
    result: '完成一次完整复盘',
    href: '/articles/small-product-review',
  },
  {
    type: 'AI 实践',
    status: '持续迭代',
    title: 'AI 协作工作流',
    description: '把上下文、判断标准和复盘机制放进协作流程，让 AI 成为能被检验的合作者。',
    role: '问题定义 / 协作设计',
    result: '形成可复用的方法',
    href: '/articles/ai-as-collaborator',
  },
  {
    type: '个人系统',
    status: '使用中',
    title: '长期数字笔记系统',
    description: '减少无目的收集，用问题和连接组织笔记，让内容在需要时真正参与思考。',
    role: '方法设计 / 持续维护',
    result: '保持长期可用',
    href: '/articles/digital-notes',
  },
  {
    type: '方法实验',
    status: '持续验证',
    title: '复杂问题拆解方法',
    description: '从未来二十四小时内最值得回答的问题开始，把模糊焦虑变成可执行的下一步。',
    role: '问题拆解 / 行动验证',
    result: '沉淀决策框架',
    href: '/articles/clear-next-step',
  },
];

export default function PracticePage() {
  return (
    <main>
      <SiteHeader active="practice" />
      <section className="page-intro">
        <p className="section-kicker">FIELD NOTES / 真实实践</p>
        <h1>比结论更重要的，是一个想法如何经过取舍、验证并成为真实结果。</h1>
        <p>这里保留项目角色、过程和复盘，不把尚未发生的成绩写成漂亮数字。</p>
      </section>

      <section className="content-section">
        <div className="filter-row" aria-label="实践分类">
          {['全部', '项目', '科研', '竞赛', '产品', 'OPC'].map((item) => (
            <span className="filter-chip" key={item}>{item}</span>
          ))}
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <a className="project-card" href={project.href} key={project.title}>
              <div className="project-card-header">
                <span className="section-kicker">{String(index + 1).padStart(2, '0')} · {project.type}</span>
                <span className="status-badge">{project.status}</span>
              </div>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="project-meta">
                <span>{project.role}</span>
                <span>{project.result}</span>
              </div>
              <span className="project-link">查看复盘 <ArrowRight size={15} /></span>
            </a>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
