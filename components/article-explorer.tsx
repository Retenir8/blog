'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { ArticleCard } from '@/components/article-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { ArticleSummary } from '@/lib/articles';

type ArticleExplorerProps = {
  articles: ArticleSummary[];
};

export function ArticleExplorer({ articles }: ArticleExplorerProps) {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('全部');
  const tags = ['全部', ...Array.from(new Set(articles.map((article) => article.tag)))];

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesTag = activeTag === '全部' || article.tag === activeTag;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${article.title} ${article.description} ${article.tag} ${article.searchText}`
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesTag && matchesQuery;
    });
  }, [activeTag, articles, query]);

  function clearFilters() {
    setQuery('');
    setActiveTag('全部');
  }

  return (
    <div className="article-explorer">
      <div className="glass-card filter-panel" id="search">
        <label className="search-field">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">搜索文章</span>
          <Input
            autoComplete="off"
            className="search-input"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索标题、摘要或主题…"
            type="search"
            value={query}
          />
          {query && (
            <Button
              aria-label="清除搜索"
              className="clear-search"
              onClick={() => setQuery('')}
              size="icon-sm"
              type="button"
              variant="ghost"
            >
              <X size={15} />
            </Button>
          )}
        </label>
        <div className="tag-filters" aria-label="按主题筛选">
          {tags.map((tag) => (
            <Button
              aria-pressed={activeTag === tag}
              className={`tag-button ${activeTag === tag ? 'selected' : ''}`}
              key={tag}
              onClick={() => setActiveTag(tag)}
              type="button"
              variant="ghost"
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      <p className="result-count" aria-live="polite">
        {filteredArticles.length} 篇文章
      </p>

      {filteredArticles.length > 0 ? (
        <div className="article-list-grid">
          {filteredArticles.map((article, index) => (
            <ArticleCard article={article} compact index={index} key={article.slug} />
          ))}
        </div>
      ) : (
        <div className="glass-card empty-state">
          <p className="section-kicker">NO RESULTS</p>
          <h2>没有找到匹配的文章</h2>
          <p>换一个关键词或主题，再试一次。</p>
          <Button className="reset-button" onClick={clearFilters} type="button">
            清除筛选
          </Button>
        </div>
      )}
    </div>
  );
}
