import { test, expect } from '@playwright/test'

test.describe('頁面導航', () => {
  test('首頁正常載入', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/zzuhann's space/)
    await expect(page.getByRole('banner').getByText('zzuhann\'s space')).toBeVisible()
  })

  test('文章列表頁正常載入', async ({ page }) => {
    await page.goto('/blog')
    await expect(page).toHaveTitle(/文章/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('專案頁正常載入', async ({ page }) => {
    await page.goto('/projects')
    await expect(page).toHaveTitle(/專案/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('關於頁正常載入', async ({ page }) => {
    await page.goto('/about')
    await expect(page).toHaveTitle(/關於/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('Header nav 連結正確（桌機）', async ({ page }) => {
    const viewport = page.viewportSize()
    test.skip((viewport?.width ?? 1280) < 768, 'desktop only')
    await page.goto('/')
    await page.getByRole('navigation').getByRole('link', { name: /文章/ }).click()
    await expect(page).toHaveURL('/blog')
  })

  test('MobileNav 漢堡選單可正常導航', async ({ page }) => {
    const viewport = page.viewportSize()
    test.skip((viewport?.width ?? 1280) >= 768, 'mobile only')
    await page.goto('/')
    await page.getByRole('button', { name: '開啟選單' }).click()
    await page.getByRole('link', { name: /文章/ }).first().click()
    await expect(page).toHaveURL('/blog')
  })

  test('404 頁面正常顯示', async ({ page }) => {
    await page.goto('/this-page-does-not-exist')
    await expect(page.getByText('找不到這頁。')).toBeVisible()
  })
})
