export type rootPath = "teller" | "ksvTeller"
const routers = (root: rootPath) => {
    const router = {
        mywork: { path: `/${root}/mywork` },
        detailMywork: {
            path(params: { id: string }): string {
                return `${router.mywork.path}/detail/${params.id}`
            }
        }
    }
    return router
}

export default routers
