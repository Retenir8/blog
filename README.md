# 个人博客

使用 **Next.js 16.3.6 App Router + React + TypeScript + Tailwind CSS**，保留昼夜天空、NASA 地球背景、开场动画和 Markdown 文章系统。部署目标为 **GitHub + Vercel Git 自动部署**，支持私有仓库。

- 源码仓库：https://github.com/Retenir8/blog （可见性由所有者管理，部署不要求公开）
- 旧站：https://blog.retenir.chatgpt.site （迁移期间保留，不再作为新部署目标）
- Vercel 正式地址：https://blog-three-chi-24.vercel.app
- Vercel 项目：https://vercel.com/retenir8/blog （已连接 GitHub 的 `main` 分支）
- Node.js：24.x；包管理器：pnpm；具体依赖锁定在 `pnpm-lock.yaml`。

## 本地运行

```sh
pnpm install --frozen-lockfile
pnpm dev
# http://localhost:3000
pnpm workstation:test
pnpm build
pnpm typecheck
pnpm start
```

构建输出为 `.next/`。不再使用 Vinext、Vite、Sites 插件或 Cloudflare Workers；旧配置可从 Git 历史恢复，迁移不会删除旧线上站点。

## GitHub + Vercel 自动部署

1. 确认 `Retenir8/blog` 的可见性符合预期。仓库若已有内容，先拉取审查并合并，禁止强制覆盖。
2. 将源码推送到生产分支（通常 `main`），不要上传本地草稿、`resource/` 或 `.env`。
3. 登录 Vercel → Add New → Project，导入 `Retenir8/blog`；如果仓库未显示，需要所有者授权 Vercel 访问这个私有仓库。
4. Framework Preset：**Next.js**；Root Directory：仓库根目录；Node.js：**24.x**。安装和构建命令见 `vercel.json`，Output Directory 保持默认，不要填写 `dist`。
5. 首次部署 Ready 后，在 Settings → Git 确认生产分支为 `main`。以后推送生产分支自动发布，其他分支 / PR 生成预览部署。
6. 测试导航、文章、搜索、主题和手机菜单。推送成功不等于部署成功，必须查看 Vercel 部署结果。

使用 Vercel 原生 Git 集成，无需在仓库放置 Vercel Token。`.github/workflows/ci.yml` 只负责测试和构建，与 Vercel 部署独立。账号登录、私有仓库授权需要所有者完成，不要将密码或令牌提交到源码或聊天。

官方说明：https://vercel.com/docs/git/vercel-for-github

### 域名

默认通过 `VERCEL_PROJECT_PRODUCTION_URL` 设置网站元数据地址，本地回退到 `http://localhost:3000`。自有域名在 Vercel Settings → Domains 添加，按控制台给出的 DNS 记录配置；绑定后设置环境变量 `SITE_URL=https://你的域名` 并重新部署。示例见 `.env.example`。

旧 `chatgpt.site` 平台子域名不会迁移到 Vercel，新部署获得 `vercel.app` 地址或使用自有域名。确认迁移完成后再单独决定是否关闭旧站。

## 页面与内容

`/` 开场；`/blog` 近期；`/archive` 搜索；`/thoughts` 思考；`/knowledge` 图谱；`/about` 关于；`/articles/[slug]` 文章。旧 `/articles`、`/guides`、`/map`、`/practice`、`/collaborate` 入口保留跳转。

列表、归档与知识图谱统一使用 `visibleSummaries`：展示 `content/articles/` 中设置 `published: true` 的已批准文章，以及原有 `content/previews/` 设计内容。未标记的历史文章仍可通过原链接访问，不自动加入列表。发布新文时在 Front Matter 中添加 `published: true`，并确认分类与正文后提交。

`lib/articles.ts` 只在服务端读取 `content/`，使用 Markdown-it、YAML、KaTeX 渲染文章、公式和目录，不再依赖 `import.meta.glob`。文件名决定文章地址，例如 `my-first-note.md` 对应 `/articles/my-first-note`。

```markdown
---
title: '文章标题'
description: '列表摘要'
lead: '文章导语'
date: '2026-09-23'
tag: 'AI'
type: '指南'
route: 'AI'
node: '入门'
readingTime: '5 分钟'
---

## 从一个问题开始

正文支持标题、表格、代码、图片和 $t = L / R$ 公式。
```

`.mdx` 当前仅兼容 Markdown 写法，不执行 JSX。图片放入 `public/`，来源见 `ASSETS.md`。导航暂保留原生文档跳转与无脚本访问能力。

## 本地内容工作站

双击 `启动本地工作站.command`，或运行 `pnpm workstation`，打开 http://127.0.0.1:4317 。按 Ctrl+C 停止；端口占用可执行 `PORT=4318 pnpm workstation`。

1. 导入 Markdown / MD 模板，或使用 `workstation/template.md`。
2. 编辑并检查，预览 Markdown、代码和公式；不联网加载图片，不执行 HTML/JSX。
3. 保存草稿或保存到待发布，复制交付说明发给 Codex。
4. Codex 检查图片、分类和同名冲突，将确认的内容接入博客源码，推送 GitHub，由 Vercel 自动构建并验证部署。

每次保存独立版本。草稿、模板和待发布文件位于 `.local-workstation/{drafts,templates,ready}/`，已被 Git 忽略；`resource/` 是未确认资料，也不上传。工作站代码可以进入私有仓库，个人草稿数据不会上传。编辑区不自动保存，关闭前请保存并自行备份。

工作站使用独立 Node.js 服务，仅绑定本机回环地址，有 Host、Origin 和请求令牌校验，不持有 GitHub / Vercel 凭据，不自动发布。请勿通过隧道或反向代理公开。

## 目录

```text
app/                 页面与全局样式
components/          React 组件
content/             已纳入站点的文章和占位内容
lib/articles.ts      服务端 Markdown 读取与渲染
public/              公开图片资源
workstation/         本地内容编辑工具
.local-workstation/  私人草稿（忽略）
resource/            未确认资料（忽略）
next.config.ts       Next.js 配置
postcss.config.mjs   Tailwind 构建配置
vercel.json          Vercel 部署设置
```
