import { CATEGORIES_LOCATORS } from "../constants/locators/categories";
import { BasePage } from "./base.page";

export default class Categories extends BasePage {
  fillSlug = async (categorySlug: string) =>
    this.page.locator(CATEGORIES_LOCATORS.slug).fill(categorySlug);

  createCategory = async ({
    categoryName,
    categorySlug,
  }: {
    categoryName: string;
    categorySlug: string;
  }) => {
    await this.navigateToCreationPage("category Categories");
    await this.fillName(categoryName);
    await this.fillSlug(categorySlug);
    await this.saveForm();
  };

  deleteCategory = async (categoryName: string) => {
    await this.navigateToDetailPage(categoryName);
    await this.deleteOperation("category");
  };
}
