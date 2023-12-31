export type rootPath =
    | "teller"
    | "ksvteller"
    | "ba"
    | "administrator"
    | "profile"
export const APP_ROVE = "appRove"
export const DE_TAIL = "detail"
export const BLOCK = "block"
export const PRODUCT = "product"
export const MYWORK = "mywork"
export const USER = "user"
export const ROLE = "role"
export const DEPARTMENT = "department"
export const GROUP = "group"
export const QUERIES = "queries"
export const SETTING = "setting"
const CONNECTER = "connecter"
export const MANAGER = "manager"
export const CORRECTION = "correction"
export const ATTACH_BUSINESS = "attachbusiness"
export const FORM_MANAGEMENT = "formManagement"
const RootUsers = "users"
const routers = (root: rootPath) => {
    const router = {
        // teller
        mywork: { path: `/${RootUsers}/${root}/${MYWORK}` },
        queries: { path: `/${RootUsers}/${root}/${QUERIES}` },
        detailMywork: {
            path(params: { id: string }): string {
                return `${router.mywork.path}/${DE_TAIL}/${params.id}`
            }
        },
        appRove: {
            path(params: { id: string }): string {
                return `${router.mywork.path}/${APP_ROVE}/${params.id}`
            }
        },

        // ba
        block: { path: `/${RootUsers}/${root}/${BLOCK}` },
        product: { path: `/${RootUsers}/${root}/${PRODUCT}` },
        blockDetail() {
            return `${this.block.path}/${DE_TAIL}`
        },

        // admninistrator
        user: { path: `/${RootUsers}/${root}/${USER}` },
        role: { path: `/${RootUsers}/${root}/${ROLE}` },
        department: { path: `/${RootUsers}/${root}/${DEPARTMENT}` },
        group: { path: `/${RootUsers}/${root}/${GROUP}` },
        setting: { path: `/${RootUsers}/${root}/${SETTING}` },
        formManagement: { path: `/${RootUsers}/${root}/${FORM_MANAGEMENT}` },

        connecterManager: {
            path: `/${RootUsers}/${root}/${CONNECTER}/${MANAGER}`
        },
        connecterCorrection: {
            path: `/${RootUsers}/${root}/${CONNECTER}/${CORRECTION}`
        },
        connecterAttachBusiness: {
            path: `/${RootUsers}/${root}/${CONNECTER}/${ATTACH_BUSINESS}`
        },
        // profile
        profile: { path: `/${RootUsers}/${root}` },
        // admin
        admin: { path: `/${RootUsers}/${root}` }
    }
    return router
}

export default routers
