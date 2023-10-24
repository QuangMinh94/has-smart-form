export interface CustomerResponse {
  Stt?: number
  _id: string
  CustomerName: string
  Address?: string
  CreateDate?: string
  __v?: number
  key?: number
  ShortName?: string
}
export interface CustomerBodyResponse {
  id?: string
  customerName?: string | null
  shortName?: string
}
