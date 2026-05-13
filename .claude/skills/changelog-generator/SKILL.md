---
name: "changelog-generator"
description: "從 git commit 生成 changelog 或 release notes。使用時機：想知道這段時間改了什麼、要寫 release notes、整理 commit 紀錄。這個專案用 Conventional Commits（feat/fix/refactor/chore 等），輸出英文。"
---

# Changelog Generator

從 git commit history 生成可讀的 changelog。這個專案用 Conventional Commits，輸出英文。

## Conventional Commits 規則

支援的 type：

| Type | 用途 | Changelog 分類 |
|------|------|---------------|
| `feat` | 新功能 | Added |
| `fix` | 修 bug | Fixed |
| `refactor` | 重構（不改行為） | Changed |
| `perf` | 效能改善 | Changed |
| `style` | 樣式調整 | Changed |
| `docs` | 文件 | — （通常省略） |
| `test` | 測試 | — （通常省略） |
| `chore` | 雜項（依賴更新等） | — （通常省略） |
| `ci` | CI/CD 設定 | — （通常省略） |

Breaking change：在 type 後加 `!`，例如 `feat!: change API`

---

## 執行步驟

觸發後：

1. 確認要產生的範圍（上次 release 到現在？還是特定日期區間？）
2. 執行 git log 取得 commits
3. 過濾並分類
4. 輸出 changelog

### 常用 git 指令

```bash
# 從上次 tag 到現在
git log v1.0.0..HEAD --pretty=format:"%s" --no-merges

# 最近 N 個 commits
git log -20 --pretty=format:"%s" --no-merges

# 特定日期之後
git log --after="2026-01-01" --pretty=format:"%s" --no-merges

# 帶日期的完整格式
git log --pretty=format:"%ad %s" --date=short --no-merges
```

---

## 輸出格式

```markdown
## [Unreleased] — 2026-05-13

### Added
- feat: add Draft Mode API routes for Sanity preview
- feat: extract shared components (AboutSection, FactRow, NavItem)

### Fixed
- fix: sitemap uses publishedAt as lastModified instead of current time

### Changed
- refactor: NavItem changed from <button> to <a> anchor with href
- chore: migrate Studio to zzuhann.sanity.studio

---
```

**規則：**
- `docs`、`test`、`chore`、`ci` 預設不列入（太細節，讀者不在意）
- 每條 changelog 從使用者角度描述，不是實作細節
- Breaking change 用 ⚠️ 標示

---

## 個人部落格的版本策略

不需要嚴格的 SemVer。建議用日期作為版本識別：

```markdown
## 2026-05 Release

## 2026-04 Release
```

或者不加版本，只有 `[Unreleased]` 的滾動式 changelog。

---

## 執行範例

當使用者說「幫我生成 changelog」，執行：

```bash
git log --pretty=format:"%s" --no-merges -30
```

然後過濾 `feat`、`fix`、`refactor`、`perf`、`style` 開頭的 commits，分類輸出。省略 `chore`、`docs`、`test`、`ci`。
