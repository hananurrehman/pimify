import { PRODUCT_LOCATORS } from "../constants/locators/product";
import { BasePage } from "./base.page";

export default class Product extends BasePage {
  fillSku = async (sku: string) =>
    this.page.locator(PRODUCT_LOCATORS.sku).fill(sku);

  fillDescription = async (description: string) =>
    this.page.locator(PRODUCT_LOCATORS.description).fill(description);

  fillPrice = async (price: string) =>
    this.page.locator(PRODUCT_LOCATORS.price).fill(price);

  selectCategory = async (category: string) =>
    this.page.locator("option", { hasText: category }).click();

  createProduct = async ({
    name,
    sku,
    description,
    price,
    category,
  }: {
    name: string;
    sku: string;
    description: string;
    price: string;
    category: string;
  }) => {
    await this.navigateToCreationPage("box Product");
    await this.fillName(name);
    await this.fillSku(sku);
    await this.fillDescription(description);
    await this.fillPrice(price);
    await this.selectCategory(category);
    await this.saveForm();
  };

  editProduct = async (sku: string, newSku: string) => {
    await this.navigateToDetailPage(sku);
    await this.page.locator(PRODUCT_LOCATORS.sku).clear();
    await this.fillSku(newSku);
    await this.saveForm();
  };

  deleteProduct = async (sku: string) => {
    await this.deleteEntity(sku, "product");
  };
}
