"use client"

import { Permission } from "@/app/(types)/Permission"
import { FindPermission } from "@/app/(utilities)/ArrayUtilities"
import { ContextTemplate } from "@/components/context/context"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Flex, Input, Modal } from "antd"
import { ReactNode, useContext, useState } from "react"

const { TextArea } = Input

const CustomButtonGroup = ({
    onPreview,
    onSubmit,
    onSave,
    onCancel,
    onVerify,
    onNeedCorrection,
    onReject,
    onBack,
    permission,
    status
}: {
    onPreview: () => void
    onSubmit: () => void
    onSave: () => void
    onCancel: () => void
    onVerify?: () => void
    onNeedCorrection?: (type: string, reason: string) => void
    onReject?: (type: string, reason: string) => void
    onBack?: () => void
    permission: Permission[] | []
    status?: string
}) => {
    const { isDisabled } = useContext(ContextTemplate)
    const [type, setType] = useState<string>("")
    const [title, setTitle] = useState<any>("")
    const [open, setOpen] = useState<boolean>(false)

    return (
        <>
            {!FindPermission(
                permission,
                "children",
                "VisibleSubmitButtonGroup"
            ) ? (
                <Flex className="mb-3 mt-3" vertical gap={10}>
                    <Flex justify="flex-end">
                        <Button
                            className="w-fit"
                            type="primary"
                            onClick={onPreview}
                            loading={isDisabled}
                        >
                            Xem trước
                        </Button>
                    </Flex>
                    <Flex justify="flex-end" gap={10}>
                        <Button
                            className="w-fit"
                            type="primary"
                            onClick={onSubmit}
                            loading={isDisabled}
                        >
                            Nộp
                        </Button>
                        <Button
                            className="w-fit"
                            type="primary"
                            onClick={onSave}
                            loading={isDisabled}
                        >
                            Lưu
                        </Button>
                        <Button
                            className="w-fit"
                            danger
                            type="primary"
                            onClick={onCancel}
                            loading={isDisabled}
                        >
                            Hủy
                        </Button>
                    </Flex>
                </Flex>
            ) : (
                //KSV
                <Flex className="mt-5" justify="space-between">
                    <Flex>
                        <Button
                            type="primary"
                            onClick={onBack}
                            loading={isDisabled}
                            icon={<FontAwesomeIcon icon={faArrowLeft} />}
                        >
                            Quay lại
                        </Button>
                    </Flex>
                    <Flex className="mb-3" justify="flex-end" gap={10}>
                        <Button
                            type="primary"
                            onClick={() => {
                                if (onVerify) onVerify()
                            }}
                            loading={isDisabled}
                        >
                            Phê duyệt
                        </Button>
                        <Button
                            type="primary"
                            danger
                            onClick={() => {
                                /* if (onReject) onReject() */
                                setOpen(true)
                                setType("REJECTED")
                                setTitle("Nhập lý do từ chối")
                                /* if (onReject) setCloseFunc(onReject) */
                            }}
                            loading={isDisabled}
                        >
                            Từ chối
                        </Button>
                        <Button
                            type="primary"
                            style={{ backgroundColor: "#e79f38" }}
                            onClick={() => {
                                /* if (onNeedCorrection) onNeedCorrection() */
                                setOpen(true)
                                setType("NEED_CORRECTION")
                                setTitle("Nhập lý do cần bổ sung")
                                /* if (onNeedCorrection)
                                    setCloseFunc(onNeedCorrection) */
                            }}
                            loading={isDisabled}
                        >
                            Yêu cầu bổ sung
                        </Button>
                    </Flex>
                </Flex>
            )}
            <ReasonModal
                key={type}
                type={type}
                title={title}
                open={open}
                onClose={() => setOpen(false)}
                onOK={(type: string, reason: string) => {
                    if (type === "NEED_CORRECTION" && onNeedCorrection)
                        return onNeedCorrection(type, reason)
                    if (type === "REJECTED" && onReject)
                        return onReject(type, reason)
                }}
            />
        </>
    )
}

const ReasonModal = ({
    type,
    title,
    open,
    onOK,
    onClose
}: {
    type: string
    title: ReactNode
    open: boolean
    onOK: (type: string, reason: string) => void
    onClose: () => void
}) => {
    const [value, setValue] = useState<string>("")
    const [disabledOk, setDisabledOk] = useState<boolean>(true)

    return (
        <Modal
            title={title}
            open={open}
            //onOk={() => onOK(type, value)}
            onCancel={onClose}
            maskClosable={false}
            footer={[
                <Flex justify="end" gap={5}>
                    <Button type="default" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="primary" disabled={disabledOk}>
                        Ok
                    </Button>
                </Flex>
            ]}
        >
            <TextArea
                onChange={(e) => {
                    if (e.target.value.trim()) {
                        setDisabledOk(false)
                    } else {
                        setDisabledOk(true)
                    }
                }}
                defaultValue={value}
                onBlur={(e: any) => setValue(e.target.value)}
                placeholder="Nhập lý do"
                autoSize={{ minRows: 3, maxRows: 5 }}
            />
        </Modal>
    )
}

export default CustomButtonGroup
