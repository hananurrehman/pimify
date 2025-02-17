import { test, expect } from "@playwright/test";
import Stocks from "../pages/stocks.page";
import { faker } from "@faker-js/faker";

test.describe("Stock tests", async () => {
  test("Should create a stock and then delete it", async ({ page }) => {
    const stocks = new Stocks(page);
    const teststock = {
      productSku: "SMT12345",
      stockQuantity: faker.number.int({ min: 10, max: 100 }).toString(),
      warehouseName: "Central Warehouse",
    };

    await test.step("Step 1: Create a stock", async () => {
      await page.goto("");
      await stocks.createStock(teststock);
    });

    await test.step("Step 2: Verify stock creation", async () => {
      await expect(
        page.getByRole("row", {
          name: `${teststock.productSku} ${teststock.stockQuantity} ${teststock.warehouseName}`,
        })
      ).toBeVisible();
    });

    await test.step("Step 3: Delete stock", async () => {
      await stocks.deleteStock(teststock);
    });

    await test.step("Step 4: Verify stock is deleted", async () => {
      await expect(
        page.getByRole("row", {
          name: `${teststock.productSku} ${teststock.stockQuantity} ${teststock.warehouseName}`,
        })
      ).toHaveCount(0);
    });
  });
});
