---
name: "senior-architect"
description: Architecture review for Next.js / React projects. Use when the user asks to review architecture before a new feature, run a health check, or review design before a code review. Outputs a prioritized issue list; deep-dives only when the user asks.
---

# Senior Architect

架構審查技能。適用情境：

- 開新功能前確認設計方向
- 定期架構健康檢查
- code review 前確認有沒有設計問題

## 行為規則

**預設輸出（精簡）**：列出所有問題，每個問題附帶「成因 / 為何有問題 / 如何調整」三行說明，按優先序排列。不輸出完整分析報告。

**深入討論**：只有在使用者指定某個問題後，才展開完整分析、討論選項、提供程式碼範例。

**不自動修改程式碼**：分析並報告，和使用者討論後再行動。

---

## 輸出格式

```
## 架構審查 — [日期或功能名稱]

[P1] 標題 — 緊急程度說明
成因：為什麼會發生這個問題
為何有問題：不處理的後果
如何調整：一句話方向（不展開細節）

[P2] ...

---
指定編號（例如「討論 P1」）可展開完整分析。
```

優先序定義：
- **P1** — 上線前必須處理，否則功能缺失或有 bug
- **P2** — 近期 sprint 內處理，不處理會累積技術債
- **P3** — 有空再做，現在不影響運作

---

## 掃描清單

### 1. Next.js App Router 結構

**Route Group 使用是否合理**
- `(site)` 等 Route Group 應只用於共用 layout，不應跨 group 共享 data fetching 邏輯

**Server / Client Component 邊界**
- 掃描所有 `"use client"` 檔案：是否真的需要 client？（有 state/event handler/browser API 才需要）
- 掃描 Server Component：是否有不該出現的 `useState`、`useEffect`、`onClick`
- `page.tsx` 應只做資料獲取 + 組裝，不應含 UI 互動邏輯

**API Routes 完整性**
- 對照 CLAUDE.md 或設計文件列出的應有路由，確認是否都存在
- 常見缺失：`/api/draft`、`/api/disable-draft`（Draft Mode）、`/api/rss`

**`page.tsx` 是否混入業務邏輯**
- GROQ query 應在 `lib/sanity/queries.ts`，不應散落在 page 檔案裡
- 複雜的資料轉換邏輯應抽到 `lib/utils.ts` 或專用 helper

### 2. 元件設計

**元件過大（超過 150 行）**
- 是否有多個獨立職責可以拆分

**`"use client"` 邊界過高**
- 如果只有子元件需要互動，不應在父層加 `"use client"`，會讓整棵 subtree 變 client

**Props 設計**
- 是否使用 `any`
- 是否用 `Pick<T>` 精確限制，而不是傳整個型別進去

### 3. 資料層

**GROQ Query 集中度**
- 所有 query 是否都在 `lib/sanity/queries.ts`

**型別是否從 schema 衍生**
- 是否有手動重複定義的型別，和 Sanity schema 脫節

**Revalidation 覆蓋**
- `/api/revalidate` 是否涵蓋所有需要更新的路徑（`/`、`/blog`、`/blog/[slug]` 等）

### 4. 依賴與耦合

**循環依賴**
- A import B、B import A 的情況

**元件直接 import 資料層**
- `components/` 裡的元件不應直接呼叫 `getClient()` 或執行 GROQ query
- 資料應從 `page.tsx` 傳下來作為 props

### 5. TypeScript 嚴格度

**是否有 `any` 或型別斷言 `as X`**
- 找出所有 `any`、`as unknown as`、`// @ts-ignore`

**`noUncheckedIndexedAccess` 是否被繞過**
- 陣列存取是否有做 null check（`arr[0]?.xxx`）

### 6. 測試覆蓋缺口

**新元件是否缺少對應測試**
- 有 render 邏輯的 UI 元件是否有 Vitest + RTL 測試

**E2E 是否涵蓋新功能的核心流程**
- 新頁面是否加入 `navigation.spec.ts` 或對應 spec 檔

---

## 執行步驟

觸發後依序做以下事情：

1. 讀取 `CLAUDE.md`（或 README）了解設計意圖
2. 用 `find` 列出所有 `.ts` / `.tsx` 檔案
3. 針對掃描清單逐項檢查（直接讀檔，不依賴 Python 腳本）
4. 整理成精簡格式輸出
5. 最後加一行：「指定編號（例如『討論 P1』）可展開完整分析。」

---

## 範例輸出

```
## 架構審查 — 2026-05-13

[P1] Draft Mode API 路由缺失 — 上線前必須補
成因：lib/sanity/client.ts 已有 previewClient，但 /api/draft 和 /api/disable-draft 路由不存在。
為何有問題：無法啟用 Sanity Draft Mode，無法預覽未發布的文章。
如何調整：新增兩個 route.ts，分別呼叫 draftMode().enable() 和 draftMode().disable()。

[P2] PortableTextRenderer 未來拆分風險
成因：所有 Portable Text block 型別（code、image、callout）都寫在同一個檔案裡。
為何有問題：每新增一種 block type 就讓這個檔案變大，超過 150 行後維護難度增加。
如何調整：在 components/blog/renderers/ 建立各自的 renderer 元件，主檔只保留 components map。

[P3] sitemap.ts 未接動態資料
成因：sitemap.ts 目前可能回傳空陣列或靜態路徑，尚未呼叫 ALL_POSTS_QUERY。
為何有問題：搜尋引擎無法索引文章頁面，SEO 效果打折。
如何調整：在 sitemap.ts 呼叫 Sanity client 取得所有 post/project slug，動態生成 URL 清單。

---
指定編號（例如「討論 P1」）可展開完整分析。
```
