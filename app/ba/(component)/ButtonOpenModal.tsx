"use client"
import React, { useState, memo, useCallback } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons"

import { Modal, Button } from "antd"
import FormProduct from "./form/FormProduct"
import FormNV from "./form/FormNV"
export type setting = "ADD_MODAL" | "UPDATE_MODAL"
type Props = {
    type: setting
    titleModal: string
    rowData?: any
    typeRow: "P" | "B"
    clickBtn?: boolean
}
const App: React.FC<Props> = ({
    type,
    titleModal,
    rowData,
    typeRow,
    clickBtn
}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleCancel = useCallback(() => {
        setIsModalOpen(false)
    }, [])

    const FormTypeRow: any = {
        P: (
            <FormProduct
                cancelModel={handleCancel}
                type={type}
                rowData={rowData}
            />
        ),
        B: <FormNV cancelModel={handleCancel} type={type} rowData={rowData} />
    }

    return (
        <>
            {clickBtn ? (
                <Button type="primary" onClick={showModal}>
                    Tạo sản phẩm
                </Button>
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
