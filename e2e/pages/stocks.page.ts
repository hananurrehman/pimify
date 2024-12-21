import { STOCKS_LOCATORS } from "../constants/locators/stocks";
import { BasePage } from "./base.page";

type StockKeys = keyof typeof STOCKS_LOCATORS;

export default class Stocks extends BasePage {
  selectProduct = async (productSku: string) => {
    const productDropdown = this.page.locator(STOCKS_LOCATORS.product);
    await productDropdown.selectOption({ label: productSku });
  };

  fillQuantity = async (quantity: string) =>
    this.page.locator(STOCKS_LOCATORS.quantity).fill(quantity);

  selectWarehouse = async (warehouseName: string) => {
    const warehouseDropdown = this.page.locator(STOCKS_LOCATORS.warehouse);
    await warehouseDropdown.selectOption({ label: warehouseName });
  };

  dropdownSelect = async (optionName: string, type: StockKeys) => {
    const dropdownSelector = this.page.locator(STOCKS_LOCATORS[type]);
    await dropdownSelector.selectOption({ label: optionName });
  };

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
    await this.dropdownSelect(productSku, "product");
    await this.fillQuantity(stockQuantity);
    await this.dropdownSelect(warehouseName, "warehouse");
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
    await this.page.getByRole("link", { name: "Delete stock" }).click();
    await this.page.getByText("Yes, I’m sure").click();
  };
}
