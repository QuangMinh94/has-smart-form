import { theme } from "antd"

export const CustomerLabel = ({
    text,
    children
}: {
    text: string
    children: React.ReactNode
}) => {
    const {
        token: { colorPrimary }
    } = theme.useToken()
    return (
        <div>
            <div style={{ color: colorPrimary }} className="mb-2 ">
                {text}
            </div>
            {children}
        </div>
    )
}
