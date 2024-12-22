import { COMMON_LOCATORS } from "../constants/locators/common";
import { PRODUCT_LOCATORS } from "../constants/locators/product";
import { BasePage } from "./base.page";

export default class Product extends BasePage {
  fillSku = async (productSku: string) =>
    this.page.locator(PRODUCT_LOCATORS.sku).fill(productSku);

  fillDescription = async (productDescription: string) =>
    this.page.locator(PRODUCT_LOCATORS.description).fill(productDescription);

  fillPrice = async (productPrice: string) =>
    this.page.locator(PRODUCT_LOCATORS.price).fill(productPrice);

  selectCategory = async (productCategory: string) =>
    this.page.locator("option", { hasText: productCategory }).click();

  createProduct = async ({
    productName,
    productSku,
    productDescription,
    productPrice,
    productCategory,
  }: {
    productName: string;
    productSku: string;
    productDescription: string;
    productPrice: string;
    productCategory: string;
  }) => {
    await this.navigateToCreationPage("box Product");
    // Trying out a more DRY approach here
    await this.fillInput(COMMON_LOCATORS.name, productName);
    await this.fillInput(PRODUCT_LOCATORS.sku, productSku);
    await this.fillInput(PRODUCT_LOCATORS.description, productDescription);
    await this.fillInput(PRODUCT_LOCATORS.price, productPrice);
    await this.selectCategory(productCategory);
    await this.saveForm();
  };

  editProduct = async (productSku: string, newSku: string) => {
    await this.navigateToDetailPage(productSku);
    await this.page.locator(PRODUCT_LOCATORS.sku).clear();
    await this.fillSku(newSku);
    await this.saveForm();
  };

  deleteProduct = async (productSku: string) => {
    await this.navigateToDetailPage(productSku);
    await this.deleteOperation("product");
  };
}
