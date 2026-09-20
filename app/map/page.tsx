import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: '知识地图｜个人博客',
  description: '按主题、阶段和关系连接博客中的知识节点。',
};

const knowledge = [
  {
    id: 'ai', title: 'AI 能力', description: '从清晰提问到 Agent，把工具能力逐步变成个人工作方式。',
    nodes: ['提问与上下文', '检索与核验', 'AI 编程', '工作流设计', 'Agent', '能力杠杆'],
  },
  {
    id: 'research', title: '科研方法', description: '围绕问题、证据与复现建立研究闭环。',
    nodes: ['研究问题', '文献脉络', '实验设计', '数据记录', '研究写作', '同行反馈'],
  },
  {
    id: 'competition', title: '竞赛实践', description: '在有限周期内完成选题、协作、实现与表达。',
    nodes: ['方向筛选', '团队协作', '最小方案', '真实验证', '项目叙事', '答辩复盘'],
  },
  {
    id: 'product', title: '产品与成长', description: '把对人的理解、选择与长期积累连接到真实项目。',
    nodes: ['用户时刻', '价值判断', '最小交付', '反馈循环', '注意力', '长期选择'],
  },
];

export default function KnowledgeMapPage() {
  return (
    <main>
      <SiteHeader active="map" />
      <section className="page-intro">
        <p className="section-kicker">KNOWLEDGE MAP / 知识地图</p>
        <h1>按关系寻找内容，而不是在不断增长的文章列表里迷路。</h1>
        <p>节点会随着实践和写作持续补充；现在先展示这套博客最核心的四条知识脉络。</p>
      </section>

      <section className="content-section knowledge-layout">
        <nav className="knowledge-nav" aria-label="知识主题">
          {knowledge.map((group, index) => (
            <a href={`#${group.id}`} key={group.id}>{group.title}<span>{String(index + 1).padStart(2, '0')}</span></a>
          ))}
        </nav>
        <div className="knowledge-content">
          {knowledge.map((group) => (
            <section className="knowledge-group" id={group.id} key={group.id}>
              <h2>{group.title}</h2>
              <p>{group.description}</p>
              <div className="knowledge-node-grid">
                {group.nodes.map((node, index) => (
                  <a className="knowledge-node" href={index < 2 ? '/articles' : '/guides'} key={node}>
                    <strong>{node}</strong>
                    <span>{index < 2 ? '已有内容 · 查看相关记录' : '路线节点 · 持续补充'} <ArrowRight size={12} /></span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
