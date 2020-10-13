import { IStockModel, IStock } from "../../Models/Interfaces/IStockModel";
import { injectable, inject } from "inversify";
import SERVICE_IDENTIFIER from "../../ioc/serviceIdentifiers";
import StockRequest from "../Dtos/StockRequest";
import { StockResponse } from "../Dtos/StockResponse";

@injectable()
class StocksLogicController {
  private stockModel: IStockModel;

  constructor(@inject(SERVICE_IDENTIFIER.STOCK_MODEL) stockModel: IStockModel) {
    this.stockModel = stockModel;
  }

  private async createStockResponse(model: IStock) {
    const response = <StockResponse>model;
    response.lastPriceDate = (await this.stockModel.getLastPrice(model))?.date;
    return response;
  }

  async getAllStocks() {
    const response: StockResponse[] = [];
    const models = await this.stockModel.findAll();
    await Promise.all(models.map(async (i) => response.push(await this.createStockResponse(i))));
    return response;
  }

  async getStock(id: number) {
    return this.createStockResponse(await this.stockModel.findById(id));
  }

  async addStock(request: StockRequest) {
    return this.createStockResponse(await this.stockModel.persist(request));
  }
}

export = StocksLogicController;
