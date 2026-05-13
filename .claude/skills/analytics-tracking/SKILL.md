---
name: "analytics-tracking"
description: "設定或稽核 Google Analytics 4 追蹤。使用時機：想加 GA4、追蹤不到數據、想知道哪些事件要追蹤。這個專案用 Next.js App Router，偏好 @next/third-parties/google 而非 GTM。"
license: MIT
metadata:
  version: 2.0.0
  updated: 2026-05-13
---

# Analytics Tracking

為「之翰の備忘錄」設定 GA4 追蹤。個人部落格不需要 GTM 或複雜的 event taxonomy，直接用 `@next/third-parties/google` 最省力。

## Platform Context

- 平台：個人技術部落格
- Tech stack：Next.js 16 App Router、Vercel
- 方案：GA4 直接整合（不用 GTM）
- 套件：`@next/third-parties/google`（Next.js 官方推薦）

---

## 設定 GA4（從零開始）

### 步驟一：建立 GA4 Property

1. 開 [analytics.google.com](https://analytics.google.com)
2. 建立新 Property → 選「Web」
3. 填入網站 URL
4. 取得 **Measurement ID**（格式：`G-XXXXXXXXXX`）

### 步驟二：安裝套件

```bash
pnpm add @next/third-parties
```

### 步驟三：加入 `app/layout.tsx`

```tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  )
}
```

### 步驟四：加環境變數

```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Vercel 部署時也要在 Environment Variables 加上這個值。GA4 元件用 `process.env.NEXT_PUBLIC_GA_ID` 判斷，本地開發不需要追蹤時留空即可。

---

## 個人部落格值得追蹤的事件

GA4 預設已追蹤：page_view、scroll（90%）、session_start、user_engagement。

**額外值得追蹤（選做）：**

| 事件 | 說明 | 實作方式 |
|------|------|---------|
| `article_read` | 讀完一篇文章（scroll 90% 以上） | GA4 預設 scroll 事件已涵蓋 |
| `outbound_click` | 點擊外部連結 | GA4 Enhanced Measurement 預設開啟 |
| `search` | 站內搜尋（如果有的話） | 手動送 event |

大多數對個人部落格有意義的數據，GA4 預設就會追蹤，不需要額外 code。

**Enhanced Measurement 確認開啟（GA4 後台）：**

GA4 → Admin → Data Streams → 選你的 stream → Enhanced Measurement
確認以下開啟：
- ✅ Page views
- ✅ Scrolls
- ✅ Outbound clicks
- ✅ Site search（如果有搜尋功能）

---

## 稽核現有追蹤

如果追蹤已設定但懷疑數據不對：

1. **即時驗證**：GA4 → Reports → Realtime，打開網站確認有數據進來
2. **DebugView**：GA4 → Admin → DebugView，在 URL 加 `?_gl=debug` 查看詳細事件
3. **常見問題**：
   - `NEXT_PUBLIC_GA_ID` 沒設定 → GA 元件不渲染
   - 本地開發環境送了測試數據 → 用條件判斷 `process.env.NODE_ENV === 'production'`
   - Vercel Preview Deploy 污染數據 → 在 GA4 過濾 preview URL

---

## 主動觸發條件

- 新增 `NEXT_PUBLIC_GA_ID` 環境變數但 layout 沒加 GA 元件 → 提醒加
- `app/layout.tsx` 有 GA 元件但沒有環境變數判斷 → 提醒加條件（避免開發環境追蹤）

---

## 相關 Skills

- **seo-audit** — SEO 稽核，和 analytics 互補
