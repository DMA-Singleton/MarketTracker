const stockDataAccess = require("../Data-Layer/DataConnection").Stock;
import StockPriceModel from "./StockPriceModel";
import YahooFinanceStockModel from "./YahooFinanceStockModel";
import { BaseModel, BaseEntity, PartialId } from "./BaseModel";
import { IStock, IStockModel } from "./Interfaces/IStockModel";

interface StockEntity extends BaseEntity {
  Name?: string;
  Symbol?: string;
  Market?: string;
}

interface IStock extends IBase {
class StockModel extends BaseModel<IStock, StockEntity> implements IStockModel {
  private stockPriceModel: StockPriceModel;
  private yahooFinancesStockModel: YahooFinanceStockModel;

  constructor(
  ) {
    super();
    this.dataAccess = stockDataAccess;
    this.stockPriceModel = stockPriceModel;
    this.yahooFinancesStockModel = yahooFinancesStockModel;
  }

  protected entityMap(entity: StockEntity): IStock {
    return {
      id: entity.ID,
      name: entity.Name,
      symbol: entity.Symbol,
      market: entity.Market,
    };
  }

  protected entityUnMap(model: IStock): StockEntity {
    return { ID: model.id, Name: model.name, Symbol: model.symbol, Market: model.market };
  }

  protected new({ id = 0, ...opts }: PartialId<IStock>) {
    var model: IStock = {
      id: id,
      ...opts,
    };
    return model;
  }

  async fillStockPrices(model: IStock) {
    model.stockPrices = await this.stockPriceModel.findAllByStockId(model.id);
    return model;
  }

  async getLastPrice(model: IStock) {
    return this.stockPriceModel.getLatestPriceOfStockId(model.id);
  }

  async getYahooFinanceStock(model: IStock) {
    return await this.yahooFinancesStockModel.findByStockId(model.id);
  }
}

export = StockModel;
