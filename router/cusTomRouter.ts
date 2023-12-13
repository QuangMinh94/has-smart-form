import { setting } from "./../app/ba/(component)/ButtonOpenModal"
import { Role } from "./../app/(types)/Role"
export type rootPath = "teller" | "ksvteller" | "ba" | "administrator"
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

const routers = (root: rootPath) => {
    const router = {
        // teller
        mywork: { path: `/${root}/${MYWORK}` },
        queries: { path: `/${root}/${QUERIES}` },
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
        block: { path: `/${root}/${BLOCK}` },
        product: { path: `/${root}/${PRODUCT}` },
        blockDetail() {
            return `${this.block.path}/${DE_TAIL}`
        },
        // admninistrator
        user: { path: `/${root}/${USER}` },
        role: { path: `/${root}/${ROLE}` },
        department: { path: `/${root}/${DEPARTMENT}` },
        group: { path: `/${root}/${GROUP}` },
        setting: { path: `/${root}/${SETTING}` }
    }
    return router
}

export default routers
