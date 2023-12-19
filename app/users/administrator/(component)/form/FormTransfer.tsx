import { pathModel } from "@/app/users/administrator/(component)/BtnModal"

import React, { useEffect, useState, memo } from "react"
import {
    useContextTransferANTD,
    useContextAdmin
} from "@/components/cusTomHook/useContext"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import { useEnvContext } from "next-runtime-env"
import { Transfer, Button, Spin } from "antd"
import type { TransferDirection } from "antd/es/transfer"
import { RecordType } from "@/app/users/administrator/(component)/content/contentTransfer"
import { SearchUser, getUserByDepartment } from "@/app/(service)/User"
import { addUserToDepartment } from "@/app/(service)/department"
import { addUserToGroup } from "@/app/(service)/group"
import { Users } from "@/app/(types)/Users"
import { ToFilterName } from "@/util/formatText"
import { RevalidateListDepartment } from "@/app/(actions)/action"
import { typeFormTransfer } from "@/app/users/administrator/(component)/BtnModal"

type Props = {
    pathModel: pathModel
    typeForm: typeFormTransfer
    rowData: any
    CancelModal: () => void
}

const TransferForm: React.FC<Props> = ({
    pathModel,
    CancelModal,
    typeForm,
    rowData
}) => {
    const {
        NEXT_PUBLIC_SEARCH_USER,
        NEXT_PUBLIC_GET_BY_DEPARTMENT,
        NEXT_PUBLIC_ADD_USER_TO_DEPARTMENT,
        NEXT_PUBLIC_ADD_USER_TO_GROUP
    } = useEnvContext()
    const { session, token } = useCustomCookies()
    const { messageApi } = useContextAdmin()
    const { setTargetKeys, setData, Data, targetKeys } =
        useContextTransferANTD()
    const [loadingList, setloadingList] = useState<boolean>(false)
    const [loadingSave, setloadingSave] = useState<boolean>(false)
    const [objGetByID, setGetByID] = useState<any>({})
    const [targetKeySave, setTargetKeySave] = useState<string[]>([])

    const ServiceSave: any = {
        ADMIN_DEPARTMENT: async () => {
            try {
                const res = await addUserToDepartment({
                    url: NEXT_PUBLIC_ADD_USER_TO_DEPARTMENT!,
                    bodyRequest: {
                        department: rowData?._id ?? "",
                        userList: targetKeySave
                    },
                    session,
                    token
                })

                await RevalidateListDepartment()
                messageApi("success", "cập nhật thành công")
                CancelModal()
            } catch (e) {
                messageApi("error", "có lỗi vui lòng thử lại sau !")
            }
        },
        ADMIN_GROUP: async () => {
            try {
                const res = await addUserToGroup({
                    url: NEXT_PUBLIC_ADD_USER_TO_GROUP!,
                    bodyRequest: {
                        groupId: rowData?._id ?? "",
                        listUser: targetKeySave
                    },
                    session,
                    token
                })

                await RevalidateListDepartment()
                messageApi("success", "cập nhật thành công")
                CancelModal()
            } catch (e) {
                messageApi("error", "có lỗi vui lòng thử lại sau !")
            }
        }
    }

    useEffect(() => {
        const fecthData = async () => {
            setloadingList(true)
            try {
                const tempTargetKeys: string[] = []
                const tempData: RecordType[] = []
                const objGETid: any = {}
                if (
                    pathModel === "ADMIN_DEPARTMENT" ||
                    pathModel === "ADMIN_GROUP"
                ) {
                    if (typeForm === "UPDATE_TRANSFER") {
                        if (pathModel === "ADMIN_DEPARTMENT") {
                            const resUserByDepartment =
                                await getUserByDepartment({
                                    url: NEXT_PUBLIC_GET_BY_DEPARTMENT!,
                                    bodyRequest: { department: rowData?._id },
                                    session,
                                    token
                                })
                            const UsersByDepartment: Users[] =
                                resUserByDepartment.data
                            UsersByDepartment.forEach((user) => {
                                tempTargetKeys.push(`${user?._id}`)
                                objGETid[
                                    `${user?._id}`
                                ] = `${user?.firstName} ${user?.lastName}`
                            })
                        }
                        if (pathModel === "ADMIN_GROUP") {
                            tempTargetKeys.push(...targetKeys)
                            targetKeys.forEach((key) => {
                                objGETid[`${key}`] = true
                            })
                        }
                        setTargetKeys(tempTargetKeys)
                    }
                    // gọi server lấy rea list user
                    const resSearchUser = await SearchUser({
                        url: NEXT_PUBLIC_SEARCH_USER!,
                        bodyRequest: { name: "", active: true },
                        session,
                        token
                    })
                    const Users: Users[] = resSearchUser.data
                    console.log("user", Users)
                    Users.forEach((user) => {
                        tempData.push({
                            key: user?._id ?? "",
                            title: `${user.firstName} ${user.lastName}`,
                            chosen: false,
                            disabled: tempTargetKeys.includes(user?._id ?? "")
                        })
                    })
                }

                setGetByID(objGETid)
                setData(tempData)
            } catch (e) {
                messageApi("error", "có lỗi vui lòng thử lại sau")
            }
            setloadingList(false)
        }
        fecthData()
    }, [])
    const filterOption = (inputValue: string, option: RecordType) =>
        ToFilterName(option.title).indexOf(ToFilterName(inputValue)) > -1

    const handleChange = (newTargetKeys: string[]) => {
        const targetKeySave = newTargetKeys.filter((key) => !objGetByID[key])
        setTargetKeys(newTargetKeys)
        setTargetKeySave(targetKeySave)
    }

    const handleSearch = (dir: TransferDirection, value: string) => {
        console.log("search:", dir, value)
    }
    console.log("targetKeys", targetKeys)
    console.log("targetKeyss2", targetKeySave)
    return (
        <>
            {loadingList ? (
                <Spin />
            ) : (
                <>
                    <Transfer
                        operations={["Thêm tài khoản"]}
                        oneWay
                        locale={{
                            itemUnit: "Tài khoản được thêm",
                            itemsUnit: "Tài khoản ",
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
                    {typeForm === "UPDATE_TRANSFER" && (
                        <div className="mt-[1vh] flex justify-end">
                            <Button
                                danger
                                type="primary"
                                style={{ marginRight: "1vw" }}
                                onClick={CancelModal}
                            >
                                Hủy
                            </Button>
                            <Button
                                onClick={async () => {
                                    setloadingSave(true)
                                    await ServiceSave[pathModel]()
                                    setloadingSave(false)
                                }}
                                loading={loadingSave}
                                type="primary"
                            >
                                Lưu
                            </Button>
                        </div>
                    )}
                    {typeForm === "ADD_TRANSFER" && (
                        <div className="mt-[1vh] flex justify-end">
                            <Button danger type="primary" onClick={CancelModal}>
                                Đóng
                            </Button>
                        </div>
                    )}
                </>
            )}
        </>
    )
}
export default memo(TransferForm)
