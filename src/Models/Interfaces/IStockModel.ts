import { IBase, IBaseModel } from "./IBaseModel";
import { IStockPrice } from "./IStockPriceModel";
import { IYahooFinanceStock } from "./IYahooFinanceStockModel";

interface IStock extends IBase {
  name?: string;
  symbol?: string;
  market?: string;
  stockPrices?: IStockPrice[];
}

interface IStockModel extends IBaseModel<IStock> {
  fillStockPrices(model: IStock): Promise<IStock>;
  getLastPrice(model: IStock): Promise<IStockPrice | null>;
  getYahooFinanceStock(model: IStock): Promise<IYahooFinanceStock | null>;
}

export { IStock, IStockModel };
