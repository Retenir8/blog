import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: '指南｜个人博客',
  description: '围绕 AI、科研、竞赛和成长选择整理的阶段路线与行动入口。',
};

const routes = [
  {
    id: 'ai',
    title: 'AI 技能路线',
    description: '不以追逐工具为目标，而是逐步建立检索、编程、工作流与 Agent 能力。',
    steps: [
      ['学会提出清晰问题', '定义目标、边界与判断标准，让一次对话从“给答案”转向真正协作。'],
      ['用 AI 检索与整理', '把分散信息变成有来源、可核验、可继续使用的结构。'],
      ['AI 编程', '从读懂代码与拆任务开始，让模型参与实现、检查和迭代。'],
      ['建立工作流', '固定高频步骤、保留关键判断，形成可复用的协作链路。'],
      ['Agent 自动执行', '让工具在清晰权限和验收标准下完成多步任务。'],
      ['个人能力杠杆', '把节省的时间重新投入判断、创造与长期积累。'],
    ],
  },
  {
    id: 'research',
    title: '科研路线',
    description: '从真实问题出发，建立可以被验证、记录和复现的研究过程。',
    steps: [
      ['定义研究问题', '明确对象、变量与约束，把宽泛兴趣收敛成可回答的问题。'],
      ['文献检索与脉络', '先找到代表性工作，再理解分歧、证据与尚未解决的空白。'],
      ['实验与记录', '预先写下假设、指标和失败条件，确保结果能够复盘。'],
      ['写作与评审', '用问题—方法—证据—结论组织表达，并主动寻找反例。'],
    ],
  },
  {
    id: 'competition',
    title: '竞赛路线',
    description: '把竞赛当作一次有限周期的真实项目，而不是堆叠功能和包装。',
    steps: [
      ['选题与组队', '用问题价值、资源匹配和协作方式筛选值得投入的方向。'],
      ['项目设计', '确定目标用户、关键场景、最小方案与验证指标。'],
      ['实现与验证', '优先打通核心链路，用真实反馈而不是想象推进迭代。'],
      ['表达与答辩', '围绕问题、选择、证据和结果讲清楚项目为何成立。'],
    ],
  },
  {
    id: 'growth',
    title: '成长与选择',
    description: '在信息很多、路径不确定时，用小步验证替代一次性找到标准答案。',
    steps: [
      ['识别当前方向', '区分外部期待与真实兴趣，确认眼下最重要的约束。'],
      ['做一次小验证', '用一周到一个月完成可观察的尝试，而不是长期空想。'],
      ['记录反馈', '保留过程、情绪和结果，找到投入与成长之间的真实关系。'],
      ['长期迭代', '定期复盘坐标，允许路线更新，但不轻易放弃积累。'],
    ],
  },
];

export default function GuidesPage() {
  return (
    <main>
      <SiteHeader active="guides" />
      <section className="page-intro">
        <p className="section-kicker">GUIDED PATHS / 路线指南</p>
        <h1>把走过、验证过和踩过坑的东西，整理成可以继续行动的路线。</h1>
        <p>每条路线只提供阶段、判断和下一步，不承诺一份适合所有人的标准答案。</p>
      </section>

      <div className="content-section">
        <nav className="route-tabs" aria-label="指南分类">
          {routes.map((route) => <a href={`#${route.id}`} key={route.id}>{route.title}</a>)}
        </nav>

        {routes.map((route) => (
          <section className="guide-section" id={route.id} key={route.id}>
            <header className="guide-section-header">
              <h2>{route.title}</h2>
              <p>{route.description}</p>
            </header>
            <div className="roadmap">
              {route.steps.map(([title, description], index) => (
                <div className="roadmap-step" key={title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                  <small>{index === 0 ? '从这里开始' : '阶段节点'}</small>
                </div>
              ))}
            </div>
          </section>
        ))}

        <a className="guide-next surface-card" href="/map">
          <span>想从知识关系而不是阶段开始？</span>
          <strong>打开知识地图 <ArrowRight size={16} /></strong>
        </a>
      </div>
      <SiteFooter />
    </main>
  );
}
