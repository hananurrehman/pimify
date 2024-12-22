import { test, expect } from "@playwright/test";
import Suppliers from "../pages/suppliers.page";
import { faker } from "@faker-js/faker";

test.describe("Supplier tests", async () => {
  test("Should create a supplier and then delete it", async ({ page }) => {
    const suppliers = new Suppliers(page);
    const testSupplier = {
      supplierName: "Supplier test",
      supplierEmail: faker.internet.email(),
      supplierPhoneNumber: faker.phone.number(),
      supplierAddress: faker.location.streetAddress({ useFullAddress: true }),
    };

    await test.step("Step 1: Create a Supplier", async () => {
      await page.goto("");
      await suppliers.createSupplier(testSupplier);
    });

    await test.step("Step 2: Verify Supplier creation", async () => {
      await expect(
        page.getByRole("cell", { name: testSupplier.supplierName })
      ).toBeVisible();
    });

    await test.step("Step 3: Delete Supplier", async () => {
      await suppliers.deleteSupplier(testSupplier.supplierName);
    });

    await test.step("Step 4: Verify Supplier is deleted", async () => {
      await expect(
        page.getByRole("cell", { name: testSupplier.supplierName })
      ).toHaveCount(0);
    });
  });
});
