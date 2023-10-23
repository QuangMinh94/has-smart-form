
const rootTeler = `/teller`
const routers = {
    mywork: { path: `${rootTeler}/mywork` },
    detailMywork: {
        path(params: { id: string }) {
            return `${routers.mywork.path}/detail/${params.id}`
        }
    }
}
export default routers
