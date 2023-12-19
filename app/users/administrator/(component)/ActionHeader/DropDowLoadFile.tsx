import React, { useState, memo, useMemo } from "react"
import {
    useContextAdmin,
    useContextAdminUser
} from "@/components/cusTomHook/useContext"
import {
    Users,
    BodyUserRequestFileExcel,
    ResponseAddUser
} from "@/app/(types)/Users"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons"
import { Divider, Space, Modal, Popover } from "antd"
import TableUploadUser from "@/app/users/administrator/(component)/table/tableUploadfileUser"
import ExportFileExcel from "@/app/users/administrator/(component)/uploadFile/BtnExportFileExcel"
import ImportFileExcel from "@/app/users/administrator/(component)/uploadFile/BtnImportFileExcel"
import { addMultipleUser } from "@/app/(service)/User"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import { RevalidateListUser } from "@/app/(actions)/action"
import { useEnvContext } from "next-runtime-env"

const UploadFilest: React.FC = () => {
    const {
        dataGlobal: { DataUploadUsers, Users }
    } = useContextAdminUser()
    const { session, token } = useCustomCookies()
    const { NEXT_PUBLIC_ADD_MULTIP_USER } = useEnvContext()
    const [openModalPreviewAddUsers, setOpenModalPreviewAddUsers] =
        useState<boolean>(false)
    const [openPopoverOption, setOpenPopoverOption] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const { messageApi } = useContextAdmin()
    const [openErr, setIsModalOpenErr] = useState<boolean>(false)
    const ListUserName = useMemo(() => {
        return new Set(
            Users.map((item) => item.userName?.toLowerCase().replace(/\s/g, ""))
        )
    }, [Users.length])

    const handleOpenPopoverOption = (newOpen: boolean) => {
        setOpenPopoverOption(newOpen)
    }
    const handleCloseModalListUsers = () => {
        setOpenModalPreviewAddUsers(false)
    }

    const addUserUpload = async (data: Users[]) => {
        try {
            function isValidEmail(email: string) {
                const emailRegex =
                    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                return emailRegex.test(email)
            }
            // dk userName thêm vào có bị trùng nhau hay khong
            const userCheckUserName = data.find((user) => {
                // check userName trong database có trùng nhau ko
                if (
                    ListUserName.has(
                        user.userName?.toLowerCase().replace(/\s/g, "")
                    )
                ) {
                    return true
                }
                // check  userName Excel trong có bị trùng nhau ko
                const isAlreadyExitsUserName = DataUploadUsers.filter(
                    (item) => item._id !== user._id
                ).some(
                    (item) =>
                        item.userName?.toLowerCase().replace(/\s/g, "") ===
                        user.userName?.toLowerCase().replace(/\s/g, "")
                )
                return isAlreadyExitsUserName
            })
            // dk mail có hợp lệ hay không
            const checkMail = data.find(
                (item) => !isValidEmail(item?.mail ?? "")
            )

            // check xem mail có hợp lệ hay không
            if (checkMail?._id || checkMail?.mail) {
                //mail không hợp lệ
                messageApi(
                    "error",
                    `Stt: "${checkMail?._id}"    Mail: "${checkMail?.mail}" is not valid E-mail!`
                )
            }
            // check userName thêm vào có bị trùng nhau hay khong
            else if (userCheckUserName?._id || userCheckUserName?.userName) {
                messageApi(
                    "error",
                    `Stt: "${userCheckUserName?._id}"   UserName: "${userCheckUserName?.userName}" already have users!`
                )
            }
            // thỏa mãn dk
            else {
                setLoading(true)
                console.log("oke", DataUploadUsers)
                const Users: BodyUserRequestFileExcel[] = DataUploadUsers.map(
                    (user) => {
                        return {
                            firstName: user?.firstName ?? "",
                            lastName: user?.lastName ?? "",
                            group: user?.defaultGroup?.name ?? "",
                            department: user.department?.name ?? "",
                            userName: user?.userName ?? "",
                            email: user?.mail ?? "",
                            phoneNumber: user?.phone ?? "",
                            authenProvider: user.authenProvider?.Name ?? "",
                            active: !!user.active
                        }
                    }
                )
                console.log("Uploaduser", Users)
                const res = await addMultipleUser({
                    url: NEXT_PUBLIC_ADD_MULTIP_USER!,
                    bodyRequest: { users: Users },
                    session,
                    token
                })
                const reqAddUser: ResponseAddUser[] = res.data
                setLoading(false)

                // kiểm tra xem có user nào add thất bại
                const ListCheck = reqAddUser
                    .filter((item) => item?.uploaded !== "Success")
                    .map((item) => item.uploaded)

                const msgErr = ListCheck.join(", ")
                if (ListCheck.length <= 0) {
                    messageApi("success", "Add file user succeeded ")
                    RevalidateListUser()
                    handleCloseModalListUsers()
                } else {
                    messageApi("error", `User : ${msgErr} add Error`)
                }
            }
        } catch (err: any) {
            const { code, data, type } = err?.response?.data
            if (code === 500) {
                if (type === "PACKAGE_ERRORS") {
                    setIsModalOpenErr(true)
                } else {
                    messageApi("error", "Add file user failed")
                }
            } else {
                messageApi("error", "có lỗi vui lòng thử lại sau")
            }

            setLoading(false)
        }
    }
    return (
        <>
            <Space direction="horizontal" size={"small"}>
                <Popover
                    placement="bottom"
                    trigger="click"
                    open={openPopoverOption}
                    onOpenChange={handleOpenPopoverOption}
                    content={
                        <Space direction="vertical" align="center">
                            <ExportFileExcel />
                            <ImportFileExcel
                                setOpenPopoverOption={setOpenPopoverOption}
                                setmodal={setOpenModalPreviewAddUsers}
                            />
                        </Space>
                    }
                >
                    <FontAwesomeIcon
                        icon={faEllipsisH}
                        style={{ cursor: "pointer", color: "black" }}
                        size="lg"
                    />
                </Popover>
            </Space>
            <Modal
                destroyOnClose={true}
                title={
                    <div style={{ display: "flex" }}>
                        <span style={{ flex: "1" }}>Add User</span>
                    </div>
                }
                open={openModalPreviewAddUsers}
                onCancel={handleCloseModalListUsers}
                width={1000}
                onOk={() => {
                    if (DataUploadUsers.length > 0) {
                        addUserUpload(DataUploadUsers)
                    } else {
                        messageApi("error", "No data user!")
                    }
                }}
                confirmLoading={loading}
                okText="Save"
                style={{ height: "400px" }}
                // footer={null}
            >
                <Divider
                    style={{
                        margin: "0px",
                        backgroundColor: "black"
                    }}
                />
                <TableUploadUser />
            </Modal>
            {/* <ModalAlert
                setIsModalOpenErr={setIsModalOpenErr}
                title="Không thể tạo loạt user mới"
                open={openErr}
                conTent="Số lượng user active vượt quá số lượng cho phép!"
            /> */}
        </>
    )
}
export default memo(UploadFilest)
