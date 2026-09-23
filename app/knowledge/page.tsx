import type { Metadata } from 'next';
import { BlogLayout, PageHeading } from '@/components/blog-layout';
export const metadata: Metadata = { title: '知识图谱｜Retenir 的博客' };
export default function KnowledgePage() {
  return (
    <BlogLayout active="knowledge" right={null}>
      <PageHeading title="知识图谱" description="正在整理内容与它们之间的联系。" />
      <div className="knowledge-unavailable" role="status">暂未开放</div>
    </BlogLayout>
  );
}
