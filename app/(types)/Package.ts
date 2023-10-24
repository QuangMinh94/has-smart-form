
export interface Package {
    _id?: string
    Stt?: Number
    name?: string
    prices?: number
    endDate?: string
    startDate?: string
    active?: boolean
    description?: string
    selected?: boolean
    createdDate?: string
    creator?: string
    numberOfUser?: number
    process?: string[]
    paymentCycle?: string
}
export interface packageRequest {
    Id?: string
    description?: string
    startDate?: string
    endDate?: string
    name?: string
    numberOfUser?: number
    prices?: number
    paymentCycle?: string
    process?: string[]
    active?: boolean
}
export interface bodygetPackage { name?: string, active?: boolean }