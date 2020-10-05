const db = require("../../../Data-Layer/DataConnection");
import StockModel from "../../../Models/Stock";
import YahooFinanceStockModel from "../../../Models/YahooFinanceStock";

beforeAll(() => (process.env.__DEV__ = "true"));

beforeEach(async () => {
  await db.sequelize.sync({ force: true });
});

test("basicOperations", async () => {
  const stockTest = await new StockModel().persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  const yahooFinanceStockTest = await new YahooFinanceStockModel().persist({ stockId: stockTest.id, yfStockName: "AAPL" });
  return new YahooFinanceStockModel().findById(stockTest.id).then((yahooFinanceStock) => {
    expect(yahooFinanceStock).toStrictEqual(yahooFinanceStockTest);
  });
});

test("findByStockId", async () => {
  const stockTest = await new StockModel().persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  const yahooFinanceStockTest = await new YahooFinanceStockModel().persist({ stockId: stockTest.id, yfStockName: "AAPL" });
  return new YahooFinanceStockModel().findByStockId(stockTest.id).then((yahooFinanceStock) => {
    expect(yahooFinanceStock).toStrictEqual(yahooFinanceStockTest);
  });
});

test("findByStockId Not Found", async () => {
  const stockTest = await new StockModel().persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  return new YahooFinanceStockModel().findByStockId(stockTest.id).then((yahooFinanceStock) => {
    expect(yahooFinanceStock).toStrictEqual(null);
  });
});
