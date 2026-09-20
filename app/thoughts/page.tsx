import type { Metadata } from 'next';
import Link from '@/components/site-link';
import { BlogLayout, PageHeading } from '@/components/blog-layout';
import { thoughts } from '@/lib/blog-content';
export const metadata: Metadata = { title: '思考心得｜个人博客' };
export default function ThoughtsPage() {
  return (
    <BlogLayout active="thoughts">
      <PageHeading title="思考心得" description="一些暂时没有答案的问题。" />
      <div className="thought-stream">
        {thoughts.map((thought) => (
          <article className="thought-item" id={thought.id} key={thought.id}>
            <time>{thought.date}</time>
            <p>{thought.content}</p>
            <div className="thought-tags">
              {thought.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/archive?category=${encodeURIComponent(tag)}`}
                >
                  #{tag}
                </Link>
              ))}
            </div>
            {thought.post && (
              <Link className="text-link" href={`/articles/${thought.post}`}>
                阅读全文 <span aria-hidden="true">↗</span>
              </Link>
            )}
          </article>
        ))}
      </div>
      <div className="list-end">
        <span />
        想到了，再接着写
        <span />
      </div>
    </BlogLayout>
  );
}
