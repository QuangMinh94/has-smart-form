import { pathModel } from "@/app/administrator/(component)/BtnModal"

import React, { useEffect, useState, memo, use } from "react"
import {
    useContextTransferANTD,
    useContextAdmin
} from "@/components/cusTomHook/useContext"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import { useEnvContext } from "next-runtime-env"
import { Transfer } from "antd"
import type { TransferDirection } from "antd/es/transfer"
import { RecordType } from "@/app/administrator/(component)/content/contentTransfer"
import { SearchUser } from "@/app/(service)/User"
import { Users } from "@/app/(types)/Users"
import { ToFilterName } from "@/util/formatText"
type Props = {
    pathModel: pathModel
    CancelModal: () => void
}

const TransferForm: React.FC<Props> = ({ pathModel, CancelModal }) => {
    const { NEXT_PUBLIC_SEARCH_USER } = useEnvContext()
    const { session, token } = useCustomCookies()
    const { messageApi } = useContextAdmin()
    const { setTargetKeys, setData, Data, targetKeys } =
        useContextTransferANTD()

    const fecthData = async () => {
        try {
            const tempTargetKeys: string[] = []
            const tempData: RecordType[] = []
            if (pathModel === "ADMIN_DEPARTMENT") {
                const res = await SearchUser({
                    url: NEXT_PUBLIC_SEARCH_USER!,
                    bodyRequest: { name: "", active: true },
                    session,
                    token
                })
                const Users: Users[] = res.data
                Users.forEach((user) => {
                    tempData.push({
                        key: user?._id ?? "",
                        title: `${user.firstName} ${user.lastName}`,
                        chosen: false
                    })
                })
            }
            setData(tempData)
        } catch (e) {
            messageApi("error", "có lỗi vui lòng thử lại sau")
        }
    }

    useEffect(() => {
        fecthData()
    }, [])

    const filterOption = (inputValue: string, option: RecordType) =>
        ToFilterName(option.title).indexOf(ToFilterName(inputValue)) > -1

    const handleChange = (newTargetKeys: string[]) => {
        setTargetKeys(newTargetKeys)
    }

    const handleSearch = (dir: TransferDirection, value: string) => {
        console.log("search:", dir, value)
    }
    console.log("targetKeys", targetKeys)

    return (
        <Transfer
            operations={["Thêm tài khoản"]}
            oneWay
            locale={{
                itemUnit: "Tài khoản",
                itemsUnit: "Tài khoản",
                notFoundContent: "danh sách trống"
            }}
            listStyle={{
                width: 250,
                height: 300
            }}
            dataSource={Data}
            showSearch
            filterOption={filterOption}
            targetKeys={targetKeys}
            onChange={handleChange}
            onSearch={handleSearch}
            render={(item) => item.title}
        />
    )
}
export default memo(TransferForm)
