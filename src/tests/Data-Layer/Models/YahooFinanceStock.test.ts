const db = require("../../../Data-Layer/DataConnection");
import Stock from "../../../Models/Stock";
import YahooFinanceStock from "../../../Models/YahooFinanceStock";

beforeAll(() => (process.env.__DEV__ = "true"));

beforeEach(async () => {
  await db.sequelize.sync({ force: true });
});

test("basicOperations", async () => {
  const stockTest = await new Stock({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" }).persist();
  const yahooFinanceStockTest = await new YahooFinanceStock({ stockId: stockTest.id, yfStockName: "AAPL" }).persist();
  return new YahooFinanceStock().findById(stockTest.id).then((yahooFinanceStock) => {
    expect(yahooFinanceStock).toStrictEqual(yahooFinanceStockTest);
  });
});

test("findByStockId", async () => {
  const stockTest = await new Stock({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" }).persist();
  const yahooFinanceStockTest = await new YahooFinanceStock({ stockId: stockTest.id, yfStockName: "AAPL" }).persist();
  return new YahooFinanceStock().findByStockId(stockTest.id).then((yahooFinanceStock) => {
    expect(yahooFinanceStock).toStrictEqual(yahooFinanceStockTest);
  });
});

test("findByStockId Not Found", async () => {
  const stockTest = await new Stock({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" }).persist();
  return new YahooFinanceStock().findByStockId(stockTest.id).then((yahooFinanceStock) => {
    expect(yahooFinanceStock).toStrictEqual(null);
  });
});
