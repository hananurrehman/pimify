import { test, expect } from '@playwright/test';

test('Login with valid credentials', async ({page}) => {
  await page.goto('http://localhost:8000/')
  await page.locator('#id_username').fill('admin')
  await page.locator('#id_password').fill('1qaz2wsx')
  await page.getByRole('button', { name: 'Log In' }).click()
  await expect(page.getByRole('link', { name: '' })).toBeInViewport()
})
