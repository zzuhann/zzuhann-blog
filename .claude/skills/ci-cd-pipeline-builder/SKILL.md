---
name: "ci-cd-pipeline-builder"
description: "建立或更新 GitHub Actions CI/CD pipeline。使用時機：設定 CI、修改 workflow、新增 CI 步驟。這個專案用 pnpm + Next.js + Vitest + Playwright，部署到 Vercel。"
---

# CI/CD Pipeline Builder

為「之翰の備忘錄」建立和維護 GitHub Actions CI pipeline。

## Platform Context

- Repo：GitHub
- CI 平台：GitHub Actions
- Package manager：pnpm
- 部署：Vercel（自動處理 Preview Deploy，不需要在 CI 裡設定）
- 測試：Vitest（unit）+ Playwright（E2E，chromium + Pixel 5）

## 可用指令（來自 package.json）

```
pnpm lint          → ESLint
pnpm type-check    → tsc --noEmit
pnpm test          → vitest run
pnpm test:e2e      → playwright test
pnpm build         → next build
```

---

## Pipeline 設計原則

1. **quality job 先跑**：lint → type-check → test → build，全過才跑 E2E
2. **E2E 依賴 quality**：`needs: quality`，避免不必要的 Playwright 安裝
3. **build 在 quality job 跑**：確認 production build 沒問題，而不是只跑測試
4. **Vercel 自動處理部署**：CI 不負責 deploy，只負責品質把關

---

## 標準 Pipeline（`.github/workflows/ci.yml`）

```yaml
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

      - uses: pnpm/action-setup@v4
        with:
          version: latest

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile

      - run: pnpm lint
      - run: pnpm type-check
      - run: pnpm test
      - run: pnpm build
        env:
          NEXT_PUBLIC_SANITY_PROJECT_ID: ${{ secrets.NEXT_PUBLIC_SANITY_PROJECT_ID }}
          NEXT_PUBLIC_SANITY_DATASET: ${{ secrets.NEXT_PUBLIC_SANITY_DATASET }}

  e2e:
    runs-on: ubuntu-latest
    needs: quality
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: latest

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile
      - run: pnpm playwright install --with-deps chromium

      - run: pnpm test:e2e
        env:
          NEXT_PUBLIC_SANITY_PROJECT_ID: ${{ secrets.NEXT_PUBLIC_SANITY_PROJECT_ID }}
          NEXT_PUBLIC_SANITY_DATASET: ${{ secrets.NEXT_PUBLIC_SANITY_DATASET }}

      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7
```

---

## GitHub Secrets 需要設定

在 GitHub repo → Settings → Secrets and variables → Actions 加入：

| Secret 名稱 | 值 | 說明 |
|------------|-----|------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `1sn0s7r2` | build 時需要 |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | build 時需要 |

`SANITY_API_READ_TOKEN` 和 `SANITY_REVALIDATE_SECRET` 在 CI build 時不需要（只在 runtime 用）。

---

## 執行步驟

觸發後：

1. 確認 `.github/workflows/ci.yml` 是否存在
2. 如果不存在：建立上面的標準 pipeline
3. 如果存在：讀取現有內容，檢查是否符合設計原則，列出需要調整的地方
4. 最後提醒要在 GitHub repo 設定 Secrets

---

## 常見問題

**build 在 CI 失敗但本地沒問題：**
通常是環境變數沒設定。確認 `NEXT_PUBLIC_*` 的 secrets 都有加。

**Playwright 測試不穩定：**
E2E 測試依賴 dev server 啟動，`playwright.config.ts` 已設定 `webServer`，確認 port 沒有被其他 job 佔用。

**pnpm 版本不符：**
使用 `pnpm/action-setup@v4` 並指定 `version: latest` 或鎖定具體版本。
