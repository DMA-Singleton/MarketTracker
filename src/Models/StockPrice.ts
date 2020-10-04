const stockPriceDataAccess = require("../Data-Layer/DataConnection").Stock_Price;
import { BaseModel, BaseModelOptions, BaseEntity } from "./BaseModel";

interface StockPriceOptions extends BaseModelOptions {
  stockId?: number;
  date?: Date;
  open?: number;
  close?: number;
  volume?: number;
}

interface StockPriceEntity extends BaseEntity {
  Name?: string;
  Stock_ID?: number;
  Date?: Date;
  Open?: number;
  Close?: number;
  Volume?: number;
}

class StockPrice extends BaseModel<StockPrice, StockPriceEntity, StockPriceOptions> {
  public stockId: number;
  public date: Date;
  public open?: number;
  public close?: number;
  public volume?: number;
  public static dataAccess: any = stockPriceDataAccess;

  constructor({ date = new Date(), stockId = 0, ...opts }: StockPriceOptions = {}) {
    super({ ...opts });
    this.stockId = stockId;
    this.date = date;
  }

  protected entityMap(entity: StockPriceEntity): StockPrice {
    return new StockPrice({
      id: entity.ID,
      stockId: entity.Stock_ID,
      date: entity.Date,
      open: entity.Open,
      close: entity.Close,
      volume: entity.Volume,
    });
  }

  protected entityUnMap(): StockPriceEntity {
    return {
      ID: this.id,
      Stock_ID: this.stockId,
      Date: this.date,
      Open: this.open,
      Close: this.close,
      Volume: this.volume,
    };
  }

  protected async checkIdentityConstraints() {
    const entity = await (this.constructor as any).dataAccess.findOne({
      where: { Date: this.date, Stock_ID: this.stockId },
    });
    if (entity !== null) return false;
    return true;
  }

  async findAllByStockId(id: number) {
    const stockPrices = await StockPrice.dataAccess.findAll({
      where: { Stock_ID: id },
    });
    return await stockPrices.map((e: any) => new StockPrice().entityMap(e));
  }

  async getLatestPriceOfStockId(id: number) {
    const entity = await StockPrice.dataAccess.findAll({
      where: { Stock_ID: id },
      limit: 1,
      order: [["Date", "DESC"]],
    });

    if (entity.length === 0) return null;

    return this.entityMap(entity[0]);
  }
}

export = StockPrice;
