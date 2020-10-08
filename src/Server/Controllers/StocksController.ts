import express from "express";
import StocksLogicController from "../Logic/StocksLogicController";
import { injectable, inject } from "inversify";
import SERVICE_IDENTIFIER from "../../ioc/serviceIdentifiers";

@injectable()
class StocksController {
  public path = "/Stocks"; //TODO - Refactor to base
  public router = express.Router(); //TODO - Refactor to base
  private controllerLogic: StocksLogicController;

  constructor(@inject(SERVICE_IDENTIFIER.STOCK_CONTROLLER_LOGIC) controllerLogic: StocksLogicController) {
    this.initializeRoutes();
    this.controllerLogic = controllerLogic;
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllStocks.bind(this));
    this.router.get(this.path + "/:id", this.getStock.bind(this));
  }

  async getAllStocks(request: express.Request, response: express.Response) {
    response.send(await this.controllerLogic.getAllStocks());
  }

  async getStock(request: express.Request, response: express.Response) {
    response.send(await this.controllerLogic.getStock(parseInt(request.params.id) /*TODO - Refactor */));
  }
}

export = StocksController;
