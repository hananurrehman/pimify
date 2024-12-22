import { test, expect } from "@playwright/test";
import ProductSupplier from "../pages/product-supplier.page";
import { faker } from "@faker-js/faker";

test.describe("Product Supplier tests", async () => {
  test("Create a Product Supplier", async ({ page }) => {
    const productSupplier = new ProductSupplier(page);
    const testProductSupplier = {
      productSku: "TEST",
      supplierName: "Test supplier",
      costPrice: faker.number
        .float({ min: 10, max: 100, multipleOf: 0.02 })
        .toString(),
      leadTime: faker.number.int({ min: 10, max: 100 }).toString(),
    };

    await test.step("Step 1: Create a Product Supplier", async () => {
      await page.goto("");
      await productSupplier.createProductSupplier(testProductSupplier);
    });

    await test.step("Step 2: Verify Product Supplier creation", async () => {
      await expect(
        page.getByRole("row", {
          name: `${testProductSupplier.productSku} ${testProductSupplier.supplierName} ${testProductSupplier.costPrice} ${testProductSupplier.leadTime}`,
        })
      ).toBeVisible();
    });

    await test.step("Step 3: Delete Product Supplier", async () => {
      await productSupplier.deleteProductSupplier(testProductSupplier);
    });

    await test.step("Step 4: Verify Product Supplier is deleted", async () => {
      await expect(
        page.getByRole("row", {
          name: `${testProductSupplier.productSku} ${testProductSupplier.supplierName} ${testProductSupplier.costPrice} ${testProductSupplier.leadTime}`,
        })
      ).toHaveCount(0);
    });
  });
});
