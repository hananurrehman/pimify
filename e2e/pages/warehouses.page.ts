import { BasePage } from "./base.page";

export default class Warehouses extends BasePage {
  createWarehouse = async ({
    name,
    address,
  }: {
    name: string;
    address: string;
  }) => {
    await this.navigateToCreationPage("warehouse Warehouses");
    await this.fillName(name);
    await this.fillAddress(address);
    await this.saveForm();
  };

  deleteWarehouse = async (warehouseName: string) =>
    this.deleteEntity(warehouseName, "warehouse");
}
