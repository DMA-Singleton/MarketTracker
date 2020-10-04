import { BaseModel, BaseModelOptions, BaseEntity } from "./BaseModel";
const yahooFinanceStockDataAccess = require("../Data-Layer/DataConnection").YahooFinance_Stock;

interface YahooFinanceStockOptions extends BaseModelOptions {
  stockId?: number;
  yfStockName?: string;
}

interface YahooFinanceStockEntity extends BaseEntity {
  Stock_ID?: number;
  YF_StockName?: string;
}

class YahooFinanceStock extends BaseModel<YahooFinanceStock, YahooFinanceStockEntity, YahooFinanceStockOptions> {
  public stockId: number;
  public yfStockName: string;
  public static dataAccess: any = yahooFinanceStockDataAccess;

  constructor({ stockId = 0, yfStockName = "", ...opts }: YahooFinanceStockOptions = {}) {
    super({ ...opts });
    this.stockId = stockId;
    this.yfStockName = yfStockName;
  }

  protected entityMap(entity: YahooFinanceStockEntity): YahooFinanceStock {
    return new YahooFinanceStock({
      id: entity.ID,
      stockId: entity.Stock_ID,
      yfStockName: entity.YF_StockName,
    });
  }

  protected entityUnMap(): YahooFinanceStockEntity {
    return { ID: this.id, Stock_ID: this.stockId, YF_StockName: this.yfStockName };
  }

  async findByStockId(id: number) {
    const entity = await yahooFinanceStockDataAccess.findOne({ where: { Stock_ID: id } });
    return entity === null ? null : this.entityMap(entity);
  }
}

export = YahooFinanceStock;
