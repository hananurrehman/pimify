import { test, expect } from "@playwright/test";
import Suppliers from "../pages/suppliers.page";
import { faker } from "@faker-js/faker";

test.describe("Supplier tests", async () => {
  test("Create a supplier", async ({ page }) => {
    const suppliers = new Suppliers(page);
    const testSupplier = {
      name: "Test Supplier",
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress({ useFullAddress: true }),
    };

    await test.step("Step 1: Create a Supplier", async () => {
      await page.goto("");
      await suppliers.createSupplier(testSupplier);
    });

    await test.step("Step 2: Verify Supplier creation", async () => {
      await expect(
        page.getByRole("cell", { name: testSupplier.name })
      ).toBeVisible();
    });

    await test.step("Step 3: Delete Supplier", async () => {
       await suppliers.deleteSupplier(testSupplier.name);
    });

    await test.step("Step 4: Verify Supplier is deleted", async () => {
      await expect(
        page.getByRole("cell", { name: testSupplier.name })
      ).toHaveCount(0);
    });
  });
});
