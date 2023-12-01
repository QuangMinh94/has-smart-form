"use client"
import ButtonLogOut from "@/app/teller/(components)/customButton/ButtonLogout"
import routers, { BLOCK, MYWORK, PRODUCT } from "@/router/cusTomRouter"
import { Image, Layout, Menu, theme, Tooltip } from "antd"
import React, { useState } from "react"

import Filter from "@/app/teller/(components)/Filter/LayoutFilter"
import { faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSession } from "next-auth/react"
import { useEnvContext } from "next-runtime-env"
import Link from "next/link"
import { usePathname } from "next/navigation"

type KeyPath = {
    ADMIN_USER: string
}
type conditionPath = {
    isAdminUser: boolean
}
const { Header, Sider, Content } = Layout

const CustomMenu = ({
    keyPath,
    conditionPath,
    backgroundColor
}: {
    keyPath: KeyPath
    conditionPath: conditionPath
    backgroundColor: string
}) => {
    const selectedKeys: string[] = []
    let items: any = [
        {
            key: keyPath.ADMIN_USER,
            icon: (
                <Tooltip placement="rightTop" title={"Quản trị người dùng"}>
                    <Link href={keyPath.ADMIN_USER}>
                        <FontAwesomeIcon icon={faUsers} />
                    </Link>
                </Tooltip>
            )
        }
    ]

    // set slectkey
    if (conditionPath.isAdminUser) {
        selectedKeys.push(keyPath.ADMIN_USER)
    }

    return (
        <Menu
            style={{ backgroundColor }}
            // defaultSelectedKeys={[BLOCK]}
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

    const {
        token: { colorBgContainer, colorPrimary }
    } = theme.useToken()
    const keyPath: KeyPath = {
        ADMIN_USER: routers("administrator").user.path
    }
    const conditionPath: conditionPath = {
        isAdminUser: pathname.startsWith(keyPath.ADMIN_USER)
    }

    return (
        <div className="h-screen flex">
            <CustomMenu
                backgroundColor={colorBgContainer}
                conditionPath={conditionPath}
                keyPath={keyPath}
            />

            <div
                style={{
                    padding: 20,
                    width: "100%",
                    background: colorBgContainer,
                    overflowY: "scroll"
                }}
            >
                {children}
            </div>
        </div>
    )
}

export default SideMenu
