import { IBase, IBaseModel } from "./IBaseModel";

interface IYahooFinanceStock extends IBase {
  stockId: number;
  yfStockName: string;
}

interface IYahooFinanceStockModel extends IBaseModel<IYahooFinanceStock> {
  findByStockId(id: number): Promise<IYahooFinanceStock | null>;
}

export { IYahooFinanceStock, IYahooFinanceStockModel };
