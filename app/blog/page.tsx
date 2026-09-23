import type { Metadata } from 'next';
import { BlogLayout, RecentContent } from '@/components/blog-layout';
export const metadata: Metadata = { title: '近期发布｜Retenir 的博客' };
export default function BlogPage() {
  return (
    <BlogLayout active="blog">
      <RecentContent />
    </BlogLayout>
  );
}
