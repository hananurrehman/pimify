import { test, expect } from "@playwright/test";
import Warehouses from "../pages/warehouses.page";
import { faker } from "@faker-js/faker";

test.describe("Warehouse tests", async () => {
  test("Should create a Warehouse and then delete it", async ({ page }) => {
    const warehouses = new Warehouses(page);
    const testWarehouse = {
      warehouseName: "Warehouse test",
      warehouseAddress: faker.location.streetAddress({ useFullAddress: true }),
    };

    await test.step("Step 1: Create a Warehouse", async () => {
      await page.goto("");
      await warehouses.createWarehouse(testWarehouse);
    });

    await test.step("Step 2: Verify Warehouse creation", async () => {
      await expect(
        page.getByRole("cell", { name: testWarehouse.warehouseName })
      ).toBeVisible();
    });

    await test.step("Step 3: Delete Warehouse", async () => {
      await warehouses.deleteWarehouse(testWarehouse.warehouseName);
    });

    await test.step("Step 4: Verify Warehouse is deleted", async () => {
      await expect(
        page.getByRole("cell", { name: testWarehouse.warehouseName })
      ).toHaveCount(0);
    });
  });
});
