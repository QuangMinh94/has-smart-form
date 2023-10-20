// "use client"

interface Props {
    children: React.ReactNode
    title: string
    filter: React.ReactNode
}

const LayoutSideMenu = ({ children, title, filter }: Props) => {
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
                {title}
            </h1>
            <div
                style={{
                    margin: "10px 0"
                }}
            >
                {filter}
            </div>
            <div>{children}</div>
        </div>
    )
}

export default LayoutSideMenu
