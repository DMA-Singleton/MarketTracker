interface StockResponse {
  name?: string;
  symbol?: string;
  market?: string;
}

interface StockPrice {
  date: Date;
  open?: number;
  close?: number;
  volume?: number;
}

interface ExtendedStockResponse extends StockResponse {
  stockPrices?: StockPrice[];
  lastPrice?: Date;
}

export { StockResponse, ExtendedStockResponse };
