import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import Product from "../pages/product.page";

test.describe("Product CRUD tests", async () => {
  let testProduct;

  test.beforeEach(async ({ page }) => {
    testProduct = {
      name: faker.commerce.productName(),
      sku: faker.string.alphanumeric(8).toUpperCase(),
      description: faker.lorem.words(),
      price: faker.commerce.price({ min: 10, max: 50, dec: 0 }),
      category: "Electronics",
    };
    await page.goto("");
  });

  test("Should Create a product with all fields filled in", async ({
    page,
  }) => {
    const product = new Product(page);

    await test.step("Step 1: Create a product", async () => {
      await product.createProduct(testProduct);
    });

    await test.step("Step 2: Verify product creation", async () => {
      // There are 2 possibilities here
      await expect(
        page.locator("td").filter({ hasText: testProduct.name })
      ).toBeVisible();

      await expect(
        page.getByRole("cell", { name: testProduct.name })
      ).toBeVisible();
    });
  });

  test.only("Should update a product", async ({ page }) => {
    const product = new Product(page);
    const newSku = faker.string.alphanumeric(8).toUpperCase();

    await test.step("Step 1: Create a product", async () => {
      await product.createProduct(testProduct);
    });

    await test.step("Step 2: Edit product", async () => {
      await product.editProduct(testProduct.sku, newSku);
    });

    await test.step("Step 3: Verify product update", async () => {
      await expect(page.getByRole("cell", { name: newSku })).toBeVisible();
    });
  });
});
