export interface Organization {
    active?: boolean
    address?: string
    CreatedDate?: Date
    email?: string
    name?: string
    phone?: string
    updatedDate?: Date
    _id?: string
    themeGlobal?: {
        theme: {
            components: {
                Layout: {
                    colorBgBod: string
                }
            }
            token: {
                colorPrimary: string
                fontFamily: string
            }
        }
        logo: string
    }
}
export interface themeGlobal {
    theme: {
        token: {
            colorPrimary: string
        }
    }
    logo: string
}
export interface bodyRequestOrganization {
    id: string
    active: boolean
    themeGlobal: themeGlobal
}
