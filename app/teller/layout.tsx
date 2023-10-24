import SideMenu from "./(components)/SideMenu"

interface Props {
    children: any
}

const BuLayout = ({ children }: Props) => {
    return (
        <>
            <SideMenu>{children}</SideMenu>
        </>
    )
}

export default BuLayout
