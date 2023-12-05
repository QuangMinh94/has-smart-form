"use client"
import React, { useState, memo, useCallback } from "react"
import { PlusOutlined } from "@ant-design/icons"
import { Button, Modal, Checkbox } from "antd"
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ActiveForm from "@/app/administrator/(component)/form/ActiveForm"
import FormUser from "@/app/administrator/(component)/form/FormUser"
export type pathModel = "ADMIN_USER" | "ADMIN_ROLE" | "ADMIN_DEPARTMENT"
export type typeForm = "ADD_MODAL" | "UPDATE_MODAL" | "ACTIVE_MODAL"

type Props = {
    type: typeForm
    pathModel: pathModel
    titleModel: string
    rowData: any
    activeChecked?: boolean
    isUploadNotApi?: boolean
}
const titleBtnAdd = {
    ADMIN_USER: "Thêm tài khoản",
    ADMIN_ROLE: "Thêm nhóm quyền",
    ADMIN_DEPARTMENT: "Thêm đơn vị"
}

const BtnModal: React.FC<Props> = ({
    type,
    pathModel,
    titleModel,
    activeChecked,
    rowData,
    isUploadNotApi
}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    let Element
    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleCancel = useCallback(() => {
        setIsModalOpen(false)
    }, [])

    const FormPath = {
        ADMIN_USER: (
            <FormUser
                isUploadNotApi={isUploadNotApi}
                typeForm={type}
                CancelModal={handleCancel}
                rowData={type === "UPDATE_MODAL" ? rowData : {}}
            />
        ),
        ADMIN_ROLE: <></>,
        ADMIN_DEPARTMENT: <></>
    }
    const styleModal = pathModel === "ADMIN_USER" ? { top: "10px" } : undefined
    switch (type) {
        case "ADD_MODAL":
            Element = (
                <>
                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={showModal}
                    >
                        {titleBtnAdd[pathModel]}
                    </Button>
                    <Modal
                        style={styleModal}
                        title={titleModel}
                        open={isModalOpen}
                        onCancel={handleCancel}
                        destroyOnClose={true}
                        footer={null}
                    >
                        {FormPath[pathModel]}
                    </Modal>
                </>
            )
            break

        case "UPDATE_MODAL":
            Element = (
                <>
                    <FontAwesomeIcon
                        style={{ cursor: "pointer" }}
                        icon={faEdit}
                        onClick={showModal}
                    />
                    <Modal
                        style={styleModal}
                        title={titleModel}
                        open={isModalOpen}
                        onCancel={handleCancel}
                        destroyOnClose={true}
                        footer={null}
                    >
                        {FormPath[pathModel]}
                    </Modal>
                </>
            )
            break
        case "ACTIVE_MODAL":
            Element = (
                <>
                    <Checkbox checked={activeChecked} onClick={showModal} />
                    <Modal
                        title={titleModel}
                        open={isModalOpen}
                        onCancel={handleCancel}
                        destroyOnClose={true}
                        footer={null}
                    >
                        <ActiveForm
                            data={{
                                idUpdate: rowData?._id,
                                active: rowData?.active
                            }}
                            pathModel={pathModel}
                            CancelModal={handleCancel}
                        />
                    </Modal>
                </>
            )
            break
        default:
            break
    }

    return <>{Element}</>
}

export default memo(BtnModal)
