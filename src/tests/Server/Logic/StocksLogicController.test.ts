import * as TypeMoq from "typemoq";
import { IStock } from "../../../Models/Interfaces/IStockModel";
import { IStockPrice } from "../../../Models/Interfaces/IStockPriceModel";
import StockModel from "../../../Models/StockModel";
import StockRequest from "../../../Server/Dtos/StockRequest";
import { StockResponse } from "../../../Server/Dtos/StockResponse";
import StocksLogicController from "../../../Server/Logic/StocksLogicController";

var stockModelMock: TypeMoq.IMock<StockModel>;

beforeAll(() => {
  stockModelMock = TypeMoq.Mock.ofType(StockModel);
});

beforeEach(async () => {
  stockModelMock.reset();
});

test("getAllStocks", async () => {
  const stock: IStock = {
    id: 1,
    name: "test",
    market: "test",
    symbol: "test",
  };
  const stock2: IStock = {
    id: 2,
    name: "test",
    market: "test",
    symbol: "test",
  };

  const stockPrice: IStockPrice = {
    id: 1,
    stockId: 1,
    date: new Date("2020-10-13"),
  };

  stockModelMock
    .setup((m) => m.findAll())
    .returns(async () => {
      return [stock, stock2];
    });

  stockModelMock
    .setup((m) => m.getLastPrice(TypeMoq.It.isObjectWith(stock)))
    .returns(async () => {
      return stockPrice;
    });
  stockModelMock
    .setup((m) => m.getLastPrice(TypeMoq.It.isObjectWith(stock2)))
    .returns(async () => {
      return null;
    });

  const stockLogicControllerTest = new StocksLogicController(stockModelMock.object);

  const stockResponse: StockResponse[] = [
    {
      id: 1,
      name: "test",
      market: "test",
      symbol: "test",
      lastPriceDate: new Date("2020-10-13"),
    },
    {
      id: 2,
      name: "test",
      market: "test",
      symbol: "test",
      lastPriceDate: undefined,
    },
  ];

  return stockLogicControllerTest.getAllStocks().then((res) => {
    expect(res).toStrictEqual(stockResponse);
  });
});

test("getStock", async () => {
  const stock: IStock = {
    id: 1,
    name: "test",
    market: "test",
    symbol: "test",
  };

  const stockPrice: IStockPrice = {
    id: 1,
    stockId: 1,
    date: new Date("2020-10-13"),
  };

  stockModelMock
    .setup((m) => m.findById(TypeMoq.It.isValue(1)))
    .returns(async () => {
      return stock;
    });

  stockModelMock
    .setup((m) => m.getLastPrice(TypeMoq.It.isObjectWith(stock)))
    .returns(async () => {
      return stockPrice;
    });

  const stockLogicControllerTest = new StocksLogicController(stockModelMock.object);

  const stockResponse: StockResponse = {
    id: 1,
    name: "test",
    market: "test",
    symbol: "test",
    lastPriceDate: new Date("2020-10-13"),
  };

  return stockLogicControllerTest.getStock(1).then((res) => {
    expect(res).toStrictEqual(stockResponse);
  });
});

test("addStock", async () => {
  const stock: StockRequest = {
    name: "test",
    market: "test",
    symbol: "test",
  };

  stockModelMock
    .setup((m) => m.persist(TypeMoq.It.isAny()))
    .returns(async () => {
      return {
        id: 1,
        name: "test",
        market: "test",
        symbol: "test",
      };
    });

  stockModelMock
    .setup((m) => m.getLastPrice(TypeMoq.It.isAny()))
    .returns(async () => {
      return null;
    });

  const stockLogicControllerTest = new StocksLogicController(stockModelMock.object);

  const stockResponse: StockResponse = {
    id: 1,
    name: "test",
    market: "test",
    symbol: "test",
    lastPriceDate: undefined,
  };

  return stockLogicControllerTest.addStock(stock).then((res) => {
    expect(res).toStrictEqual(stockResponse);
  });
});
