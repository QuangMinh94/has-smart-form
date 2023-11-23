"use client"

import { Permission } from "@/app/(types)/Permission"
import { FindPermission } from "@/app/(utilities)/ArrayUtilities"
import { ContextTemplate } from "@/components/context/context"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Flex } from "antd"
import { useContext } from "react"

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
    onNeedCorrection?: () => void
    onReject?: () => void
    onBack?: () => void
    permission: Permission[] | []
    status?: string
}) => {
    const { isDisabled } = useContext(ContextTemplate)
    return (
        <>
            {FindPermission(
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
                                if (onReject) onReject()
                            }}
                            loading={isDisabled}
                        >
                            Từ chối
                        </Button>
                        <Button
                            type="primary"
                            danger
                            onClick={() => {
                                if (onNeedCorrection) onNeedCorrection()
                            }}
                            loading={isDisabled}
                        >
                            Yêu cầu bổ sung
                        </Button>
                    </Flex>
                </Flex>
            )}
        </>
    )
}

export default CustomButtonGroup
