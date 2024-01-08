"use client"
import ActiveForm from "@/app/users/administrator/(component)/form/ActiveForm"
import FormGroup from "@/app/users/administrator/(component)/form/FormGroup"
import FormUser from "@/app/users/administrator/(component)/form/FormUser"
import Formdepartment from "@/app/users/administrator/(component)/form/Formdepartment"
import FormManager from "@/app/users/administrator/(component)/form/connecter/FormManager"
import { PlusOutlined } from "@ant-design/icons"
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Checkbox, Modal, Popover } from "antd"
import React, { memo, useCallback, useState } from "react"
import FormTransfer from "./form/FormTransfer"
import ListCategoryConnect from "./listCategoryConnect"
export type pathModel =
    | "ADMIN_USER"
    | "ADMIN_ROLE"
    | "ADMIN_DEPARTMENT"
    | "ADMIN_GROUP"
    | "ADMIN_CONNECTER_MANAGER"
export type typeForm =
    | "ADD_MODAL"
    | "UPDATE_MODAL"
    | "ACTIVE_MODAL"
    | "REMOVE_MODAL"
    | "TRANSFERFORM"
    | "CATEGORY_CONNECTION"

type Props = {
    type: typeForm
    pathModel: pathModel
    titleModel: string
    rowData: any
    activeChecked?: boolean
    isUploadNotApi?: boolean
    iconBtn?: boolean
    typeFormTransfer?: typeFormTransfer
    isNameClicked?: boolean
    CancelModalParent?: () => void
}
export type typeFormTransfer = "ADD_TRANSFER" | "UPDATE_TRANSFER" | undefined

const titleBtnAdd = {
    ADMIN_USER: "Thêm tài khoản",
    ADMIN_ROLE: "Thêm nhóm quyền",
    ADMIN_DEPARTMENT: "Thêm đơn vị",
    ADMIN_GROUP: "Thêm nhóm ",
    ADMIN_CONNECTER_MANAGER: "Thêm kết nối"
}

const BtnModal: React.FC<Props> = ({
    type,
    pathModel,
    titleModel,
    activeChecked,
    rowData,
    isUploadNotApi,
    iconBtn,
    typeFormTransfer,
    isNameClicked,
    CancelModalParent
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
        ),
        ADMIN_GROUP: (
            <FormGroup
                addTreeChidlren={!!iconBtn}
                typeForm={type}
                CancelModal={handleCancel}
                rowData={rowData}
            />
        ),
        ADMIN_CONNECTER_MANAGER: (
            <FormManager
                CancelModalParent={CancelModalParent}
                typeForm={type}
                CancelModal={handleCancel}
                rowData={rowData}
            />
        )
    }

    const styleModal =
        pathModel === "ADMIN_USER" ||
        pathModel === "ADMIN_DEPARTMENT" ||
        pathModel === "ADMIN_CONNECTER_MANAGER"
            ? { top: "10px" }
            : undefined
    switch (type) {
        case "ADD_MODAL":
            const BtnClick = iconBtn ? (
                <PlusOutlined onClick={showModal} />
            ) : (
                <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    onClick={showModal}
                >
                    {titleBtnAdd[pathModel]}
                </Button>
            )
            const nameClick = (
                <div onClick={showModal} className="flex my-[10px]">
                    <div className="w-[20%]">{rowData?.nameconnectorGroup}</div>
                    <Checkbox checked={isModalOpen} />
                </div>
            )
            Element = (
                <>
                    {isNameClicked ? nameClick : BtnClick}
                    <Modal
                        style={styleModal}
                        title={titleModel}
                        open={isModalOpen}
                        onCancel={handleCancel}
                        destroyOnClose={true}
                        footer={null}
                        width={
                            pathModel === "ADMIN_CONNECTER_MANAGER"
                                ? "95%"
                                : undefined
                        }
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
                        width={
                            pathModel === "ADMIN_CONNECTER_MANAGER"
                                ? "95%"
                                : undefined
                        }
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
                pathModel === "ADMIN_DEPARTMENT" || pathModel === "ADMIN_GROUP"
                    ? "Thêm tài khoản vào"
                    : ""
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
        case "CATEGORY_CONNECTION":
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
                        <ListCategoryConnect HidenMoal={handleCancel} />
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
