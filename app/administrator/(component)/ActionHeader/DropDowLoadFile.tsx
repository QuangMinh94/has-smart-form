import React, { useState, memo } from "react"
import { useContextAdmin } from "@/components/cusTomHook/useContext"
import {
    Users,
    BodyUserRequestFileExcel,
    ResponseAddUser
} from "@/app/(types)/Users"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons"
import { Divider, Space, Modal, Popover } from "antd"
import TableUploadUser from "@/app/administrator/(component)/table/tableUploadfileUser"
import ExportFileExcel from "@/app/administrator/(component)/uploadFile/BtnExportFileExcel"
import ImportFileExcel from "@/app/administrator/(component)/uploadFile/BtnImportFileExcel"
const UploadFilest: React.FC = () => {
    const ListUploadUser: any = []
    const ListUser: any = []

    const [openModalPreviewAddUsers, setOpenModalPreviewAddUsers] =
        useState<boolean>(false)
    const [openPopoverOption, setOpenPopoverOption] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const { messageApi } = useContextAdmin()
    const [openErr, setIsModalOpenErr] = useState<boolean>(false)
    const ListUserName = new Set(
        ListUser.map((item: any) =>
            item.UserName?.toLowerCase().replace(/\s/g, "")
        )
    )

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
                const isAlreadyExitsUserName = ListUploadUser.filter(
                    (item: any) => item._id !== user._id
                ).some(
                    (item: any) =>
                        item.UserName?.toLowerCase().replace(/\s/g, "") ===
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
                const body: BodyUserRequestFileExcel[] = ListUploadUser.map(
                    (user: any) => {
                        return {
                            FirstName: user?.FirstName ?? "",
                            LastName: user?.LastName ?? "",
                            Group: user?.Group?.[0].Name ?? "",
                            Department: user.Department?.Name ?? "",
                            UserName: user?.UserName ?? "",
                            Email: user?.Mail ?? "",
                            PhoneNumber: user?.Phone ?? "",
                            AuthenProvider: user.AuthenProvider?.Name ?? "",
                            Active: !!user.Active
                        }
                    }
                )
                // const req: ResponseAddUser[] = await addMultipleUser(body)
                setLoading(false)

                // kiểm tra xem có user nào add thất bại
                // const ListCheck = req
                //     .filter((item) => item?.Uploaded !== "Success")
                //     .map((item) => item.Uploaded)

                // const msgErr = ListCheck.join(", ")
                // if (ListCheck.length <= 0) {
                //     messageApi("success", "Add file user succeeded ")
                //     // dispatch(addUsers())
                // } else {
                //     messageApi("error", `User : ${msgErr} add Error`)
                //     // dispatch(addUsers())
                // }
                handleCloseModalListUsers()
            }
        } catch (err: any) {
            const { code, data, type } = err?.response?.data
            if (code === 500) {
                if (type === "PACKAGE_ERRORS") {
                    setIsModalOpenErr(true)
                } else {
                    messageApi("error", "Add file user failed")
                }
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
                    if (ListUploadUser.length > 0) {
                        addUserUpload(ListUploadUser)
                    } else {
                        messageApi("error", "No data user!")
                    }
                }}
                confirmLoading={loading}
                okText="Save"
                bodyStyle={{ height: "400px" }}
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
