const stockDataAccess = require("../Data-Layer/DataConnection").Stock;
import StockPriceModel from "./StockPriceModel";
import YahooFinanceStockModel from "./YahooFinanceStockModel";
import { BaseModel, IBase, BaseEntity, PartialId } from "./BaseModel";

interface StockEntity extends BaseEntity {
  Name?: string;
  Symbol?: string;
  Market?: string;
}

interface IStock extends IBase {
  name?: string;
  symbol?: string;
  market?: string;
  stockPrices?: StockPriceModel[];
}

class StockModel extends BaseModel<IStock, StockEntity> {
  constructor() {
    super();
    this.dataAccess = stockDataAccess;
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
    };
    Object.assign(model, opts);
    return model;
  }

  async fillStockPrices(model: IStock) {
    model.stockPrices = await new StockPriceModel().findAllByStockId(model.id); //TODO - move to dependency
    return model;
  }

  async getLastPrice(model: IStock) {
    return new StockPriceModel().getLatestPriceOfStockId(model.id); //TODO - move to dependency
  }

  async getYahooFinanceStock(model: IStock) {
    return await new YahooFinanceStockModel().findByStockId(model.id); //TODO - move to dependency And propperty
  }
}

export = StockModel;
