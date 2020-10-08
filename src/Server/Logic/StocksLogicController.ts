import { IStockModel, IStock } from "../../Models/Interfaces/IStockModel";
import { injectable, inject } from "inversify";
import SERVICE_IDENTIFIER from "../../ioc/serviceIdentifiers";

@injectable()
class StocksLogicController {
  private stockModel: IStockModel;

  constructor(@inject(SERVICE_IDENTIFIER.STOCK_MODEL) stockModel: IStockModel) {
    this.stockModel = stockModel;
  }

  async getAllStocks() {
    return this.stockModel.findAll();
  }

  async getStock(id: number) {
    return this.stockModel.findById(id);
  }
}

export = StocksLogicController;
