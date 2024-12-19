import { Page } from "@playwright/test";
import { PRODUCT_LOCATORS } from "../constants/locators/product";

export default class Product {
  constructor(private readonly page: Page) {
    this.page = page;
  }

  navigateToProductCreationPage = async () => {
    this.page.getByRole("link", { name: "box Products" }).click();
    this.page.getByRole("link", { name: "add" }).click();
  };

  fillName = async (name: string) =>
    this.page.locator(PRODUCT_LOCATORS.name).fill(name);

  fillSku = async (sku: string) =>
    this.page.locator(PRODUCT_LOCATORS.sku).fill(sku);

  fillDescription = async (description: string) =>
    this.page.locator(PRODUCT_LOCATORS.description).fill(description);

  fillPrice = async (price: string) => {
    this.page.locator(PRODUCT_LOCATORS.price).fill(price);
  };

  selectCategory = async (category: string) => {
    // Open the dropdown first
    this.page.locator("option", { hasText: category }).click();
  };

  saveForm = async () =>
    this.page.getByRole("button", { name: "Save", exact: true }).click();

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
    await this.navigateToProductCreationPage();
    await this.fillName(name);
    await this.fillSku(sku);
    await this.fillDescription(description);
    await this.fillPrice(price);
    await this.selectCategory(category);
    await this.saveForm();
  };
}
