
import LayoutSideMenu from "../(components)/LayoutPageInSideMenu"
import Filter from "../(components)/Filter/LayoutFilter"
type Props = {
    children: React.ReactNode
}
const Layout = (props: Props) => {
    return (
        <LayoutSideMenu title="Công việc của tôi" filter={<Filter />}>
            {props.children}
        </LayoutSideMenu>
    )
}
export default Layout
