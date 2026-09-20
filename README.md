# 个人博客

一个部署在 OpenAI Sites 上的个人博客。整体采用深色宇宙背景与透明液态玻璃界面，包含首页、文章列表、文章详情和关于页面。

- 当前线上地址：<https://blog.retenir.chatgpt.site>
- Sites 项目配置：`.openai/hosting.json`
- 包管理器：pnpm
- Node.js：22.13.0 或更高版本

## 技术框架

这个项目主要使用以下技术：

- **Vinext 1.0.0-beta.5**：兼容 Next.js App Router 开发方式、基于 Vite 与 React Server Components 的站点框架。
- **React 19.2.6 / React DOM 19.2.6**：页面组件与交互。
- **TypeScript 5.9.3**：类型安全的 JavaScript 开发。
- **Vite 8.0.13**：开发服务器与生产构建。
- **Tailwind CSS 4.2.1**：基础样式系统。
- **shadcn / Base UI**：搜索框、按钮等界面基础组件。
- **Lucide React**：界面图标。
- **Markdown-it / YAML**：读取文章 Front Matter，并在构建时渲染 Markdown 正文。
- **KaTeX / markdown-it-texmath**：构建时渲染行内与独立数学公式。
- **OpenAI Sites Vite Plugin 0.2.0**：生成适用于 OpenAI Sites 的部署产物。
- **Cloudflare Workers / Wrangler**：Sites 服务端运行环境与本地调试支持。

## 项目目录

```text
app/                 页面、布局与全局样式
components/          站点组件和界面基础组件
content/articles/     每篇文章一个 Markdown 文件
lib/articles.ts       Markdown 加载、解析、目录和搜索索引
public/              宇宙背景、社交分享图等静态资源
.openai/hosting.json OpenAI Sites 项目标识和资源配置
package.json         依赖与项目命令
vite.config.ts       Vite、Vinext 和 Sites 构建配置
```

`node_modules/`、`dist/`、`.next/`、`.vinext/` 和 `.wrangler/` 都是依赖或可重新生成的构建缓存，因此没有随迁移复制。运行下面的安装和构建命令即可重新生成。

## 本地运行

```bash
pnpm install
pnpm dev
```

开发服务器默认打开：<http://localhost:3000>

## 生产构建

```bash
pnpm build
```

构建完成后，Sites 服务端入口位于 `dist/server/index.js`。

## 发布到 OpenAI Sites

项目已经关联现有的 OpenAI Sites 站点，不要删除或手动修改 `.openai/hosting.json` 中的 `project_id`。后续通过 Codex 修改并发布时，应继续复用该项目，这样线上地址和历史版本不会被重新创建。

发布到 OpenAI Sites 不要求把源码放到公开 GitHub 仓库。Sites 会使用自己的站点源码仓库与版本系统；如需额外备份，也可以自行推送到 GitHub。

## 使用自己的域名

**可以。** 当前站点支持绑定自有域名，但现在还没有添加任何自定义域名。

绑定流程：

1. 准备一个自己拥有并可管理 DNS 的域名，例如 `blog.example.com` 或 `example.com`。
2. 在 OpenAI Sites 中把该域名添加到当前站点。也可以直接让 Codex 为这个 Sites 项目执行绑定。
3. Sites 会返回需要配置的 DNS 记录：
   - 子域名通常配置 **CNAME** 记录；
   - 根域名通常配置 Sites 返回的 **A** 记录；
   - 同时按返回结果添加域名所有权验证记录。
4. 等待 DNS 和 SSL 证书状态变为生效，之后即可通过自有域名访问站点。

绑定域名前需要提供准备使用的完整域名。DNS 记录必须在该域名的注册商或 DNS 服务商后台设置。

## 内容维护

博客文章保存在 `content/articles/`，每篇文章对应一个 `.md` 文件。文件名会成为文章地址，例如：

```text
content/articles/my-first-note.md
→ /articles/my-first-note
```

文章使用 YAML Front Matter 管理标题、摘要、日期与标签：

```markdown
---
title: 文章标题
description: 用于文章列表和搜索结果的摘要
lead: 文章页标题下方的导语
date: '2026-09-20'
tag: 技术观察
readingTime: 6 分钟
---

## 第一节

从这里开始写正文。
```

支持标题、列表、引用、链接、图片、表格、代码块和数学公式。目录会根据二级、三级标题自动生成，搜索也会包含 Markdown 正文。

行内公式使用 `$t = L / R$`，独立公式使用：

```markdown
$$
C = B \log_2(1 + S/N)
$$
```

首页模块位于 `app/page.tsx`，文章读取逻辑位于 `lib/articles.ts`，全站样式位于 `app/globals.css`。
