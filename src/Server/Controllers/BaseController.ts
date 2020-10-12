import express from "express";
import { body, validationResult } from "express-validator";
import { injectable } from "inversify";

@injectable()
abstract class BaseController {
  public path = "";
  public router = express.Router();

  public abstract initializeRoutes(): void;

  public async checkValidations(request: express.Request, response: express.Response, next: express.NextFunction) {
    if (validationResult(request).isEmpty()) {
      next();
    } else {
      const errors: any = { errors: [] };
      validationResult(request)
        .array()
        .map((i) => errors.errors.push({ param: i.param, value: i.value, msg: i.msg }));
      response.send(errors);
    }
  }
}

export = BaseController;
