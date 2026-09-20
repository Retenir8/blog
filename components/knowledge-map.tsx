'use client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type CSSProperties,
} from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet';
import { knowledgeNodes, thoughts } from '@/lib/blog-content';
import type { ArticleSummary } from '@/lib/articles';

const KnowledgeContext = createContext<{
  selected: string | null;
  select: (id: string | null) => void;
  mobile: boolean;
}>({ selected: null, select: () => {}, mobile: false });
export function KnowledgeProvider({ children }: { children: ReactNode }) {
  const [selected, select] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return (
    <KnowledgeContext.Provider value={{ selected, select, mobile }}>
      {children}
    </KnowledgeContext.Provider>
  );
}

export function KnowledgeGraph({ posts }: { posts: ArticleSummary[] }) {
  const { selected, select, mobile } = useContext(KnowledgeContext);
  const current = knowledgeNodes.find((node) => node.id === selected);
  const edges = knowledgeNodes.flatMap((node) =>
    node.related
      .filter((id) => id > node.id)
      .map((id) => [node, knowledgeNodes.find((other) => other.id === id)!]),
  );
  return (
    <>
      <div className="knowledge-map" aria-label="知识主题关系图">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {edges.map(([a, b]) => (
            <line
              key={`${a.id}-${b.id}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              className={
                selected && (selected === a.id || selected === b.id)
                  ? 'related'
                  : ''
              }
            />
          ))}
        </svg>
        <span className="map-center">· 我的知识地图 ·</span>
        {knowledgeNodes.map((node) => {
          const count = posts.filter((post) => post.tag === node.name).length;
          const projectCount = posts.filter(
            (post) => post.tag === node.name && post.type === '实践',
          ).length;
          const thoughtCount = thoughts.filter((thought) =>
            thought.tags.includes(node.name),
          ).length;
          return (
            <button
              key={node.id}
              type="button"
              className={`planet-node ${current && current.id !== node.id && !current.related.includes(node.id) ? 'dimmed' : ''}`}
              aria-pressed={selected === node.id}
              aria-label={`${node.name}，${count} 篇文章，${projectCount} 条实践，${thoughtCount} 条思考，查看相关内容`}
              style={
                {
                  '--node-color': node.color,
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  width: 72 + count * 10,
                  height: 72 + count * 10,
                } as CSSProperties
              }
              onClick={() => select(node.id)}
            >
              {node.name}
              <span className="node-tooltip" aria-hidden="true">
                {count} 篇文章 · {projectCount} 条实践 · {thoughtCount} 条思考
              </span>
            </button>
          );
        })}
      </div>
      <p className="map-help">点击一个星球，看看相关的记录。</p>
      <Sheet
        open={mobile && !!selected}
        onOpenChange={(open) => {
          if (!open) select(null);
        }}
      >
        <SheetContent
          side="bottom"
          className="knowledge-sheet"
          showCloseButton={false}
        >
          <SheetTitle>{current?.name ?? '知识节点'}</SheetTitle>
          <SheetDescription>关于{current?.name}的一些内容。</SheetDescription>
          <SheetClose
            render={
              <Button
                className="sheet-close"
                size="icon"
                variant="ghost"
                aria-label="关闭节点详情"
              />
            }
          >
            <X size={18} />
          </SheetClose>
          <KnowledgeDetail posts={posts} compact />
        </SheetContent>
      </Sheet>
    </>
  );
}

function KnowledgeDetail({
  posts,
  compact = false,
}: {
  posts: ArticleSummary[];
  compact?: boolean;
}) {
  const { selected, select } = useContext(KnowledgeContext);
  const node = knowledgeNodes.find((item) => item.id === selected);
  if (!node)
    return (
      <section className="framed sidebar-block detail-hint">
        <strong>沿着兴趣出发</strong>
        <p>选择一个星球，这里会展开它的入门、实践和思考。</p>
      </section>
    );
  const matched = posts.filter((post) => post.tag === node.name);
  return (
    <section className={`knowledge-detail ${compact ? '' : 'framed'}`}>
      {!compact && (
        <>
          <div className="detail-heading">
            <h2>{node.name}</h2>
            <Button
              size="icon"
              variant="ghost"
              aria-label="关闭节点详情"
              onClick={() => select(null)}
            >
              <X size={16} />
            </Button>
          </div>
          <p>关于{node.name}的一些内容。</p>
        </>
      )}
      {[
        ['入门', '指南'],
        ['实践', '实践'],
        ['思考', '思考'],
      ].map(([label, type]) => {
        const items = matched.filter((post) => post.type === type);
        const notes =
          type === '思考'
            ? thoughts.filter((thought) => thought.tags.includes(node.name))
            : [];
        return (
          <div key={label}>
            <h3>{label}</h3>
            {items.length || notes.length ? (
              <ul>
                {items.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/articles/${post.slug}`}>{post.title}</Link>
                  </li>
                ))}
                {notes.map((note) => (
                  <li key={note.id}>
                    <Link href={`/thoughts#${note.id}`}>
                      思考文字占位 · {note.date.slice(5)}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="not-yet">内容待补充</p>
            )}
          </div>
        );
      })}
      <Link
        className="text-link"
        href={`/archive?category=${encodeURIComponent(node.name)}`}
      >
        查看全部{node.name}内容 <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}

export function KnowledgePanel({ posts }: { posts: ArticleSummary[] }) {
  return <KnowledgeDetail posts={posts} />;
}
