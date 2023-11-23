"use client"
import routers, {
    BLOCK,
    PRODUCT,
    MYWORK,
    rootPath
} from "@/router/cusTomRouter"
import { Image, Layout, Menu, theme } from "antd"
import React, { useState } from "react"
import ButtonLogOut from "@/app/teller/(components)/customButton/ButtonLogout"

import Filter from "@/app/teller/(components)/Filter/LayoutFilter"
import Link from "next/link"
import { faArchive, faFile } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { usePathname } from "next/navigation"
type KeyPath = {
    BA_BLOCK: string
    BA_PRODUCT: string
    KSV_MYWORK: string
    TELLER_MYWORK: string
}
type conditionPath = {
    isBaBlock: boolean
    isBaProduct: boolean
    isKsvMywork: boolean
    isTellerMywork: boolean
}
const { Header, Sider, Content } = Layout

const CustomMenu = ({
    backgroundColor,
    keyPath,
    conditionPath
}: {
    backgroundColor: string
    keyPath: KeyPath
    conditionPath: conditionPath
}) => {
    const selectedKeys: string[] = []
    let items: any = []

    // set slectkey
    if (conditionPath.isBaBlock) {
        selectedKeys.push(keyPath.BA_BLOCK)
    }
    if (conditionPath.isBaProduct) {
        selectedKeys.push(keyPath.BA_PRODUCT)
    }
    if (conditionPath.isKsvMywork) {
        selectedKeys.push(keyPath.KSV_MYWORK)
    }
    if (conditionPath.isTellerMywork) {
        selectedKeys.push(keyPath.TELLER_MYWORK)
    }

    //set item
    if (conditionPath.isBaBlock || conditionPath.isBaProduct) {
        items = [
            {
                key: keyPath.BA_BLOCK,
                icon: (
                    <Link href={`${routers("ba").block.path}`}>
                        <FontAwesomeIcon icon={faFile} />
                    </Link>
                ),
                label: "Biểu mẫu"
            },
            {
                key: keyPath.BA_PRODUCT,
                icon: (
                    <Link href={`${routers("ba").product.path}`}>
                        <FontAwesomeIcon icon={faArchive} />
                    </Link>
                ),
                label: "Sản phẩm"
            }
        ]
    }
    if (conditionPath.isKsvMywork) {
        items = [
            {
                key: keyPath.KSV_MYWORK,
                icon: (
                    <Link href={`${routers("ksvteller").mywork.path}`}>
                        ,
                        <FontAwesomeIcon icon={faArchive} />
                    </Link>
                ),
                label: "Công việc của tôi"
            }
        ]
    }
    if (conditionPath.isTellerMywork) {
        items = [
            {
                key: keyPath.TELLER_MYWORK,
                icon: (
                    <Link href={`${routers("teller").mywork.path}`}>
                        ,
                        <FontAwesomeIcon icon={faArchive} />
                    </Link>
                ),
                label: "Công việc của tôi"
            }
        ]
    }
    return (
        <Menu
            style={{ backgroundColor }}
            defaultSelectedKeys={[BLOCK]}
            selectedKeys={selectedKeys}
            items={items}
        />
    )
}
type Props = {
    children: React.ReactNode
}
const SideMenu = ({ children }: Props) => {
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(false)
    const {
        token: { colorBgContainer, colorPrimary }
    } = theme.useToken()
    const keyPath: KeyPath = {
        BA_BLOCK: `/ba/${BLOCK}`,
        BA_PRODUCT: `/ba/${PRODUCT}`,
        KSV_MYWORK: `/ksvteller/${MYWORK}`,
        TELLER_MYWORK: `/teller/${MYWORK}`
    }
    const conditionPath: conditionPath = {
        isBaBlock: pathname.startsWith(keyPath.BA_BLOCK),
        isBaProduct: pathname.startsWith(keyPath.BA_PRODUCT),
        isKsvMywork: pathname.startsWith(keyPath.KSV_MYWORK),
        isTellerMywork: pathname.startsWith(keyPath.TELLER_MYWORK)
    }
    return (
        <Layout hasSider={true} className="h-screen flex">
            <Sider
                collapsible
                collapsed={collapsed}
                style={{ backgroundColor: colorPrimary }}
                onCollapse={(value) => setCollapsed(value)}
            >
                <center>
                    <Image
                        className="mt-2 mb-2"
                        width="40%"
                        preview={false}
                        src={`/img/hptIconKnowingIT.png`}
                        fallback="data:image/png;base64,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"
                        alt="Icon"
                    />
                </center>
                <CustomMenu
                    keyPath={keyPath}
                    conditionPath={conditionPath}
                    backgroundColor={colorPrimary}
                />
            </Sider>
            <Layout>
                <Header
                    className="flex items-center"
                    style={{
                        padding: "0 15px 0 15px",
                        background: colorBgContainer
                    }}
                >
                    <h1
                        className=" text-xl grow "
                        style={{
                            color: colorPrimary
                        }}
                    >
                        {conditionPath.isBaBlock && "Biểu Mẫu"}
                        {conditionPath.isBaProduct && "Sản Phẩm"}
                        {(conditionPath.isKsvMywork ||
                            conditionPath.isTellerMywork) &&
                            "Công việc của tôi"}
                    </h1>

                    <ButtonLogOut />
                </Header>
                <Content
                    style={{
                        borderRadius: "10px",
                        margin: "24px 16px",
                        padding: 20,
                        minHeight: 280,
                        background: colorBgContainer,
                        overflowY: "scroll"
                    }}
                >
                    <div className="my-6">
                        {conditionPath.isTellerMywork && (
                            <Filter rootPath="teller" />
                        )}
                        {conditionPath.isKsvMywork && (
                            <Filter rootPath="ksvteller" />
                        )}
                    </div>
                    <div>{children}</div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default SideMenu
