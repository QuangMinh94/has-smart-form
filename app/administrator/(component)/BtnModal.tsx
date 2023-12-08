"use client"
import React, { useState, memo, useCallback } from "react"
import { PlusOutlined } from "@ant-design/icons"
import { Button, Modal, Checkbox, Popover } from "antd"
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ActiveForm from "@/app/administrator/(component)/form/ActiveForm"
import FormUser from "@/app/administrator/(component)/form/FormUser"
import Formdepartment from "@/app/administrator/(component)/form/Formdepartment"
import FormTransfer from "./form/FormTransfer"
export type pathModel = "ADMIN_USER" | "ADMIN_ROLE" | "ADMIN_DEPARTMENT"
export type typeForm =
    | "ADD_MODAL"
    | "UPDATE_MODAL"
    | "ACTIVE_MODAL"
    | "TRANSFERFORM"

type Props = {
    type: typeForm
    pathModel: pathModel
    titleModel: string
    rowData: any
    activeChecked?: boolean
    isUploadNotApi?: boolean
    iconBtn?: boolean
    typeFormTransfer?: typeFormTransfer
}
export type typeFormTransfer = "ADD_TRANSFER" | "UPDATE_TRANSFER" | undefined

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
    isUploadNotApi,
    iconBtn,
    typeFormTransfer
}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    let Element
    const showModal = useCallback(() => {
        setIsModalOpen(true)
    }, [])
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
        ADMIN_DEPARTMENT: (
            <Formdepartment
                addTreeChidlren={!!iconBtn}
                typeForm={type}
                CancelModal={handleCancel}
                rowData={rowData}
            />
        )
    }

    const styleModal =
        pathModel === "ADMIN_USER" || pathModel === "ADMIN_DEPARTMENT"
            ? { top: "10px" }
            : undefined
    switch (type) {
        case "ADD_MODAL":
            Element = (
                <>
                    {iconBtn ? (
                        <PlusOutlined onClick={showModal} />
                    ) : (
                        <Button
                            icon={<PlusOutlined />}
                            type="primary"
                            onClick={showModal}
                        >
                            {titleBtnAdd[pathModel]}
                        </Button>
                    )}
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
        case "TRANSFERFORM":
            const title =
                pathModel === "ADMIN_DEPARTMENT" ? "Thêm tài khoản vào" : ""
            Element = (
                <Popover
                    destroyTooltipOnHide={true}
                    open={isModalOpen}
                    placement="top"
                    title={title}
                    onOpenChange={(open: boolean) => setIsModalOpen(open)}
                    content={
                        <FormTransfer
                            typeForm={typeFormTransfer}
                            CancelModal={handleCancel}
                            pathModel={pathModel}
                            rowData={rowData}
                        />
                    }
                    trigger="click"
                >
                    <Button icon={<PlusOutlined />} onClick={showModal}>
                        {title}
                    </Button>
                </Popover>
            )
            break
        default:
            break
    }

    return <>{Element}</>
}

export default memo(BtnModal)
