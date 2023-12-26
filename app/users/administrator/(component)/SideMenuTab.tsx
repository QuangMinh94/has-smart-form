"use client"
import routers from "@/router/cusTomRouter"
import { Menu, theme, Tooltip } from "antd"
import React from "react"

import {
    faBoxArchive,
    faBuilding,
    faCogs,
    faUser,
    faUsers
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Link from "next/link"
import { usePathname } from "next/navigation"

type KeyPath = {
    ADMIN_USER: string
    ADMIN_ROLE: string
    ADMIN_DEPARTMENT: string
    ADMIN_GROUP: string
    ADMIN_SETTING: string
    ADMIN_FORM_MANAGEMENT: string
}
type conditionPath = {
    isAdminUser: boolean
    isAdminRole: boolean
    isDepartment: boolean
    isGroup: boolean
    isSetting: boolean
}

const CustomMenu = ({ backgroundColor }: { backgroundColor: string }) => {
    const pathname = usePathname()
    const keyPath: KeyPath = {
        ADMIN_USER: routers("administrator").user.path,
        ADMIN_ROLE: routers("administrator").role.path,
        ADMIN_DEPARTMENT: routers("administrator").department.path,
        ADMIN_GROUP: routers("administrator").group.path,
        ADMIN_SETTING: routers("administrator").setting.path,
        ADMIN_FORM_MANAGEMENT: routers("administrator").formManagement.path
    }
    const conditionPath: conditionPath = {
        isAdminUser: pathname.startsWith(keyPath.ADMIN_USER),
        isAdminRole: pathname.startsWith(keyPath.ADMIN_ROLE),
        isDepartment: pathname.startsWith(keyPath.ADMIN_DEPARTMENT),
        isGroup: pathname.startsWith(keyPath.ADMIN_GROUP),
        isSetting: pathname.startsWith(keyPath.ADMIN_SETTING)
    }

    const selectedKeys: string[] = []

    let items: any = [
        {
            key: keyPath.ADMIN_USER,
            icon: (
                <Tooltip placement="rightTop" title={"Quản trị người dùng"}>
                    <Link href={keyPath.ADMIN_USER}>
                        <FontAwesomeIcon
                            icon={faUser}
                            style={{ color: "black" }}
                        />
                    </Link>
                </Tooltip>
            )
        },
        {
            key: keyPath.ADMIN_DEPARTMENT,
            icon: (
                <Tooltip placement="rightTop" title={"Quản trị đơn vị"}>
                    <Link href={keyPath.ADMIN_DEPARTMENT}>
                        <FontAwesomeIcon
                            icon={faBuilding}
                            style={{ color: "black" }}
                        />
                    </Link>
                </Tooltip>
            )
        },
        {
            key: keyPath.ADMIN_GROUP,
            icon: (
                <Tooltip placement="rightTop" title={"Quản trị nhóm"}>
                    <Link href={keyPath.ADMIN_GROUP}>
                        <FontAwesomeIcon
                            icon={faUsers}
                            style={{ color: "black" }}
                        />
                    </Link>
                </Tooltip>
            )
        },
        // {
        //     key: keyPath.ADMIN_ROLE,
        //     icon: (
        //         <Tooltip placement="rightTop" title={"Quản trị nhóm quyền"}>
        //             <Link href={keyPath.ADMIN_ROLE}>
        //                 <FontAwesomeIcon
        //                     icon={faUserTag}
        //                     style={{ color: "black" }}
        //                 />
        //             </Link>
        //         </Tooltip>
        //     )
        // },
        {
            key: keyPath.ADMIN_SETTING,
            icon: (
                <Tooltip placement="rightTop" title={"Cài đặt"}>
                    <Link href={keyPath.ADMIN_SETTING}>
                        <FontAwesomeIcon
                            icon={faCogs}
                            style={{ color: "black" }}
                        />
                    </Link>
                </Tooltip>
            )
        },
        {
            key: keyPath.ADMIN_FORM_MANAGEMENT,
            icon: (
                <Tooltip placement="rightTop" title={"Quản lý form"}>
                    <Link href={keyPath.ADMIN_FORM_MANAGEMENT}>
                        <FontAwesomeIcon
                            icon={faBoxArchive}
                            style={{ color: "black" }}
                        />
                    </Link>
                </Tooltip>
            )
        }
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
    if (conditionPath.isGroup) {
        selectedKeys.push(keyPath.ADMIN_GROUP)
    }
    if (conditionPath.isSetting) {
        selectedKeys.push(keyPath.ADMIN_SETTING)
    }
    return (
        <Menu
            style={{ backgroundColor }}
            selectedKeys={selectedKeys}
            items={items}
        />
    )
}

type Props = {
    children: React.ReactNode
}
const SideMenu = ({ children }: Props) => {
    const {
        token: { colorBgContainer }
    } = theme.useToken()

    return (
        <div className="h-screen flex">
            <CustomMenu backgroundColor={colorBgContainer} />
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
