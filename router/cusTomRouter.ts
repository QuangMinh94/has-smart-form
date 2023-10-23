import { root } from "postcss"

const locationPath = window.location.origin
const rootBu = `/bu`
const routers = {
    mywork: { path: `${rootBu}/mywork` },
    detailMywork: {
        path(params: { id: string }) {
            return `${routers.mywork.path}/detail/${params.id}`
        }
    }
}
export default routers
