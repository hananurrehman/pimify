import { test, expect } from "@playwright/test";
import Warehouses from "../pages/warehouses.page";
import { faker } from "@faker-js/faker";

test.describe("Warehouse tests", async () => {
  test("Create a Warehouse", async ({ page }) => {
    const warehouses = new Warehouses(page);
    const testWarehouse = {
      name: "Test Warehouse",
      address: faker.location.streetAddress({ useFullAddress: true }),
    };

    await test.step("Step 1: Create a Warehouse", async () => {
      await page.goto("");
      await warehouses.createWarehouse(testWarehouse);
    });

    await test.step("Step 2: Verify Warehouse creation", async () => {
      await expect(
        page.getByRole("cell", { name: testWarehouse.name })
      ).toBeVisible();
    });

    await test.step("Step 3: Delete Warehouse", async () => {
      await warehouses.deleteWarehouse(testWarehouse.name);
    });

    await test.step("Step 4: Verify Warehouse is deleted", async () => {
      await expect(
        page.getByRole("cell", { name: testWarehouse.name })
      ).toHaveCount(0);
    });
  });
});
