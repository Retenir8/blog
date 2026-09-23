import type { Metadata } from 'next';
import { BlogLayout, PageHeading } from '@/components/blog-layout';
import { ArchiveBrowser } from '@/components/archive-browser';
import { visibleSummaries } from '@/lib/articles';
export const metadata: Metadata = { title: '归档与搜索｜个人博客' };
export default function ArchivePage() {
  return (
    <BlogLayout active="archive">
      <PageHeading
        title="归档与搜索"
        description="从一个关键词开始，或沿着时间回看。"
      />
      <ArchiveBrowser posts={visibleSummaries} />
    </BlogLayout>
  );
}
