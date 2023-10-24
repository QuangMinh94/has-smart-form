import { ThemeGlobal } from "../../redux/features/theme/themeSlice"

export interface Organization {
    Active?: boolean
    Address?: string
    CreatedDate?: Date
    Email?: string
    Name?: string
    Phone?: string
    UpdatedDate?: Date
    _id?: string
    themeGlobal?: ThemeGlobal
}