import { ArrowRight } from 'lucide-react';
import type { Article } from '@/lib/articles';

type ArticleCardProps = {
  article: Article;
  index: number;
  compact?: boolean;
  visual?: boolean;
};

export function ArticleCard({ article, index, compact = false, visual = false }: ArticleCardProps) {
  return (
    <article
      className={`glass-card article-card ${compact ? 'compact-card' : ''} ${visual ? 'visual-card' : ''}`}
    >
      {visual && <div className={`article-thumb article-thumb-${index + 1}`} aria-hidden="true" />}
      <div className="article-card-copy">
        <div className="card-index">{String(index + 1).padStart(2, '0')}</div>
        <div className="card-meta">
          <span>{article.tag}</span>
          <time dateTime={article.dateISO}>{article.date}</time>
        </div>
        <h3>{article.title}</h3>
        <p>{article.description}</p>
        <a href={`/articles/${article.slug}`} aria-label={`阅读：${article.title}`}>
          阅读全文 <ArrowRight size={15} />
        </a>
      </div>
    </article>
  );
}
