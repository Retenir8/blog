import MarkdownIt from 'markdown-it';
import texmath from 'markdown-it-texmath';
import { parse as parseYaml } from 'yaml';

export type TocItem = {
  id: string;
  title: string;
  level: 2 | 3;
};

export type ArticleSummary = {
  slug: string;
  title: string;
  description: string;
  lead: string;
  date: string;
  dateISO: string;
  tag: string;
  readingTime: string;
  searchText: string;
};

export type Article = ArticleSummary & {
  html: string;
  toc: TocItem[];
};

type ArticleFrontMatter = {
  title?: unknown;
  description?: unknown;
  lead?: unknown;
  date?: unknown;
  tag?: unknown;
  readingTime?: unknown;
};

type RenderEnvironment = {
  toc: TocItem[];
  headingIds: Map<string, number>;
};

const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
});

markdown.use(texmath, {
  delimiters: 'dollars',
  katexOptions: {
    strict: false,
    throwOnError: false,
  },
});

markdown.renderer.rules.heading_open = (tokens, index, options, env, self) => {
  const token = tokens[index];
  const level = Number(token.tag.slice(1));
  const title = tokens[index + 1]?.content.trim() ?? '';

  if ((level === 2 || level === 3) && title) {
    const renderEnv = env as RenderEnvironment;
    const baseId = slugifyHeading(title);
    const seen = renderEnv.headingIds.get(baseId) ?? 0;
    const id = seen === 0 ? baseId : `${baseId}-${seen + 1}`;

    renderEnv.headingIds.set(baseId, seen + 1);
    renderEnv.toc.push({ id, title, level });
    token.attrSet('id', id);
  }

  return self.renderToken(tokens, index, options);
};

const articleModules = import.meta.glob<string>('../content/articles/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
});

export const articles: Article[] = Object.entries(articleModules)
  .map(([path, source]) => parseArticle(path, source))
  .sort((first, second) => second.dateISO.localeCompare(first.dateISO));

export const articleSummaries: ArticleSummary[] = articles.map(
  ({ html: _html, toc: _toc, ...summary }) => summary,
);

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

function parseArticle(path: string, source: string): Article {
  const frontMatterMatch = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);

  if (!frontMatterMatch) {
    throw new Error(`文章缺少 Front Matter：${path}`);
  }

  const metadata = parseYaml(frontMatterMatch[1]) as ArticleFrontMatter;
  const body = frontMatterMatch[2].trim();
  const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? '';
  const dateISO = requireString(metadata.date, 'date', path);
  const renderEnvironment: RenderEnvironment = {
    toc: [],
    headingIds: new Map(),
  };

  return {
    slug,
    title: requireString(metadata.title, 'title', path),
    description: requireString(metadata.description, 'description', path),
    lead: requireString(metadata.lead, 'lead', path),
    date: dateISO.replaceAll('-', '.'),
    dateISO,
    tag: requireString(metadata.tag, 'tag', path),
    readingTime: requireString(metadata.readingTime, 'readingTime', path),
    searchText: body.replace(/[`*_>#\[\]$|~-]/g, ' ').replace(/\s+/g, ' ').trim(),
    html: markdown.render(body, renderEnvironment),
    toc: renderEnvironment.toc,
  };
}

function requireString(value: unknown, field: string, path: string) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`文章 ${path} 的 ${field} 字段无效`);
  }

  return value.trim();
}

function slugifyHeading(value: string) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '');

  return slug || 'section';
}
