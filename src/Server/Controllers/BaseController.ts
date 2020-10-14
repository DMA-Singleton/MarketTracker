import express from "express";
import { validationResult } from "express-validator";
import { injectable } from "inversify";

@injectable()
abstract class BaseController {
  public path = "";
  public router = express.Router();

  public abstract initializeRoutes(): void;

  public getRequestId(request: express.Request) {
    return parseInt(request.params.id);
  }

  public async checkValidations(request: express.Request, response: express.Response, next: express.NextFunction) {
    if (validationResult(request).isEmpty()) {
      next();
    } else {
      const errors: ErrorBodyResponse = { errors: [] };
      validationResult(request)
        .array()
        .map((i) => errors.errors.push({ param: i.param, value: i.value, msg: i.msg }));
      response.send(errors);
    }
  }
}

export = BaseController;
