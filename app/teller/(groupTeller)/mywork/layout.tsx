import Provider from "../../components/provider/ProviderMywork"
import LayoutSideMenu from "@/app/teller/components/LayoutPageInSideMenu"
import Filter from "@/app/teller/components/Filter/LayoutFilter"
type Props = {
    children: React.ReactNode
}
const Layout = (props: Props) => {
    return (
        <LayoutSideMenu title="Công việc của tôi" filter={<Filter />}>
            <Provider>{props.children}</Provider>
        </LayoutSideMenu>
    )
}
export default Layout
