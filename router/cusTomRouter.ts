export type rootPath = "teller" | "ksvteller" | "ba"
export const APP_ROVE = "appRove"
export const DE_TAIL = "detail"
export const BLOCK = "block"
export const PRODUCT = "product"
export const MYWORK = "mywork"

const routers = (root: rootPath) => {
    const router = {
        // teller
        mywork: { path: `/${root}/${MYWORK}` },
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
        }
    }
    return router
}

export default routers
