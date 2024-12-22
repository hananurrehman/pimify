import { Page } from "@playwright/test";
import {
  COMMON_LOCATORS,
  DROPDOWN_LOCATORS,
} from "../constants/locators/common";

type DropdownKeys = keyof typeof DROPDOWN_LOCATORS;
export class BasePage {
  constructor(protected page: Page) {
    this.page = page;
  }

  navigateToCreationPage = async (pageName: string) => {
    await this.page.getByRole("link", { name: pageName }).click();
    await this.page.getByRole("link", { name: "add" }).click();
  };

  navigateToDetailPage = async (cell: string) =>
    this.page.getByRole("cell", { name: cell }).getByRole("link").click();

  fillInput = async (locator: string, value: string) =>
    this.page.locator(locator).fill(value);

  fillName = async (name: string) =>
    this.page.locator(COMMON_LOCATORS.name).fill(name);

  fillAddress = async (address: string) =>
    this.page.locator(COMMON_LOCATORS.address).fill(address);

  saveForm = async () =>
    this.page.getByRole("button", { name: "Save", exact: true }).click();

  deleteOperation = async (module: string) => {
    await this.page.getByRole("link", { name: "Delete " + module }).click();
    await this.page.getByText("Yes, I’m sure").click();
  };

  selectDropdown = async (optionName: string, type: DropdownKeys) => {
    const dropdownSelector = this.page.locator(DROPDOWN_LOCATORS[type]);
    await dropdownSelector.selectOption({ label: optionName });
  };
}
