export interface CreateStockHistoryRequest {
  date: Date,
  articleCode: number,
  locationCode: string,
  stockIn: number,
  stockOut: number,
  order: number,
  necessary: number,
  source: string
}
