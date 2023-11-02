import Link from "antd/es/typography/Link"
import NextLink from "next/link"
import { ReactNode } from "react"

interface Props {
    href: string
    children: ReactNode
}

const CustomLink = ({ href, children }: Props) => {
    return (
        <NextLink href={href} passHref legacyBehavior>
            <Link>{children}</Link>
        </NextLink>
    )
}

export default CustomLink
