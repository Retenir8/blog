import type { Metadata } from 'next';
import { BlogLayout, PageHeading } from '@/components/blog-layout';
export const metadata: Metadata = { title: '关于与合作｜个人博客' };
export default function AboutPage() {
  return (
    <BlogLayout active="about">
      <PageHeading title="关于我" description="一段自我介绍占位文字。" />
      <div className="about-profile-mobile">
        <div className="avatar-placeholder" aria-label="头像占位">
          我
        </div>
        <div>
          <h2>用户名</h2>
          <p>
            一句话自我介绍占位。
            <br />
            最近在做：AI、科研、竞赛。
          </p>
        </div>
      </div>
      <section className="about-section">
        <p>
          我目前是一名软件与 AI 方向的学生。
          <br />
          我关注 AI、科研、竞赛、产品和创业。
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
      <section className="about-section">
        <h2>一些经历</h2>
        {['2026', '2025', '2024'].map((year) => (
          <div className="experience-row" key={year}>
            <time>{year}</time>
            <span>经历占位，待慢慢补充。</span>
          </div>
        ))}
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
          <div className="qr-placeholder">
            微信二维码
            <br />
            待补充
          </div>
          <div className="contact-options">
            <span>
              GitHub <small>待补充</small>
            </span>
            <span>
              邮箱 <small>待补充</small>
            </span>
            <span>
              其他联系方式 <small>待补充</small>
            </span>
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
      </section>
    </BlogLayout>
  );
}
