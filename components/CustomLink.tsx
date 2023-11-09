import Link from "antd/es/typography/Link"
import NextLink from "next/link"
import { ReactNode } from "react"
import { UrlObject } from "url"

interface Props {
    href: string | UrlObject
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
