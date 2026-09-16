import { ArrowRight } from 'lucide-react';
import { ArticleCard } from '@/components/article-card';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { articles } from '@/lib/articles';

export default function Home() {
  const topics = [
    ['01', '思考方法', '把复杂问题变得清晰'],
    ['02', '产品实践', '从想法走向真实体验'],
    ['03', '技术观察', '理解工具与人的关系'],
    ['04', '数字生活', '建立可持续的个人系统'],
  ];

  return (
    <main className="home-main">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <SiteHeader active="home" variant="overlay" />

      <section className="hero" id="top">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-vignette" aria-hidden="true" />
        <div className="hero-layout">
          <div className="hero-content">
            <p className="eyebrow">A PERSONAL SPACE FOR CLEAR THINKING</p>
            <h1>
              在复杂世界里，
              <span>做清晰的事。</span>
            </h1>
            <p className="hero-copy">
              记录我对技术、产品与日常的持续观察。
              <br />
              保留好奇，也保留独立判断。
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="/articles">
                开始阅读 <ArrowRight size={17} />
              </a>
              <a className="text-button" href="/about">
                关于我
              </a>
            </div>
          </div>

          <aside className="glass-card hero-note" aria-label="博客概览">
            <p className="section-kicker">CURRENT FOCUS</p>
            <h2>技术如何成为人的延伸</h2>
            <p>
              关注工具背后的选择，也关注人在变化中如何保持判断、创造与好奇。
            </p>
            <div className="hero-stats">
              <div>
                <strong>{String(articles.length).padStart(2, '0')}</strong>
                <span>篇文章</span>
              </div>
              <div>
                <strong>04</strong>
                <span>个主题</span>
              </div>
              <div>
                <strong>∞</strong>
                <span>持续探索</span>
              </div>
            </div>
          </aside>
        </div>

        <div className="hero-bottom-line" aria-hidden="true">
          <span>THOUGHTS</span>
          <i />
          <span>PRODUCT</span>
          <i />
          <span>TECHNOLOGY</span>
        </div>
        <a className="scroll-cue" href="#articles" aria-label="向下浏览最新文章">
          <span>SCROLL</span>
          <i />
        </a>
      </section>

      <div className="home-sections">
        <section className="section" id="articles">
          <div className="section-heading">
            <div>
              <p className="section-kicker">RECENT NOTES</p>
              <h2>最新文章</h2>
            </div>
            <a className="view-all" href="/articles">
              查看全部 <ArrowRight size={16} />
            </a>
          </div>

          <div className="article-grid home-article-grid">
            {articles.slice(0, 3).map((article, index) => (
              <ArticleCard article={article} index={index} key={article.slug} visual />
            ))}
          </div>
        </section>

        <section className="section topics-section" aria-labelledby="topics-title">
          <div className="glass-card topics-module">
            <div className="module-intro">
              <p className="section-kicker">EXPLORE</p>
              <h2 id="topics-title">探索主题</h2>
              <p>从问题出发，在不同领域之间寻找可以反复使用的认识。</p>
            </div>
            <div className="topic-grid">
              {topics.map(([number, title, description]) => (
                <a href="/articles#search" key={number}>
                  <span>{number}</span>
                  <strong>{title}</strong>
                  <p>{description}</p>
                  <ArrowRight size={15} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section home-split" id="about">
          <div className="glass-card about-card home-about-card">
            <div>
              <p className="section-kicker">ABOUT</p>
              <h2>在这里，记录长期思考。</h2>
            </div>
            <div className="about-copy">
              <p>
                我关注技术如何塑造人的选择，也关心产品背后的判断、学习与生活本身。
                这个博客不追逐信息洪流，只留下值得反复回看的内容。
              </p>
              <a href="/about">
                了解更多 <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <aside className="glass-card thought-card">
            <p className="section-kicker">RECENT THOUGHT</p>
            <blockquote>“好的工具不替人决定，它放大人的判断。”</blockquote>
            <p>
              在自动化越来越强的时代，真正稀缺的依然是知道什么值得做，以及为什么去做。
            </p>
          </aside>
        </section>

        <section className="section reading-section" aria-labelledby="reading-title">
          <div className="glass-card reading-module">
            <div className="reading-intro">
              <p className="section-kicker">START HERE</p>
              <h2 id="reading-title">从这里开始</h2>
              <p>如果你第一次来到这里，这几篇文章最能代表这个博客正在思考的方向。</p>
            </div>
            <a className="featured-reading" href={`/articles/${articles[0].slug}`}>
              <span>{articles[0].tag}</span>
              <strong>{articles[0].title}</strong>
              <p>{articles[0].description}</p>
              <i>阅读文章 <ArrowRight size={15} /></i>
            </a>
            <div className="reading-list">
              {articles.slice(1, 4).map((article, index) => (
                <a href={`/articles/${article.slug}`} key={article.slug}>
                  <span>{String(index + 2).padStart(2, '0')}</span>
                  <strong>{article.title}</strong>
                  <ArrowRight size={15} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
