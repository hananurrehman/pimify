import { PRODUCT_SUPPLIER_LOCATORS } from "../constants/locators/product-supplier";
import { BasePage } from "./base.page";

export default class ProductSupplier extends BasePage {
  fillCostPrice = async (costPrice: string) =>
    this.page.locator(PRODUCT_SUPPLIER_LOCATORS.costPrice).fill(costPrice);

  fillLeadTime = async (leadTime: string) =>
    this.page.locator(PRODUCT_SUPPLIER_LOCATORS.leadTime).fill(leadTime);

  createProductSupplier = async ({
    productSku,
    supplierName,
    costPrice,
    leadTime,
  }: {
    productSku: string;
    supplierName: string;
    costPrice: string;
    leadTime: string;
  }) => {
    await this.navigateToCreationPage("compare_arrows Product");
    await this.selectDropdown(productSku, "product");
    await this.selectDropdown(supplierName, "supplier");
    await this.fillCostPrice(costPrice);
    await this.fillLeadTime(leadTime);
    await this.saveForm();
  };

  deleteProductSupplier = async ({
    productSku,
    supplierName,
    costPrice,
    leadTime,
  }: {
    productSku: string;
    supplierName: string;
    costPrice: string;
    leadTime: string;
  }) => {
    const rowLocator = this.page.getByRole("row", {
      name: `${productSku} ${supplierName} ${costPrice} ${leadTime}`,
    });
    await rowLocator.getByRole("link", { name: productSku }).click();
    await this.deleteOperation("product supplier");
  };
}
