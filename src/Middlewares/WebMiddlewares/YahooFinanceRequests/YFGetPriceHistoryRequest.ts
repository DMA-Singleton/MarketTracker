import HttpRequestBase from "../HttpRequestBase";

class YFGetPriceHistoryRequest extends HttpRequestBase {
  constructor(symbol: string, startDate: Date = new Date(1990, 0, 1), endDate = new Date()) {
    super(`https://query1.finance.yahoo.com/v7/finance/download/${symbol}`);
    this.setQueryParam("period1", Math.round(startDate.getTime() / 1000));
    this.setQueryParam("period2", Math.round(endDate.getTime() / 1000));
    this.setQueryParam("interval", "1d");
    this.setQueryParam("events", "history");
  }

  retrieveData = async () => {
    return await this.fetchAsText();
  };
}

export = YFGetPriceHistoryRequest;
