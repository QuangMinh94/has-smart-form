import Filter from "../../../components/Filter/layoutFilter"
interface Props {
    children: React.ReactNode
}

const LayoutSideMenu = ({ children }: Props) => {
    return (
        <div>
            <h1
                style={{
                    color: "black",
                    paddingBottom: "10px",
                    borderBottom: "2px solid grey",
                    fontSize: "20px"
                }}
            >
                Công việc của tôi
            </h1>
            <div
                style={{
                    margin: "10px 0"
                }}
            >
                <Filter />
            </div>
            <div>{children}</div>
        </div>
    )
}

export default LayoutSideMenu
