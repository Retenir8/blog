import { ArrowRight } from 'lucide-react';
import { ArticleCard } from '@/components/article-card';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { articles } from '@/lib/articles';

export default function Home() {
  return (
    <main>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <SiteHeader active="home" variant="overlay" />

      <section className="hero" id="top">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-vignette" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow">个人博客 · 技术 / 产品 / 思考</p>
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
        <a className="scroll-cue" href="#articles" aria-label="向下浏览最新文章">
          <span>SCROLL</span>
          <i />
        </a>
      </section>

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

        <div className="article-grid">
          {articles.slice(0, 3).map((article, index) => (
            <ArticleCard article={article} index={index} key={article.slug} />
          ))}
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="glass-card about-card">
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
      </section>

      <SiteFooter />
    </main>
  );
}
