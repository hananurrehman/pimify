import { BasePage } from "./base.page";

export default class Warehouses extends BasePage {
  createWarehouse = async ({
    warehouseName,
    warehouseAddress,
  }: {
    warehouseName: string;
    warehouseAddress: string;
  }) => {
    await this.navigateToCreationPage("warehouse Warehouses");
    await this.fillName(warehouseName);
    await this.fillAddress(warehouseAddress);
    await this.saveForm();
  };

  deleteWarehouse = async (warehouseName: string) => {
    await this.navigateToDetailPage(warehouseName);
    await this.deleteOperation("warehouse");
  };
}
