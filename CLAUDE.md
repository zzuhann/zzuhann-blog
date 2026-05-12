# 個人部落格架構設計文件

> 根據需求訪談產出。定位：認真長期經營、生產等級品質、獨自維護。

---

## 一、目錄結構

```
my-blog/
├── app/                          # Next.js App Router
│   ├── (site)/                   # 前台 Route Group
│   │   ├── layout.tsx            # 全站 layout（含 ThemeProvider）
│   │   ├── page.tsx              # 首頁 /
│   │   ├── blog/
│   │   │   ├── page.tsx          # 文章列表 /blog
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # 文章詳頁 /blog/[slug]
│   │   ├── projects/
│   │   │   └── page.tsx          # 作品集 /projects
│   │   └── about/
│   │       └── page.tsx          # 關於我 /about
│   ├── studio/                   # Sanity Studio（後台）
│   │   └── [[...tool]]/
│   │       └── page.tsx
│   ├── api/
│   │   ├── revalidate/
│   │   │   └── route.ts          # Sanity webhook → on-demand revalidation
│   │   ├── draft/
│   │   │   └── route.ts          # Draft Mode enable
│   │   ├── disable-draft/
│   │   │   └── route.ts
│   │   └── rss/
│   │       └── route.ts          # RSS feed
│   ├── sitemap.ts                # 動態 sitemap
│   ├── robots.ts
│   └── not-found.tsx
│
├── components/
│   ├── layout/                   # 全站 UI 骨架
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── MobileNav.tsx
│   ├── home/                     # 首頁區塊
│   │   ├── HeroSection.tsx
│   │   ├── FeaturedPosts.tsx
│   │   └── FeaturedProjects.tsx
│   ├── blog/                     # 文章相關
│   │   ├── PostCard.tsx
│   │   ├── PostList.tsx
│   │   ├── PostHeader.tsx
│   │   ├── PortableTextRenderer.tsx
│   │   └── TableOfContents.tsx
│   ├── projects/                 # 作品集相關
│   │   ├── ProjectCard.tsx
│   │   └── ProjectGrid.tsx
│   ├── about/                    # 關於我
│   │   └── AboutContent.tsx
│   └── ui/                       # 通用元件
│       ├── Button.tsx
│       ├── Tag.tsx
│       ├── Image.tsx             # 封裝 next/image + sanity image url
│       └── AnimatedSection.tsx   # Framer Motion 包裝器
│
├── lib/
│   ├── sanity/
│   │   ├── client.ts             # Sanity client（含 preview client）
│   │   ├── queries.ts            # 所有 GROQ queries
│   │   ├── image.ts              # @sanity/image-url helper
│   │   └── types.ts              # 從 schema 衍生的 TypeScript 型別
│   ├── theme.ts                  # Dark mode 常數
│   └── utils.ts                  # 通用工具函式
│
├── sanity/
│   ├── schemaTypes/
│   │   ├── post.ts
│   │   ├── project.ts
│   │   ├── about.ts
│   │   └── index.ts
│   ├── plugins/                  # 自訂 Sanity plugins
│   └── sanity.config.ts
│
├── hooks/
│   └── useTheme.ts               # Dark mode hook（或直接用 next-themes）
│
├── types/
│   └── index.ts                  # 全域型別定義
│
└── __tests__/                    # 測試（詳見第五節）
    ├── components/
    ├── lib/
    └── e2e/
```

---

## 二、Component 設計原則

採用**功能導向拆分**，按頁面/區塊組織，而非嚴格 Atomic Design。

### 拆分判斷規則

```
需要拆成獨立 component 的條件（滿足一個即可）：
  ✅ 在兩個以上頁面被重複使用
  ✅ 有自己的資料獲取邏輯（async component）
  ✅ 有複雜的動畫或互動狀態
  ✅ 超過 ~100 行且邏輯上可獨立命名

不需要拆的情況：
  ❌ 只為了縮短行數
  ❌ 沒有獨立語意的 JSX 片段
```

### Server / Client Component 分界

```
Server Component（預設）：
  - 頁面層級（page.tsx）
  - 資料獲取（GROQ query 在這層執行）
  - 靜態 UI（PostCard, ProjectCard 等）

Client Component（加 "use client"）：
  - ThemeToggle（需要 state）
  - MobileNav（需要 state）
  - AnimatedSection（Framer Motion 需要 client）
  - TableOfContents（需要 scroll listener）
```

### Props 設計規範

```typescript
// ✅ 明確定義，不用 any
interface PostCardProps {
  post: Pick<Post, 'title' | 'slug' | 'publishedAt' | 'excerpt' | 'coverImage' | 'tags'>
  featured?: boolean
}

// ✅ 資料型別從 Sanity schema 衍生，單一來源
// lib/sanity/types.ts 統一管理
```

---

## 三、資料層設計

### Sanity Client 設定

```typescript
// lib/sanity/client.ts
import { createClient } from 'next-sanity'

// 一般讀取用（帶 CDN cache）
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
})

// Draft Mode 用（不走 CDN，取得未發布內容）
export const previewClient = createClient({
  ...client.config(),
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})

export function getClient(preview = false) {
  return preview ? previewClient : client
}
```

### GROQ Queries 管理

所有 query 集中在 `lib/sanity/queries.ts`，不散落在各頁面：

```typescript
// lib/sanity/queries.ts
export const ALL_POSTS_QUERY = `
  *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id, title, slug, publishedAt, excerpt, coverImage, tags
  }
`

export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, body, publishedAt, coverImage, tags,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
  }
`
// ... 其他 queries
```

### Revalidation 策略

用 **on-demand revalidation**，透過 Sanity webhook 觸發：

```
Sanity 發布文章
  → POST /api/revalidate（帶 secret token 驗證）
  → revalidatePath('/blog')
  → revalidatePath('/blog/[slug]')
  → revalidatePath('/')  // 首頁的 Featured Posts
```

不用 `revalidate = 60` 這種 time-based 方式，避免不必要的 re-render。

---

## 四、TypeScript 設定

使用 strict mode，`tsconfig.json` 關鍵設定：

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### 型別衍生原則

**Sanity schema 是唯一來源**，從 schema 自動產生型別（用 `sanity typegen`），不手動重複定義：

```bash
# package.json scripts
"typegen": "sanity typegen generate"
```

這樣 schema 改動時，TypeScript 會自動提示型別錯誤，不會漏改。

---

## 五、測試策略

針對個人部落格，建議以下**輕量但有效**的測試組合：

### 工具

| 層級 | 工具 | 用途 |
|------|------|------|
| Unit / Component | **Vitest + React Testing Library** | 純邏輯、utility 函式、關鍵 UI component |
| E2E | **Playwright** | 核心使用者流程 |

不引入 Storybook（獨自維護、個人專案，CP 值不高）。

### 測試重點

```
✅ 要測試的：
  - lib/utils.ts 的工具函式（純函式，最容易寫）
  - GROQ query 回傳資料的型別轉換邏輯
  - PostCard, ProjectCard 的 render 正確性
  - Dark mode toggle 狀態切換

✅ E2E 要涵蓋的流程：
  - 首頁正常載入，顯示文章列表
  - 點擊文章 → 進入詳頁 → 標題正確
  - /about, /projects 頁面正常載入
  - Dark mode 切換後，reload 仍保持狀態

❌ 不用測試的：
  - Sanity Studio UI（第三方，不用測）
  - next/image, next/font 等 Next.js 內建功能
  - Framer Motion 動畫效果
```

### 測試覆蓋率目標

不追求 100%，重要邏輯達到 **70%+** 即可。個人專案的測試價值在於「防止自己改壞東西」，而不是合規要求。

---

## 六、CI/CD 流程（GitHub Actions）

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile
      - run: pnpm lint           # ESLint
      - run: pnpm type-check     # tsc --noEmit
      - run: pnpm test           # Vitest

  e2e:
    runs-on: ubuntu-latest
    needs: quality              # quality 過了才跑 E2E
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm playwright install --with-deps
      - run: pnpm test:e2e
```

**Vercel 本身會自動處理 Preview Deploy**（PR 開啟時自動部署預覽連結），不需要在 CI 裡另外設定。

---

## 七、Dark Mode 設計

使用 **`next-themes`**，最省力且與 App Router 相容：

```tsx
// app/(site)/layout.tsx
import { ThemeProvider } from 'next-themes'

export default function SiteLayout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}
```

Tailwind 設定 `darkMode: 'class'`，用 `dark:` prefix 處理所有 dark 樣式。

系統偏好自動偵測，手動切換後儲存在 localStorage，**不需要後端**。

---

## 八、環境變數管理

```bash
# .env.local（不 commit）
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=          # Draft Mode 用
SANITY_REVALIDATE_SECRET=       # Webhook 驗證用

# .env.example（commit，給自己備忘）
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=
SANITY_REVALIDATE_SECRET=
```

---

## 九、決策摘要

| 面向 | 決策 | 理由 |
|------|------|------|
| Component 組織 | 功能導向 / 頁面分區 | 獨自維護，直覺易找 |
| 資料獲取 | Server Component + GROQ | 減少 client bundle，SEO 友好 |
| Revalidation | On-demand webhook | 發布即生效，不浪費 API quota |
| 型別來源 | Sanity typegen | 單一來源，schema 改動自動同步 |
| 測試 | Vitest + Playwright（不含 Storybook） | 個人專案 CP 值最高組合 |
| Dark mode | next-themes + Tailwind class | 最少設定，完整功能 |
| CI | lint + typecheck + test + E2E | 生產等級，Vercel preview 自動處理 |

## 十、使用繁體中文