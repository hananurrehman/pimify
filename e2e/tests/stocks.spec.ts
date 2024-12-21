import { test, expect } from "@playwright/test";
import Stocks from "../pages/stocks.page";
import { faker } from "@faker-js/faker";

test.describe("Stock tests", async () => {
  test("Create a stock", async ({ page }) => {
    const stocks = new Stocks(page);
    const teststock = {
      productSku: "TEST",
      stockQuantity: faker.number.int({ min: 10, max: 100 }).toString(),
      warehouseName: "Test Warehouse",
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
