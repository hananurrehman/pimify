import { test, expect } from '@playwright/test';

test('Verify user is logged in successfully', async ({page}) => {
  await page.goto('')
  await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible()
})
