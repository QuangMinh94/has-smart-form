type Categories = {
    _id: string
    categoryId: number
    type: string
    level: number
    name: string
}

export type CategoriesRequest = {
    _id?: number
    categoryId?: number
    type?: string
    color?: string
    name?: string
}

export enum CategoryTypes {
    CHANNEL = "Channel",
    DEPARTMENT_TYPE = "DepartmentType",
    STATUS_FORM = "StatusForm",
    BUSINESS_TYPE = "BusinessType",
    PRODUCT_TYP = "ProductType",
    STAUTS_CASE_INFO = "StatusCaseInfo"
}

export interface StatusCategory extends Categories {}

export interface PriorityCategory extends Categories {}

export interface RepetitiveModeCategory extends Categories {}

export interface Category extends Categories {}
