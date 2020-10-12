import YahooFinanceMiddleware from "../Middlewares/YahooFinanceMiddleware";
import StockModel from "../Models/StockModel";
import StockPriceModel from "../Models/StockPriceModel";
import ProcessHelperModel from "../Helpers/ProcessHelper";
import YahooFinanceStockModel from "../Models/YahooFinanceStockModel";
//TODO - TEST
class StockHistoryTracker {
  constructor() {}

  pullAllPricesHistory = async () => {
    const stocks = await new StockModel(new StockPriceModel(), new YahooFinanceStockModel()).findAll();

    await Promise.all(
      stocks.map(async (s) => {
        var stockYFName = await new StockModel(new StockPriceModel(), new YahooFinanceStockModel()).getYahooFinanceStock(s); //TODO - Move to dependency
        if (stockYFName !== null) {
          var yfMiddleware = new YahooFinanceMiddleware(stockYFName.yfStockName);
          //TODO - THINK ABOUT IT
          var lastPrice = await new StockModel(new StockPriceModel(), new YahooFinanceStockModel()).getLastPrice(s); //TODO - Move to dependency
          if (lastPrice !== null) {
            var nextPriceDate = new Date();
            nextPriceDate.setDate(lastPrice.date.getDate() + 1);
            yfMiddleware.setStartDate(nextPriceDate);
          }
          const pi = await yfMiddleware.getPriceHistory();
          await ProcessHelperModel.batchProcess(pi, 50 /* TODO - remove hardcoded value*/, async (phd: any) => {
            await new StockPriceModel().persist({
              stockId: s.id,
              date: phd.date,
              open: phd.open,
              close: phd.close,
              volume: phd.volume,
            });
          });
        }
      })
    );
  };
}

export = StockHistoryTracker;
