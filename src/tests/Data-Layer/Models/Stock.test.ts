const db = require("../../../Data-Layer/DataConnection");
import Stock from "../../../Models/Stock";
import StockPrice from "../../../Models/StockPrice";
import YahooFinanceStock from "../../../Models/YahooFinanceStock";

beforeAll(() => (process.env.__DEV__ = "true"));

beforeEach(async () => {
  await db.sequelize.sync({ force: true });
});

test("basicOperations", async () => {
  const stockTest = await new Stock({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" }).persist();
  return new Stock().findById(1).then((stock) => {
    expect(stock).toStrictEqual(stockTest);
  });
});

test("findAll", async () => {
  const stockTest = await new Stock({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" }).persist();
  const stockTest2 = await new Stock({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" }).persist();
  return new Stock().findAll().then((stocks) => {
    expect(stocks).toMatchObject([stockTest, stockTest2]);
  });
});

test("fillStockPrices", async () => {
  const stockTest = await new Stock({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" }).persist();
  const stockPriceTest = await new StockPrice({
    stockId: stockTest.id,
    date: new Date(),
    open: 25,
    close: 25,
    volume: 25,
  }).persist();
  return stockTest.fillStockPrices().then((stockTest) => {
    expect(stockTest.stockPrices).toMatchObject([stockPriceTest]);
  });
});

test("getLastPriceDate", async () => {
  const stockTest = await new Stock({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" }).persist();
  const stockPriceTest = await new StockPrice({
    stockId: stockTest.id,
    date: new Date(2020, 5, 1),
    open: 25,
    close: 25,
    volume: 25,
  }).persist();
  const stockPriceTest2 = await new StockPrice({
    stockId: stockTest.id,
    date: new Date(2020, 4, 1),
    open: 25,
    close: 25,
    volume: 25,
  }).persist();
  return stockTest.getLastPrice().then((stockPrice) => {
    expect(stockPrice).toStrictEqual(stockPriceTest);
  });
});

test("getLastPrice", async () => {
  const stockTest = await new Stock({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" }).persist();
  const stockPriceTest = await new StockPrice({
    stockId: stockTest.id,
    date: new Date(2020, 5, 1),
    open: 25,
    close: 25,
    volume: 25,
  }).persist();
  const stockPriceTest2 = await new StockPrice({
    stockId: stockTest.id,
    date: new Date(2020, 4, 1),
    open: 25,
    close: 25,
    volume: 25,
  }).persist();
  return stockTest.getLastPrice().then((stockPrice) => {
    expect(stockPrice).toStrictEqual(stockPriceTest);
  });
});

test("getYahooFinanceStock", async () => {
  const stockTest = await new Stock({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" }).persist();
  const yahooFinanceStockTest = await new YahooFinanceStock({ stockId: stockTest.id, yfStockName: "AAPL" }).persist();
  return stockTest.getYahooFinanceStock().then((yahooFinanceStock) => {
    expect(yahooFinanceStock).toStrictEqual(yahooFinanceStockTest);
  });
});

test("persist With repeated id", async () => {
  const stockTest = await new Stock({ id: 1, name: "Microsoft", symbol: "MSFT", market: "NASDAQ" }).persist();
  const stockTest2 = await new Stock({ id: 1, name: "Microsoft", symbol: "MSFT", market: "NASDAQ" }).persist();
  return new Stock().findAll().then((stocks) => {
    expect(stocks).toMatchObject([stockTest]);
  });
});
