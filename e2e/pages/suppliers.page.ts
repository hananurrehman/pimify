import { SUPPLIERS_LOCATORS } from "../constants/locators/suppliers";
import { BasePage } from "./base.page";

export default class Suppliers extends BasePage {
  fillEmail = async (supplierEmail: string) =>
    this.page.locator(SUPPLIERS_LOCATORS.email).fill(supplierEmail);

  fillPhoneNumber = async (supplierPhoneNumber: string) =>
    this.page.locator(SUPPLIERS_LOCATORS.phone).fill(supplierPhoneNumber);

  createSupplier = async ({
    supplierName,
    supplierEmail,
    supplierPhoneNumber,
    supplierAddress,
  }: {
    supplierName: string;
    supplierEmail: string;
    supplierPhoneNumber: string;
    supplierAddress: string;
  }) => {
    await this.navigateToCreationPage("local_shipping Suppliers");
    await this.fillName(supplierName);
    await this.fillEmail(supplierEmail);
    await this.fillPhoneNumber(supplierPhoneNumber);
    await this.fillAddress(supplierAddress);
    await this.saveForm();
  };

  deleteSupplier = async (supplierName: string) => {
    await this.navigateToDetailPage(supplierName);
    await this.deleteOperation("supplier");
  };
}
