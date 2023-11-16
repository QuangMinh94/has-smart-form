"use client"
import React, { useState, memo, useCallback } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons"

import { Modal } from "antd"
import FormProduct from "./form/FormProduct"
export type setting = "ADD_MODAL" | "UPDATE_MODAL"
type Props = {
    type: setting
    titleModal: string
    rowData: any
}
const App: React.FC<Props> = ({ type, titleModal, rowData }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleCancel = useCallback(() => {
        setIsModalOpen(false)
    }, [])

    // const Form = {
    //     ADD_MODAL: <FormProduct type={type}/>,
    //     UPDATE_MODAL: <div style={{ color: "red" }}>updateModal</div>
    // }
    return (
        <>
            <FontAwesomeIcon
                onClick={showModal}
                icon={type === "ADD_MODAL" ? faPlus : faEdit}
            />
            <Modal
                title={titleModal}
                open={isModalOpen}
                onCancel={handleCancel}
                destroyOnClose={true}
                footer={null}
            >
                <FormProduct type={type} rowData={rowData} />
            </Modal>
        </>
    )
}

export default memo(App)
