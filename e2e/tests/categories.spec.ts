import { test, expect } from "@playwright/test";
import Categories from "../pages/categories.page";

test.describe("Categories tests", async () => {
  test("Should create a category and then delete it", async ({ page }) => {
    const categories = new Categories(page);
    const testCategory = {
      categoryName: "Test Category",
      categorySlug: "test-category",
    };

    await test.step("Step 1: Create a category", async () => {
      await page.goto("");
      await categories.createCategory(testCategory);
    });

    await test.step("Step 2: Verify category creation", async () => {
      await expect(
        page.getByRole("cell", { name: testCategory.categoryName })
      ).toBeVisible();
    });

    await test.step("Step 3: Delete category", async () => {
      await categories.deleteCategory(testCategory.categoryName);
    });

    await test.step("Step 4: Verify category is deleted", async () => {
      await expect(
        page.getByRole("cell", { name: testCategory.categoryName })
      ).toHaveCount(0);
    });
  });
});
