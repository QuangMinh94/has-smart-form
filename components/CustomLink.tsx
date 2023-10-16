import Link from "antd/es/typography/Link"
import NextLink from "next/link"

interface Props {
    href: string
    children: string
}

const CustomLink = ({ href, children }: Props) => {
    return (
        <NextLink href={href} passHref legacyBehavior>
            <Link>{children}</Link>
        </NextLink>
    )
}

export default CustomLink
