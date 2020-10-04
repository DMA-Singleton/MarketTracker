const db = require("../../../Data-Layer/DataConnection");
import Stock from "../../../Models/Stock";
import StockPrice from "../../../Models/StockPrice";

beforeAll(() => (process.env.__DEV__ = "true"));

beforeEach(async () => {
  await db.sequelize.sync({ force: true });
});

test("basicOperations", async () => {
  const stockTest = await new Stock({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" }).persist();
  const stockPriceTestPre = new StockPrice({
    stockId: stockTest.id,
    date: new Date(),
    open: 25,
    close: 26,
    volume: 25,
  });
  const stockPriceTest = await stockPriceTestPre.persist();
  return new StockPrice().findById(1).then((stockPrice) => {
    expect(stockPrice).toStrictEqual(stockPriceTest);
  });
});

test("findAllByStockId", async () => {
  const stockTest = await new Stock({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" }).persist();
  const stockPriceTest = await new StockPrice({
    stockId: stockTest.id,
    date: new Date(2020, 1, 1),
    open: 25,
    close: 25,
    volume: 25,
  }).persist();
  const stockPriceTest2 = await new StockPrice({
    stockId: stockTest.id,
    date: new Date(2020, 1, 2),
    open: 25,
    close: 25,
    volume: 25,
  }).persist();
  return new StockPrice().findAllByStockId(stockTest.id).then((stockPrices) => {
    expect(stockPrices).toMatchObject([stockPriceTest, stockPriceTest2]);
  });
});

test("persistant with identity fail", async () => {
  const stockTest = await new Stock({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" }).persist();
  const stockPriceTest = await new StockPrice({
    stockId: stockTest.id,
    date: new Date(2020, 1, 1),
    open: 25,
    close: 25,
    volume: 25,
  }).persist();
  const stockPriceTest2 = await new StockPrice({
    stockId: stockTest.id,
    date: new Date(2020, 1, 1),
    open: 25,
    close: 25,
    volume: 25,
  }).persist();
  return new StockPrice().findAllByStockId(stockTest.id).then((stockPrices) => {
    expect(stockPrices).toMatchObject([stockPriceTest]);
  });
});

test("getLatestPriceOfStockId without prices", async () => {
  const stockTest = await new Stock({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" }).persist();
  return new StockPrice().getLatestPriceOfStockId(stockTest.id).then((stockPrice) => {
    expect(stockPrice).toStrictEqual(null);
  });
});
