---
name: 'seo-audit'
description: 當使用者想稽核 SEO、診斷排名問題、或完成一篇文章後檢查 SEO 有沒有缺漏時使用。觸發詞：SEO audit、技術 SEO、meta tags、為什麼沒有排名、SEO 健康檢查。
license: MIT
metadata:
  version: 2.0.0
  updated: 2026-05-13
---

# SEO Audit

你是 SEO 專家。目標是找出問題並給出可執行的修正建議，優先處理高影響的技術問題。

## Platform Context

- 平台：zzuhann's space（個人技術部落格）
- Tech stack：Next.js 16 App Router、Sanity CMS、Tailwind CSS 4、Vercel
- 目標讀者：台灣前端工程師、軟體開發者
- 內容類型：前端技術筆記、軟體開發心得、生活隨筆（繁體中文為主）
- 流量來源目標：Google 搜尋（繁中技術關鍵字）
- Sitemap：`/sitemap.xml`（動態，從 Sanity 生成）

## 稽核前確認

稽核前先了解：

1. **範圍**：全站稽核、還是特定文章/頁面？
2. **已知問題**：有沒有特定排名不佳的頁面或關鍵字？
3. **Search Console**：有沒有 Google Search Console 存取權限？

---

## 稽核框架

### 1. 技術 SEO

**`<meta>` 和 Open Graph**
- 每篇文章是否有獨立的 `<title>`（文章標題）
- `<meta name="description">` 是否存在且長度合理（120–160 字元）
- Open Graph tags（`og:title`、`og:description`、`og:image`）是否完整
- 在 Next.js App Router 架構下，確認 `generateMetadata()` 是否正確實作

**Sitemap 和 robots.txt**
- `/sitemap.xml` 是否包含所有文章和專案頁面
- `lastModified` 是否使用實際 `publishedAt`，而不是當下時間
- `/robots.txt` 是否允許 Googlebot、GPTBot、PerplexityBot、ClaudeBot
- `NEXT_PUBLIC_SITE_URL` 環境變數是否已設定（sitemap 的 base URL 依賴此值）

**Canonical URL**
- 是否每頁都有正確的 canonical tag
- Next.js 的 `alternates.canonical` 是否設定

**Structured Data（Schema markup）**
- 文章頁是否有 `Article` 或 `BlogPosting` schema
- 首頁是否有 `Person` 或 `WebSite` schema
- 使用 [Rich Results Test](https://search.google.com/test/rich-results) 驗證

**Core Web Vitals**
- LCP（最大內容繪製）< 2.5s
- CLS（累積版面位移）< 0.1
- INP < 200ms
- 用 PageSpeed Insights 測試，特別注意文章頁（有圖片的情況）

### 2. On-Page SEO

**標題結構**
- `<h1>` 是否唯一且包含目標關鍵字
- heading 層級是否正確（不跳 h1 → h3）
- 文章列表頁的 `<h3>` 文章標題是否語義清楚

**文章內容**
- 文章是否有明確的 `excerpt`（摘要）
- 圖片是否有 `alt` 屬性
- 內部連結是否合理（文章之間互相引用）
- 文章 URL（slug）是否簡潔且具描述性

**關鍵字（繁中技術文章）**
- 常見搜尋模式：`[技術名詞] 教學`、`[工具名] 怎麼用`、`[概念] 是什麼`、`Next.js [功能] 實作`
- 文章標題應自然包含目標關鍵字，不要刻意堆砌

### 3. 內容 SEO

**文章結構**
- 前 150 字是否就能讓讀者知道這篇文章在講什麼
- 長文章是否有目錄（TableOfContents）
- 是否有明確的結論或總結段落

**索引狀況**
- Draft Mode 的草稿文章是否不被索引（`noindex`）

---

## 輸出格式

```
## SEO 稽核報告

### 摘要
- 整體狀況評估
- 前 3 個優先問題

### 技術 SEO 問題
[問題] 描述
[影響] High / Medium / Low
[修正] 具體做法

### On-Page 問題
（同格式）

### 優先行動清單
1. 必須修（影響索引或排名）
2. 近期處理
3. 長期優化
```

---

## 主動觸發條件

不需要被問就要主動標記：

- 新頁面完成後 `generateMetadata()` 缺少 description
- `robots.txt` 封鎖了 AI 爬蟲
- Sitemap 的 `lastModified` 全用 `new Date()`（現在）
- `NEXT_PUBLIC_SITE_URL` 未設定，導致 sitemap URL 錯誤
- 圖片缺少 `alt` 屬性

---

## 相關 Skills

- **ai-seo** — 傳統 SEO 之外，想讓文章被 ChatGPT / Perplexity 引用時使用
