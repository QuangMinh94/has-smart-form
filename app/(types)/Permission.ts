export interface Permission {
    _id?: string,
    Name?: string,
    Value?: boolean,
    Children?: Permission[]
    Active?: boolean
    CreatedDate?: string
    Object?: string
}
export interface bodyGetPermission{
    Active: boolean
}
