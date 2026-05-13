# 之翰の備忘錄

一份關於介面、程式碼與閱讀的個人技術期刊。

## 技術堆疊

- **Next.js 16** — App Router，Server Components 優先
- **TypeScript 5** — strict + noUncheckedIndexedAccess + exactOptionalPropertyTypes
- **Tailwind CSS 4** — CSS `@theme` token 設定（無 tailwind.config.ts）
- **Sanity v3** — CMS，on-demand revalidation via webhook
- **pnpm** — 套件管理

字型：Noto Serif TC（標題）· Noto Sans TC（內文）· EB Garamond（拉丁斜體點綴）· JetBrains Mono（元資料）

## 目錄結構

```
app/
├── (site)/               # 前台 Route Group
│   ├── layout.tsx        # Header + Footer
│   ├── page.tsx          # 首頁 /
│   ├── blog/             # /blog 與 /blog/[slug]
│   ├── projects/         # /projects 與 /projects/[slug]
│   └── about/            # /about
├── studio/               # Sanity Studio /studio
├── api/
│   ├── revalidate/       # Sanity webhook → on-demand revalidation
│   └── rss/              # RSS feed
├── sitemap.ts
└── robots.ts

components/
├── layout/               # Header, Footer, MobileNav
├── home/                 # HeroSection, FeaturedPosts, FeaturedProjects, AboutPreview
├── blog/                 # PortableTextRenderer
├── projects/             # ProjectCard
└── ui/                   # SectionHead, PageHead, Tag

lib/sanity/               # client, queries, image helper, types
sanity/schemaTypes/       # post, project, about
docs/colors.md            # 色彩設計系統文件
```

## 本地開發

**1. 安裝依賴**

```bash
pnpm install
```

**2. 建立環境變數**

```bash
cp .env.example .env.local
```

填入以下變數：

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=        # Draft Mode 用
SANITY_REVALIDATE_SECRET=     # Webhook 驗證用
NEXT_PUBLIC_SITE_URL=         # 正式環境 URL（sitemap 用）
```

**3. 啟動**

```bash
pnpm dev
```

開啟 [http://localhost:3000](http://localhost:3000)。Sanity Studio 位於 [http://localhost:3000/studio](http://localhost:3000/studio)。

## Scripts

| 指令 | 說明 |
|------|------|
| `pnpm dev` | 本地開發 |
| `pnpm build` | 正式建置 |
| `pnpm lint` | ESLint |
| `pnpm type-check` | TypeScript 型別檢查 |
| `pnpm typegen` | 從 Sanity schema 產生型別 |

## 色彩設計系統

完整文件見 [`docs/colors.md`](docs/colors.md)。

| Token | Hex | 用途 |
|-------|-----|------|
| `--bg` | `#F7F3EE` | 頁面底色（紙白） |
| `--bg-soft` | `#F1ECE4` | 替換式區塊（米白） |
| `--surface` | `#FFFFFF` | 卡片、浮起層 |
| `--text` | `#1F1F1F` | 標題、強調（墨黑） |
| `--text-body` | `#4A4A4A` | UI 內文、段落文字（書灰）|
| `--text-muted` | `#6B6B6B` | 次要文字 |
| `--text-soft` | `#9A9A9A` | 元資料（日期、編號） |
| `--accent` | `#4A6FA5` | 連結、強調（青藍） |
| `--accent-ink` | `#2F4D78` | hover、內嵌程式碼 |

Tailwind 4 使用方式：`bg-paper`、`text-ink`、`text-ink-muted`、`text-accent` 等。

## Sanity 設定

在 Sanity 管理後台設定 webhook，發布文章時呼叫：

```
POST https://your-domain.com/api/revalidate?secret=SANITY_REVALIDATE_SECRET
```

## 部署

透過 Vercel 部署，PR 開啟時自動產生 Preview Deploy。環境變數在 Vercel 後台設定。
# zzuhann-blog
