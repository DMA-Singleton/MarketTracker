import express from "express";
import StocksLogicController from "../Logic/StocksLogicController";
import { injectable, inject } from "inversify";
import SERVICE_IDENTIFIER from "../../ioc/serviceIdentifiers";
import BaseController from "./BaseController";
import Validator from "../Helpers/Validator";

@injectable()
class StocksController extends BaseController {
  private controllerLogic: StocksLogicController;

  constructor(@inject(SERVICE_IDENTIFIER.STOCK_CONTROLLER_LOGIC) controllerLogic: StocksLogicController) {
    super();
    this.path = "/Stocks";
    this.controllerLogic = controllerLogic;
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllStocks.bind(this));
    this.router.get(this.path + "/:id", this.getStock.bind(this));
    this.router.post(this.path, this.validateEntityBody(), this.checkValidations, this.postStock.bind(this));
  }

  public validateEntityBody() {
    const validator = new Validator();
    validator.validateBodyString("name", 5, 30);
    validator.validateBodyString("symbol", 3, 10);
    validator.validateBodyString("market", 3, 15);
    return validator.build();
  }

  async getAllStocks(request: express.Request, response: express.Response) {
    response.send(await this.controllerLogic.getAllStocks());
  }

  async getStock(request: express.Request, response: express.Response) {
    response.send(await this.controllerLogic.getStock(this.getRequestId(request)));
  }

  async postStock(request: express.Request, response: express.Response) {
    response.send(await this.controllerLogic.addStock(request.body));
  }
}

export = StocksController;
