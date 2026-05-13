---
name: web-quality-audit
description: 全站品質稽核：效能、可及性、SEO、最佳實踐。使用時機：「部署前做一次全面檢查」、「audit 我的網站」、「Lighthouse 稽核」、「網站品質有沒有問題」。
license: MIT
metadata:
  version: 2.0.0
  updated: 2026-05-13
---

# Web Quality Audit

全站品質審查。基於 Google Lighthouse 四大維度，對這個專案的 tech stack 做針對性檢查。

## Platform Context

- 平台：之翰の備忘錄（個人技術部落格）
- Tech stack：Next.js 16 App Router、Sanity CMS、Tailwind CSS 4、Vercel
- 部署：Vercel（自動靜態生成 + Serverless Functions）
- 字型：Noto Serif TC、Noto Sans TC、EB Garamond、JetBrains Mono（Google Fonts）

---

## 稽核維度

### 1. 效能 Performance

**Core Web Vitals（必須通過）**

| 指標 | 目標 | 常見原因 |
|------|------|--------|
| LCP < 2.5s | 最大內容繪製 | 字型載入阻塞、圖片未最佳化 |
| CLS < 0.1 | 版面位移 | 字型 FOUT、圖片無固定尺寸 |
| INP < 200ms | 互動延遲 | 過多 client JS、長任務 |

**這個專案的常見效能問題：**

- Google Fonts 有沒有用 `display=swap` 並 preload？（`app/layout.tsx`）
- `next/image` 有沒有設定 `width`/`height` 或 `fill` 避免 CLS？
- Sanity 圖片有沒有透過 `@sanity/image-url` 最佳化尺寸？
- 字型是否限制 `subset`（只載入需要的字元範圍）？

**Server Component 優勢確認：**
- 確認沒有把不必要的東西加 `"use client"`（會增加 client bundle）
- 目前 client component 只有 `MobileNav`，確認沒有新增

### 2. 可及性 Accessibility

→ 詳細稽核請用 `/a11y-audit`（專門 skill）

快速確認：

- [ ] `<html lang="zh-Hant">` 有設定
- [ ] 每頁有 `<main id="main-content">`
- [ ] Layout 有 skip-to-content 連結
- [ ] 所有圖片有 `alt`
- [ ] heading 層級不跳號（h1 → h2 → h3）
- [ ] 互動元素有 focus 樣式

### 3. SEO

→ 詳細稽核請用 `/seo-audit`（專門 skill）

快速確認：

- [ ] 每頁 `generateMetadata()` 有 title + description
- [ ] `/robots.txt` 允許主要爬蟲
- [ ] `/sitemap.xml` 包含所有文章和專案
- [ ] `NEXT_PUBLIC_SITE_URL` 已設定（sitemap base URL）

### 4. 最佳實踐 Best Practices

**安全性：**
- Vercel 預設 HTTPS，不需要手動設定
- `.env.local` 不應被 commit（已在 `.gitignore`）
- API route（`/api/revalidate`）有 secret token 驗證

**現代標準：**
- `<meta charset="UTF-8">` 是否存在
- 瀏覽器 console 有無錯誤
- 無廢棄 API 使用

---

## 嚴重程度

| 層級 | 定義 | 處理時機 |
|------|------|---------|
| Critical | 功能失效、安全漏洞 | 立即修 |
| High | Core Web Vitals 不過、主要 a11y 障礙 | 上線前修 |
| Medium | 效能優化機會、SEO 改善 | 近期 sprint |
| Low | 小型優化 | 有空再做 |

---

## 輸出格式

```
## 品質稽核報告

### 摘要
- 整體評估
- 前 3 個優先問題

### Critical（X 個）
[問題] 描述 — 檔案：path/to/file.tsx
[影響] 說明
[修正] 具體做法

### High / Medium / Low
（同格式）

### 優先行動清單
1. 必須修（上線前）
2. 近期處理
3. 長期優化
```

---

## 部署前快速清單

- [ ] `pnpm type-check` 通過
- [ ] `pnpm lint` 通過
- [ ] `pnpm test` 通過
- [ ] `pnpm build` 成功（沒有 build error）
- [ ] Core Web Vitals 用 PageSpeed Insights 測試
- [ ] 文章頁 meta tags 正確（用瀏覽器開發工具確認）
- [ ] `/sitemap.xml` 包含最新文章

---

## 相關 Skills

- **a11y-audit** — 深度可及性稽核（WCAG 2.2）
- **seo-audit** — 深度 SEO 稽核
- **ai-seo** — AI 搜尋引擎引用優化
