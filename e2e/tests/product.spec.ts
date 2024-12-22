import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import Product from "../pages/product.page";

test.describe("Product CRUD tests", async () => {
  let testProduct;

  test.beforeEach(async ({ page }) => {
    testProduct = {
      productName: faker.commerce.productName(),
      productSku: faker.string.alphanumeric(8).toUpperCase(),
      productDescription: faker.lorem.words(),
      productPrice: faker.commerce.price({ min: 10, max: 50, dec: 0 }),
      productCategory: "Electronics",
    };
    await page.goto("");
  });

  test("Should Create a product with all fields filled in and then delete it", async ({
    page,
  }) => {
    const product = new Product(page);

    await test.step("Step 1: Create a product", async () => {
      await product.createProduct(testProduct);
    });

    await test.step("Step 2: Verify product creation", async () => {
      // There are 2 possibilities here
      await expect(
        page.locator("td").filter({ hasText: testProduct.productName })
      ).toBeVisible();

      await expect(
        page.getByRole("cell", { name: testProduct.productName })
      ).toBeVisible();
    });

    await test.step("Step 3: Delete product", async () => {
      await product.deleteProduct(testProduct.productSku);
    });

    await test.step("Step 4: Verify product is deleted", async () => {
      await expect(
        page.getByRole("cell", { name: testProduct.productName })
      ).not.toBeVisible();
    });
  });

  test("Should update a product", async ({ page }) => {
    const product = new Product(page);
    const newSku = faker.string.alphanumeric(8).toUpperCase();

    await test.step("Step 1: Create a product", async () => {
      await product.createProduct(testProduct);
    });

    await test.step("Step 2: Edit product", async () => {
      await product.editProduct(testProduct.productSku, newSku);
    });

    await test.step("Step 3: Verify product update", async () => {
      await expect(page.getByRole("cell", { name: newSku })).toBeVisible();
    });
  });
});
