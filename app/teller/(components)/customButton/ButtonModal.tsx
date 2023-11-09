"use client"
import React, { useState, memo } from "react"
import FormgetCCCD from "../form/FormgetCCCD"
import { Button, Modal } from "antd"

type Props = {
    type: "ADD_MODAL"
    titleModal: string
}
const App: React.FC<Props> = ({ type, titleModal }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Tạo mới
            </Button>
            <Modal
                title={titleModal}
                open={isModalOpen}
                onCancel={handleCancel}
                destroyOnClose={true}
                footer={null}
            >
                <div className="mt-[20px]">
                    <FormgetCCCD />
                </div>
            </Modal>
        </>
    )
}

export default memo(App)
