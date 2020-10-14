import { ValidationChain, body } from "express-validator";

class Validator {
  private body: ValidationChain[];

  constructor() {
    this.body = [];
  }

  public validateBodyString(param: string, min: number = 0, max: number = 9999, optional: boolean = false) {
    const validation = body(param);
    if (optional) {
      validation.optional();
    } else {
      validation.exists({ checkFalsy: true, checkNull: true }).withMessage(`${param} not found.`);
    }
    validation.isString().withMessage(`${param} should be an string.`);
    validation.isLength({ min: min, max: max }).withMessage(`${param} length should be between ${min} and ${max}`);
    this.body.push(validation);
  }

  public build() {
    return this.body;
  }
}

export = Validator;
