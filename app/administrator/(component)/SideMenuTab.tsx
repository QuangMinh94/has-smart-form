"use client"
import ButtonLogOut from "@/app/teller/(components)/customButton/ButtonLogout"
import routers from "@/router/cusTomRouter"
import { Layout, Menu, theme, Tooltip } from "antd"
import React from "react"

import { faUsers, faBuilding } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Link from "next/link"
import { usePathname } from "next/navigation"

type KeyPath = {
    ADMIN_USER: string
    ADMIN_ROLE: string
    ADMIN_DEPARTMENT: string
}
type conditionPath = {
    isAdminUser: boolean
    isAdminRole: boolean
    isDepartment: boolean
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
                        <FontAwesomeIcon
                            icon={faUsers}
                            style={{ color: "black" }}
                        />
                    </Link>
                </Tooltip>
            )
        }
        // {
        //     key: keyPath.ADMIN_DEPARTMENT,
        //     icon: (
        //         <Tooltip placement="rightTop" title={"Quản trị đơn vị"}>
        //             <Link href={keyPath.ADMIN_DEPARTMENT}>
        //                 <FontAwesomeIcon
        //                     icon={faBuilding}
        //                     style={{ color: "black" }}
        //                 />
        //             </Link>
        //         </Tooltip>
        //     )
        // }
        // {
        //     key: keyPath.ADMIN_ROLE,
        //     icon: (
        //         <Tooltip placement="rightTop" title={"Quản trị nhóm quyền"}>
        //             <Link href={keyPath.ADMIN_ROLE}>
        //                 <FontAwesomeIcon
        //                     icon={faUmbrella}
        //                     style={{ color: "black" }}
        //                 />
        //             </Link>
        //         </Tooltip>
        //     )
        // }
    ]

    // set slectkey
    if (conditionPath.isAdminUser) {
        selectedKeys.push(keyPath.ADMIN_USER)
    }
    if (conditionPath.isAdminRole) {
        selectedKeys.push(keyPath.ADMIN_ROLE)
    }
    if (conditionPath.isDepartment) {
        selectedKeys.push(keyPath.ADMIN_DEPARTMENT)
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
        ADMIN_USER: routers("administrator").user.path,
        ADMIN_ROLE: routers("administrator").role.path,
        ADMIN_DEPARTMENT: routers("administrator").department.path
    }
    const conditionPath: conditionPath = {
        isAdminUser: pathname.startsWith(keyPath.ADMIN_USER),
        isAdminRole: pathname.startsWith(keyPath.ADMIN_ROLE),
        isDepartment: pathname.startsWith(keyPath.ADMIN_DEPARTMENT)
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
