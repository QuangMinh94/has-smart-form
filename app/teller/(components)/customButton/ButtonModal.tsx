"use client"
import React, { useState, memo, useCallback } from "react"
import FormgetCCCD from "../form/FormgetCCCD"
import FormOrder from "../form/FormOrder"
import { Button, Modal } from "antd"

type Props = {
    type: "ADD_MODAL"
    titleModal: string
}
const App: React.FC<Props> = ({ type, titleModal }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isModalOpenFormOder, setIsModalOpenFormOder] =
        useState<boolean>(false)

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = useCallback(() => {
        setIsModalOpen(false)
    }, [])

    const showModalFormOder = useCallback(() => {
        setIsModalOpenFormOder(true)
    }, [])
    const handleCancelFormOder = useCallback(() => {
        setIsModalOpenFormOder(false)
    }, [])

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
                    <FormgetCCCD
                        showModalFormOder={showModalFormOder}
                        handleCancel={handleCancel}
                    />
                </div>
            </Modal>
            <Modal
                title={titleModal}
                open={isModalOpenFormOder}
                onCancel={() => setIsModalOpenFormOder(false)}
                destroyOnClose={true}
                footer={null}
            >
                <div className="mt-[20px]">
                    <FormOrder handleCancelFormOder={handleCancelFormOder} />
                </div>
            </Modal>
        </>
    )
}

export default memo(App)
