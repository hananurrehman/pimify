import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, './user.json');
const username = process.env.DJANGO_SUPERUSER_USERNAME ?? ''
const password = process.env.DJANGO_SUPERUSER_PASSWORD ?? ''

setup('Login admin user', async ({ page }) => {
    await page.goto('');
    await page.locator('#id_username').fill(username)
    await page.locator('#id_password').fill(password)
    await page.getByRole('button', { name: 'Log In' }).click()
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible()
    await page.context().storageState({ path: authFile });
});