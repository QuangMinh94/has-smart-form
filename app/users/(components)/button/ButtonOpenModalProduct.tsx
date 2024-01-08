"use client"
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { memo, useCallback, useState } from "react"

import { Button, Checkbox, Modal } from "antd"
import FormActive from "../../ba/(component)/form/Active"
import FormNV from "../../ba/(component)/form/FormNV"
import FormProduct from "../../ba/(component)/form/FormProduct"
export type setting = "ADD_MODAL" | "UPDATE_MODAL" | "ACTIVE_MODAL"
type Props = {
    type: setting
    titleModal: string
    rowData?: any
    typeRow: "P" | "B" | "ACTIVE"
    clickBtn?: boolean
    disabled?: boolean
}
const App: React.FC<Props> = ({
    type,
    titleModal,
    rowData,
    typeRow,
    clickBtn,
    disabled
}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleCancel = useCallback(() => {
        setIsModalOpen(false)
    }, [])

    const FormTypeRow = {
        P: (
            <FormProduct
                cancelModel={handleCancel}
                type={type}
                rowData={rowData}
            />
        ),
        B: <FormNV cancelModel={handleCancel} type={type} rowData={rowData} />,
        ACTIVE: (
            <FormActive
                CancelModal={handleCancel}
                data={{
                    idUpdate: rowData?._id ?? "",
                    active: !!rowData?.active
                }}
            />
        )
    }

    return (
        <>
            {clickBtn ? (
                <Button type="primary" onClick={showModal}>
                    Tạo sản phẩm
                </Button>
            ) : type === "ACTIVE_MODAL" ? (
                <Checkbox
                    disabled={disabled}
                    onClick={showModal}
                    checked={rowData.active}
                />
            ) : (
                <FontAwesomeIcon
                    style={
                        disabled
                            ? { cursor: "not-allowed", opacity: "0.5" }
                            : undefined
                    }
                    onClick={disabled ? undefined : showModal}
                    icon={type === "ADD_MODAL" ? faPlus : faEdit}
                />
            )}
            <Modal
                title={titleModal}
                open={isModalOpen}
                onCancel={handleCancel}
                destroyOnClose={true}
                footer={null}
                width={typeRow === "B" ? "90%" : undefined}
                style={typeRow === "B" ? { top: "10px" } : undefined}
            >
                {FormTypeRow[typeRow]}
            </Modal>
        </>
    )
}

export default memo(App)
