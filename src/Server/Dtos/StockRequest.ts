import StockModel from "../../Models/StockModel";

interface StockRequest {
  name?: string;
  symbol?: string;
  market?: string;
}

export = StockRequest;
