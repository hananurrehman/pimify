import { test, expect } from "@playwright/test";

test(
	"Create a product with all fields filled in",
	{ tag: "@regression" },
	async ({ page }) => {
		await page.goto("");
		await page.getByRole("link", { name: "box Products" }).click();
		await page.getByRole("link", { name: "add" }).click();
		await page.locator("#id_name").fill("Test Product 001");
		await page.locator("#id_sku").fill("TEST001");
		await page.locator("#id_description").fill("Lorem ipsum dolor");
		await page.locator("#id_price_0").fill("5");
		await page.getByRole("option", { name: "Test Cat", exact: true }).click();
        await page.getByRole('button', { name: 'Save', exact: true }).click()
        await expect(page.locator('td').filter({ hasText: 'test' })).toBeVisible()
	}
);
