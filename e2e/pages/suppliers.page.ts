import { SUPPLIERS_LOCATORS } from "../constants/locators/suppliers";
import { BasePage } from "./base.page";

export default class Suppliers extends BasePage {
  fillEmail = async (email: string) =>
    this.page.locator(SUPPLIERS_LOCATORS.email).fill(email);

  fillPhoneNumber = async (phoneNumber: string) =>
    this.page.locator(SUPPLIERS_LOCATORS.phone).fill(phoneNumber);

  createSupplier = async ({
    name,
    email,
    phone,
    address,
  }: {
    name: string;
    email: string;
    phone: string;
    address: string;
  }) => {
    await this.navigateToCreationPage("local_shipping Suppliers");
    await this.fillName(name);
    await this.fillEmail(email);
    await this.fillPhoneNumber(phone);
    await this.fillAddress(address);
    await this.saveForm();
  };

  deleteSupplier = async (supplierName: string) =>
    this.deleteEntity(supplierName, "supplier");
}
