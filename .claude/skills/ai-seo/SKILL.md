---
name: 'ai-seo'
description: '優化內容以被 AI 搜尋引擎引用 — ChatGPT、Perplexity、Google AI 總覽、Claude。適用於技術部落格文章想出現在 AI 生成答案中。不用於傳統 SEO 排名（用 seo-audit）。'
license: MIT
metadata:
  version: 2.0.0
  updated: 2026-05-13
---

# AI SEO（技術部落格情境）

你是生成式引擎優化（GEO）的專家，專注於讓「之翰の備忘錄」的技術文章被 AI 搜尋平台提取、引用。

這不是傳統 SEO。傳統 SEO 讓你被排名，AI SEO 讓你被引用。兩件事規則不同。

## Platform Context

- 平台：之翰の備忘錄（個人前端 / 軟體開發技術部落格）
- Tech stack：Next.js 16 App Router、Sanity CMS、Tailwind CSS 4
- 目標讀者：台灣前端工程師、軟體開發者
- 內容語言：繁體中文為主
- 文章類型：技術筆記、工具評測、軟體開發心得、生活隨筆

---

## 技術部落格的 AI 引用情境

**開發者的搜尋模式（台灣）：**

- 定義型：`Tailwind v4 和 v3 有什麼差別`、`Server Component 是什麼`
- 教學型：`Next.js App Router 怎麼用`、`Sanity CMS 設定教學`
- 除錯型：`pnpm workspace 怎麼設定`、`TypeScript noUncheckedIndexedAccess 是什麼`
- 比較型：`Vitest 和 Jest 差別`、`Tailwind 和 CSS Modules 哪個好`

**AI 引用偏好（技術內容）：**

- 有明確程式碼範例的文章比純文字更容易被提取
- 「這個問題的答案是 X，原因是 Y」的結構比敘事型更容易被引用
- 繁體中文技術文章比英文稀缺，AI 引用的競爭相對低

---

## 三大可引用性支柱

### 支柱一：結構（可提取）

AI 系統以區塊方式提取內容，不是整頁閱讀後再改寫：

| 查詢類型 | 最容易被引用的內容結構 |
|---------|----------------------|
| 「什麼是 X」 | 定義塊（前 200 字內，直接給答案） |
| 「如何做 X」 | 編號步驟（每步獨立完整） |
| 「X 和 Y 差別」 | 比較表格 |
| 「X 常見問題」 | FAQ 區塊 |
| 「X 的最佳做法」 | 條列清單 + 簡短說明 |

**不好的結構：**
> 「在這篇文章中，我們將探討...首先我們需要了解背景...」（鋪墊太多，答案埋在第三段）

**好的結構：**
> 「Server Component 是在 server 端渲染的 React 元件，不會打包進 client bundle。主要用於資料獲取和靜態 UI。」（前兩句就是答案）

### 支柱二：權威（值得引用）

- **原創觀點**：你自己踩過的坑、實際使用心得，比轉述官方文件更有引用價值
- **有程式碼的說明**：AI 系統對含有 code block 的技術文章有偏好
- **明確的結論**：「我推薦用 A 而不是 B，原因是...」比「兩者各有優缺點」更容易被引用
- **繁中稀缺性**：很多前端技術的繁中深度文章很少，競爭低

### 支柱三：可發現性（爬得到）

- **robots.txt 確認**：GPTBot、PerplexityBot、ClaudeBot、Google-Extended 不能被封鎖
- **靜態渲染**：Next.js App Router 的 Server Component 預設靜態渲染，對 AI 爬蟲友好
- **Schema markup**：`Article` / `BlogPosting` schema 幫助 AI 理解這是技術文章
- **頁面速度**：Vercel + Next.js 通常表現良好，但圖片最佳化要注意

---

## 模式一：AI 可見性稽核

### 步驟一 — 機器人存取確認

檢查 `/robots.txt`，確認以下爬蟲未被封鎖：

```
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /
```

### 步驟二 — 引用現況稽核

手動測試目標查詢（繁體中文），在以下平台記錄：

| 平台 | 測試方式 | 重要性 |
|------|---------|--------|
| Google AI 總覽 | 搜尋繁中技術查詢，看是否出現 AI 摘要 | 最高 |
| Perplexity | 搜尋後查看 Sources 面板 | 高 |
| ChatGPT（網路搜尋）| 開啟搜尋功能後查詢 | 中 |

### 步驟三 — 內容結構稽核

- [ ] 文章前 200 字是否就給出答案？
- [ ] 教學型文章是否有編號步驟？
- [ ] 是否有比較表格（適合比較型查詢）？
- [ ] 程式碼區塊是否有語言標記（\`\`\`tsx 等）？
- [ ] 是否實作 `Article` / `BlogPosting` schema？
- [ ] 文章是否有明確結論段落？

---

## 模式二：文章優化

### 技術文章的可引用寫法

**定義型（最容易被引用）：**

不好：「今天我們來介紹一個很有趣的概念...」

好：「**[技術名詞]** 是 [1–2 句定義]。[一句補充說明使用情境]。」

**教學型：**

- 步驟用編號，每步驟都能獨立理解
- 每步驟附上程式碼範例
- 結尾有完整程式碼或可運行的範例

**比較型：**

| | 選項 A | 選項 B |
|--|--------|--------|
| 適合場景 | | |
| 效能 | | |
| 學習曲線 | | |

比散文更容易被 AI 直接提取。

### Schema Markup 優先順序

| Schema 類型 | 適用頁面 | 影響 |
|------------|--------|------|
| `BlogPosting` | 每篇文章 | 高 — AI 識別為技術文章 |
| `BreadcrumbList` | 文章頁 | 中 — 幫助理解站內層級 |
| `Person` | 關於頁 | 中 — 建立作者實體 |
| `WebSite` | 首頁 | 低 — 基本站台資訊 |

---

## 模式三：監控

### 手動引用追蹤（每月）

針對你的核心主題，測試以下類型的查詢：

- `[你寫過的技術] 繁體中文`
- `Next.js [功能] 怎麼用 中文`
- `[工具] 教學 台灣`

記錄：是否被引用？哪個競爭者被引用？

### Google Search Console

「搜尋類型：AI 總覽」篩選器可看哪些文章觸發了 AI 總覽曝光。

---

## 主動觸發條件

- robots.txt 封鎖 AI 爬蟲 → 立即修復
- 文章缺少 `Article` schema → 建議補上
- 文章前 3 段都是鋪墊沒有答案 → 建議調整結構
- 文章沒有程式碼範例（技術型文章）→ 建議補充

---

## 相關 Skills

- **seo-audit**: 傳統 SEO 技術問題，和 AI SEO 互補
