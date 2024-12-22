import { STOCKS_LOCATORS } from "../constants/locators/stocks";
import { BasePage } from "./base.page";

export default class Stocks extends BasePage {
  fillQuantity = async (stockQuantity: string) =>
    this.page.locator(STOCKS_LOCATORS.quantity).fill(stockQuantity);

  createStock = async ({
    productSku,
    stockQuantity,
    warehouseName,
  }: {
    productSku: string;
    stockQuantity: string;
    warehouseName: string;
  }) => {
    await this.navigateToCreationPage("inventory Stocks");
    await this.selectDropdown(productSku, "product");
    await this.fillQuantity(stockQuantity);
    await this.selectDropdown(warehouseName, "warehouse");
    await this.saveForm();
  };

  deleteStock = async ({
    productSku,
    stockQuantity,
    warehouseName,
  }: {
    productSku: string;
    stockQuantity: string;
    warehouseName: string;
  }) => {
    const stockRowLocator = this.page.getByRole("row", {
      name: `${productSku} ${stockQuantity} ${warehouseName}`,
    });
    await stockRowLocator.getByRole("link", { name: productSku }).click();
    await this.deleteOperation("stock");
  };
}
