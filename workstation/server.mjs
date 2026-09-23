import http from 'node:http';
import { readFile, mkdir, readdir, writeFile } from 'node:fs/promises';
import { randomBytes, randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import MarkdownIt from 'markdown-it';
import texmath from 'markdown-it-texmath';
import { parse } from 'yaml';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(here);
const markdown = new MarkdownIt({ html: false, linkify: true }).use(texmath, {
  delimiters: 'dollars',
  katexOptions: { throwOnError: false, strict: false, trust: false },
});
const required = [
  'title',
  'description',
  'lead',
  'date',
  'tag',
  'type',
  'route',
  'node',
  'readingTime',
];
const escape = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        c
      ],
  );

export function inspect(source, slug) {
  const errors = [],
    warnings = [];
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug || ''))
    errors.push('文章地址只能使用小写英文、数字和连字符，例如 my-first-note。');
  const match = source
    .replace(/^\uFEFF/, '')
    .replace(/\r\n/g, '\n')
    .match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  let meta = {},
    body = source;
  if (!match) errors.push('缺少开头的 YAML 信息区，请先使用模板。');
  else {
    body = match[2];
    try {
      meta = parse(match[1], { maxAliasCount: 20 });
      if (!meta || typeof meta !== 'object' || Array.isArray(meta))
        throw new Error('应为字段列表');
    } catch {
      errors.push('YAML 格式无效，请检查缩进、冒号和引号。');
      meta = {};
    }
    for (const key of required)
      if (typeof meta[key] !== 'string' || !meta[key].trim())
        errors.push(`请填写 ${key}（文字类型）。`);
    if (
      typeof meta.date === 'string' &&
      (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date) ||
        !Number.isFinite(Date.parse(meta.date)) ||
        new Date(meta.date).toISOString().slice(0, 10) !== meta.date)
    )
      errors.push('日期需要真实的 YYYY-MM-DD 日期。');
    if (!body.trim()) errors.push('正文不能为空。');
  }
  if (/!\[\[/.test(body))
    warnings.push('发现 Obsidian 图片引用：发布前需要转换并提供图片文件。');
  if (/!\[.*?\]\(/.test(body))
    warnings.push(
      '包含图片：请把原图一并交给我；预览不联网加载图片，发布时会检查路径。',
    );
  if (/<[A-Za-z][^>]*>/.test(body))
    warnings.push('HTML / JSX 不会作为组件执行，当前站点支持 Markdown 写法。');
  if (
    meta.tag &&
    !['AI', '科研', '竞赛', '产品', '创业', '成长', '其他'].includes(meta.tag)
  )
    warnings.push('使用了新分类，发布时需要同步调整分类和知识图谱。');
  if (/占位|待填写|你的文章标题/.test(source))
    warnings.push('还有模板占位文字，请在交付前确认。');
  return {
    errors,
    warnings,
    title: typeof meta.title === 'string' ? meta.title : '未命名文章',
    body,
  };
}

export function createWorkstation({
  dataDir = path.join(root, '.local-workstation'),
} = {}) {
  const token = randomBytes(24).toString('hex');
  const json = (res, status, data) => {
    res.writeHead(status, {
      'Content-Type': 'application/json; charset=utf-8',
    });
    res.end(JSON.stringify(data));
  };
  const server = http.createServer(async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; frame-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'",
    );
    try {
      const expected = `127.0.0.1:${server.address().port}`;
      if (req.headers.host !== expected)
        return json(res, 403, {
          error: '请通过终端显示的 127.0.0.1 地址打开工作站。',
        });
      const url = new URL(req.url, `http://${expected}`);
      if (req.headers.origin && req.headers.origin !== `http://${expected}`)
        return json(res, 403, { error: '不允许跨站请求。' });
      if (req.method === 'GET') {
        if (url.pathname === '/api/session')
          return json(res, 200, { token, dataDir });
        if (url.pathname === '/api/list') {
          await mkdir(dataDir, { recursive: true });
          const items = [];
          for (const kind of ['drafts', 'ready', 'templates']) {
            const dir = path.join(dataDir, kind);
            await mkdir(dir, { recursive: true });
            for (const file of await readdir(dir))
              if (file.endsWith('.json'))
                items.push(
                  JSON.parse(await readFile(path.join(dir, file), 'utf8')),
                );
          }
          return json(
            res,
            200,
            items.sort((a, b) => b.created.localeCompare(a.created)),
          );
        }
        if (url.pathname === '/api/item') {
          const id = url.searchParams.get('id'),
            kind = url.searchParams.get('kind');
          if (
            !/^[a-f0-9-]{36}$/.test(id || '') ||
            !['drafts', 'ready', 'templates'].includes(kind)
          )
            return json(res, 400, { error: '无效记录。' });
          return json(res, 200, {
            source: await readFile(
              path.join(dataDir, kind, `${id}.md`),
              'utf8',
            ),
            handoff:
              kind === 'ready'
                ? await readFile(
                    path.join(dataDir, kind, `${id}-交付说明.txt`),
                    'utf8',
                  )
                : '',
          });
        }
        const assets = {
          '/': ['index.html', 'text/html; charset=utf-8'],
          '/app.js': ['app.js', 'text/javascript; charset=utf-8'],
          '/style.css': ['style.css', 'text/css; charset=utf-8'],
          '/template.md': ['template.md', 'text/markdown; charset=utf-8'],
        };
        if (assets[url.pathname]) {
          const [file, type] = assets[url.pathname];
          res.setHeader('Content-Type', type);
          return res.end(await readFile(path.join(here, file)));
        }
        if (
          url.pathname === '/katex.css' ||
          /^\/fonts\/KaTeX_[A-Za-z0-9_-]+\.(woff2?|ttf)$/.test(url.pathname)
        ) {
          const file =
            url.pathname === '/katex.css'
              ? 'katex.min.css'
              : url.pathname.slice(1);
          res.setHeader(
            'Content-Type',
            file.endsWith('.css') ? 'text/css' : 'font/woff2',
          );
          return res.end(
            await readFile(path.join(root, 'node_modules/katex/dist', file)),
          );
        }
        return json(res, 404, { error: '不存在的地址。' });
      }
      if (req.method !== 'POST' || req.headers['x-workstation-token'] !== token)
        return json(res, 403, { error: '请求验证失败，请刷新页面。' });
      const chunks = [];
      let bytes = 0;
      for await (const chunk of req) {
        bytes += chunk.length;
        if (bytes > 1024 * 1024)
          return json(res, 413, {
            error: '单篇 Markdown 请控制在 1 MB 以内。',
          });
        chunks.push(chunk);
      }
      const input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      if (typeof input.source !== 'string' || input.source.length > 500000)
        return json(res, 400, { error: '正文无效或过长。' });
      const result = inspect(input.source, input.slug);
      if (url.pathname === '/api/preview') {
        const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline' http://${expected}; font-src http://${expected}; img-src data:"><link rel="stylesheet" href="http://${expected}/katex.css"><style>body{font:16px/1.9 system-ui;color:#1c3345;padding:28px;overflow-wrap:anywhere}h1{font-size:28px}h2{margin-top:32px}pre{background:#edf3f7;padding:18px;overflow:auto}table{border-collapse:collapse}td,th{border:1px solid #cbd7e0;padding:8px}blockquote{border-left:3px solid #4a8cb1;margin-left:0;padding-left:18px;color:#617687}img{max-width:100%}</style></head><body><h1>${escape(result.title)}</h1>${markdown.render(result.body)}</body></html>`;
        return json(res, 200, { ...result, body: undefined, html });
      }
      if (url.pathname === '/api/save') {
        const kind = input.kind;
        if (!['drafts', 'ready', 'templates'].includes(kind))
          return json(res, 400, { error: '保存类型无效。' });
        if (kind === 'ready' && result.errors.length)
          return json(res, 422, { error: result.errors.join('\n') });
        const id = randomUUID(),
          dir = path.join(dataDir, kind);
        await mkdir(dir, { recursive: true });
        const item = {
          id,
          kind,
          slug: typeof input.slug === 'string' ? input.slug.slice(0, 100) : '',
          title: result.title,
          created: new Date().toISOString(),
          notes: String(input.notes || '').slice(0, 4000),
          warnings: result.warnings,
        };
        const normalized = input.source
          .replace(/^\uFEFF/, '')
          .replace(/\r\n/g, '\n');
        await writeFile(path.join(dir, `${id}.md`), normalized, { flag: 'wx' });
        await writeFile(
          path.join(dir, `${id}.json`),
          JSON.stringify(item, null, 2),
          { flag: 'wx' },
        );
        const handoff = `请将本地待发布文章发布到我的博客。\n文章文件：${path.join(dir, `${id}.md`)}\n建议文章地址：${item.slug}\n备注：${item.notes || '无'}\n请检查图片、分类和知识图谱，并将内容加入正式列表；不要只添加文章文件而遗漏当前 previewSummaries 的展示入口。发布前核对同名文章，未经确认不要覆盖。\n`;
        if (kind === 'ready')
          await writeFile(path.join(dir, `${id}-交付说明.txt`), handoff, {
            flag: 'wx',
          });
        return json(res, 201, {
          item,
          path: path.join(dir, `${id}.md`),
          handoff: kind === 'ready' ? handoff : '',
        });
      }
      return json(res, 404, { error: '不存在的接口。' });
    } catch (err) {
      json(res, err.code === 'ENOENT' ? 404 : 400, {
        error:
          err.code === 'ENOENT'
            ? '文件不存在。'
            : '操作失败，请检查内容格式或目录写入权限。',
      });
    }
  });
  return server;
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const server = createWorkstation();
  server.on('error', (err) => {
    console.error(
      err.code === 'EADDRINUSE'
        ? '端口 4317 已占用。请先关闭旧工作站，或使用 PORT=4318 pnpm workstation。'
        : err.message,
    );
    process.exitCode = 1;
  });
  server.listen(Number(process.env.PORT || 4317), '127.0.0.1', () =>
    console.log(
      `本地内容工作站：http://127.0.0.1:${server.address().port}\n仅保存到本机，不自动发布。按 Ctrl+C 停止。`,
    ),
  );
}
