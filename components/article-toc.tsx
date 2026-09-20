'use client';
import { useEffect, useState } from 'react';
import type { TocItem } from '@/lib/articles';

export function ArticleToc({ items }: { items: TocItem[] }) {
  const [current, setCurrent] = useState(items[0]?.id ?? '');
  useEffect(() => {
    const update = () => {
      let id = items[0]?.id ?? '';
      for (const item of items) {
        const heading = document.getElementById(item.id);
        if (heading && heading.getBoundingClientRect().top <= 140) id = item.id;
      }
      setCurrent(id);
    };
    let ticking = false;
    const scroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
      }
    };
    update();
    window.addEventListener('scroll', scroll, { passive: true });
    return () => window.removeEventListener('scroll', scroll);
  }, [items]);
  return (
    <nav className="toc-panel framed" aria-label="文章目录">
      <h2>本页目录</h2>
      <ol>
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'toc-sub' : ''}>
            <a
              className={current === item.id ? 'current' : ''}
              aria-current={current === item.id ? 'location' : undefined}
              href={`#${item.id}`}
              onClick={() => setCurrent(item.id)}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
