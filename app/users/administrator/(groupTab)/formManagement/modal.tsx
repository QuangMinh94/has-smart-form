import { Button, Flex, Modal } from "antd"
import { ReactNode } from "react"

export const CreationModal = ({
    open,
    onCancel,
    children,
    title
}: {
    open: boolean
    onCancel: () => void
    children?: ReactNode
    title: ReactNode
}) => {
    return (
        <Modal
            closable={false}
            title={title}
            open={open}
            maskClosable={false}
            onCancel={onCancel}
            footer={[]}
        >
            {children}
        </Modal>
    )
}

export const ReadOnlyModal = ({
    open,
    onCancel,
    title,
    children
}: {
    open: boolean
    onCancel: () => void
    title: ReactNode
    children: ReactNode
}) => {
    return (
        <Modal
            closable={false}
            title={title}
            open={open}
            maskClosable={false}
            onCancel={close}
            footer={
                <Flex justify="end" gap={5}>
                    <Button type="default" onClick={onCancel}>
                        Cancel
                    </Button>
                </Flex>
            }
        >
            {children}
        </Modal>
    )
}
