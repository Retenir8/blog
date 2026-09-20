'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from '@/components/site-link';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { categories } from '@/lib/blog-content';
import type { ArticleSummary } from '@/lib/articles';

export function ArchiveBrowser({ posts }: { posts: ArticleSummary[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('全部');
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get('category');
    if (value && categories.includes(value)) setCategory(value);
  }, []);
  const filtered = useMemo(
    () =>
      posts.filter(
        (post) =>
          (category === '全部' || category === post.tag) &&
          `${post.title} ${post.description} ${post.tag} ${post.searchText}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
      ),
    [posts, query, category],
  );
  const years = Array.from(
    new Set(filtered.map((post) => post.dateISO.slice(0, 4))),
  );
  function selectCategory(value: string) {
    setCategory(value);
    const url = new URL(window.location.href);
    if (value === '全部') url.searchParams.delete('category');
    else url.searchParams.set('category', value);
    window.history.replaceState(null, '', url);
  }
  return (
    <div>
      <div className="archive-controls">
        <label className="archive-search">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">搜索文章、关键词或主题</span>
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索文章、关键词或主题……"
            autoComplete="off"
          />
          {query && (
            <Button
              size="icon"
              variant="ghost"
              aria-label="清除搜索"
              onClick={() => setQuery('')}
            >
              <X size={16} />
            </Button>
          )}
        </label>
        <div className="category-filters" aria-label="内容分类">
          {['全部', ...categories].map((value) => (
            <Button
              key={value}
              variant="ghost"
              aria-pressed={category === value}
              onClick={() => selectCategory(value)}
            >
              {value}
            </Button>
          ))}
        </div>
      </div>
      <p className="archive-count" aria-live="polite">
        {query || category !== '全部'
          ? `找到 ${filtered.length} 篇内容`
          : '按时间，慢慢回看。'}
      </p>
      {filtered.length ? (
        years.map((year) => (
          <section className="archive-year" key={year}>
            <h2>{year}</h2>
            {Array.from(
              new Set(
                filtered
                  .filter((post) => post.dateISO.startsWith(year))
                  .map((post) => post.dateISO.slice(5, 7)),
              ),
            ).map((month) => (
              <div className="archive-month" key={month}>
                <h3>{month} 月</h3>
                {filtered
                  .filter((post) => post.dateISO.startsWith(`${year}-${month}`))
                  .map((post) => (
                    <Link
                      href={`/articles/${post.slug}`}
                      className="archive-row"
                      key={post.slug}
                    >
                      <time dateTime={post.dateISO}>{post.date.slice(5)}</time>
                      <strong>{post.title}</strong>
                      <small>{post.tag}</small>
                    </Link>
                  ))}
              </div>
            ))}
          </section>
        ))
      ) : (
        <div className="empty-content">
          <p>
            {query
              ? '没有找到匹配的内容，换一个关键词试试。'
              : '这个分类的内容还在路上。'}
          </p>
          <Button
            variant="outline"
            className="clear-filters"
            onClick={() => {
              setQuery('');
              selectCategory('全部');
            }}
          >
            查看全部内容
          </Button>
        </div>
      )}
    </div>
  );
}
