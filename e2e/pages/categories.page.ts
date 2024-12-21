import { CATEGORIES_LOCATORS } from "../constants/locators/categories";
import { BasePage } from "./base.page";

export default class Categories extends BasePage {
  fillSlug = async (slug: string) =>
    this.page.locator(CATEGORIES_LOCATORS.slug).fill(slug);

  createCategory = async ({ name, slug }: { name: string; slug: string }) => {
    await this.navigateToCreationPage("category Categories");
    await this.fillName(name);
    await this.fillSlug(slug);
    await this.saveForm();
  };

  deleteCategory = async (categoryName: string) => {
    await this.deleteEntity(categoryName, "category");
  };
}
