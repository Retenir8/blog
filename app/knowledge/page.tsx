import type { Metadata } from 'next';
import { BlogLayout, PageHeading } from '@/components/blog-layout';
import {
  KnowledgeGraph,
  KnowledgePanel,
  KnowledgeProvider,
} from '@/components/knowledge-map';
import { previewSummaries } from '@/lib/articles';
export const metadata: Metadata = { title: '知识图谱｜个人博客' };
export default function KnowledgePage() {
  return (
    <KnowledgeProvider>
      <BlogLayout
        active="knowledge"
        wide
        right={<KnowledgePanel posts={previewSummaries} />}
      >
        <PageHeading
          title="知识图谱"
          description="一些方向，和它们之间慢慢长出的联系。"
        />
        <KnowledgeGraph posts={previewSummaries} />
      </BlogLayout>
    </KnowledgeProvider>
  );
}
