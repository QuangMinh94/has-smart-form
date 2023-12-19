"use client"
import React, { useState, memo, useCallback } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons"

import { Modal, Button, Checkbox } from "antd"
import FormProduct from "./form/FormProduct"
import FormNV from "./form/FormNV"
import FormActive from "./form/Active"
export type setting = "ADD_MODAL" | "UPDATE_MODAL" | "ACTIVE_MODAL"
type Props = {
    type: setting
    titleModal: string
    rowData?: any
    typeRow: "P" | "B" | "ACTIVE"
    clickBtn?: boolean
    disabledActive?: boolean
}
const App: React.FC<Props> = ({
    type,
    titleModal,
    rowData,
    typeRow,
    clickBtn,
    disabledActive
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
                    disabled={disabledActive}
                    onClick={showModal}
                    checked={rowData.active}
                />
            ) : (
                <FontAwesomeIcon
                    onClick={showModal}
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
