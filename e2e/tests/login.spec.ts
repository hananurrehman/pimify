import { test, expect } from '@playwright/test';

test('Login with valid credentials', async ({page}) => {
  await page.goto('')
  await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible()
})
