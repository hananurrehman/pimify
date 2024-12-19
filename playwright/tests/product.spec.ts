import { test, expect } from "@playwright/test";
import Product from "../pages/product.page";

test.describe("Product CRUD tests", async () => {
  test("Should Create a product with all fields filled in", async ({
    page,
  }) => {
    const product = new Product(page);
    const testProduct = {
      name: "Test Product 001",
      sku: "001",
      description: "Lorem ipsum dolor",
      price: "30",
      category: "Electronics",
    };

    await test.step("Step 1: Open Pimify", async () => {
      await page.goto("");
    });

    await test.step("Step 2: Create a product", async () => {
      await product.createProduct(testProduct);
    });

    await test.step("Step 3: Verify product creation", async () => {
      await expect(
        page.locator("td").filter({ hasText: testProduct.name })
      ).toBeVisible();

      await expect(
        page.getByRole("cell", { name: testProduct.name })
      ).toBeVisible();
    });
  });
});
