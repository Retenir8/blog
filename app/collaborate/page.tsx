import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: '合作｜个人博客',
  description: '可交流的方向、合作方式与联系说明。',
};

const directions = ['AI 与工作流', '科研与学习方法', '竞赛与项目复盘', '产品验证', 'OPC / 创业探索', '内容与经验交流'];

export default function CollaboratePage() {
  return (
    <main>
      <SiteHeader active="collaborate" />
      <section className="page-intro">
        <p className="section-kicker">COLLABORATE / 合作交流</p>
        <h1>如果你也在认真解决一个真实问题，我们可以从一次具体交流开始。</h1>
        <p>请尽量带上背景、目标和你已经尝试过的方案，这会让讨论更快抵达有价值的部分。</p>
      </section>

      <section className="content-section collaborate-layout">
        <div>
          <h2 className="content-title">可以聊什么</h2>
          <div className="collaboration-list">
            {directions.map((item, index) => <div key={item}>{String(index + 1).padStart(2, '0')} · {item}</div>)}
          </div>
        </div>
        <aside className="contact-panel">
          <p className="section-kicker">联系入口</p>
          <h2>先说明来意，再开始交流。</h2>
          <p>建议备注“博客 + 你的来意”，并用两三句话介绍问题背景。</p>
          <div className="contact-placeholder">
            暂未公开邮箱、微信或其他联系方式。<br />
            补充真实联系方式后，这里会成为正式联系入口。
          </div>
        </aside>
      </section>
      <SiteFooter />
    </main>
  );
}
