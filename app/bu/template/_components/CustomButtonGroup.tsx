"use client"

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
    onReject,
    onBack,
    role
}: {
    onPreview: () => void
    onSubmit: () => void
    onSave: () => void
    onCancel: () => void
    onVerify?: () => void
    onReject?: () => void
    onBack?: () => void
    role: string
}) => {
    const { isDisabled } = useContext(ContextTemplate)
    return (
        <>
            {role === "CV" ? (
                <Flex className="mb-3" vertical gap={10}>
                    <Flex justify="flex-end">
                        <Button
                            //disabled={isDisabled}
                            className="w-20"
                            type="primary"
                            onClick={onCancel}
                            loading={isDisabled}
                        >
                            Rebind
                        </Button>
                        <Button
                            className="w-20"
                            type="primary"
                            onClick={onPreview}
                            loading={isDisabled}
                        >
                            Preview
                        </Button>
                    </Flex>
                    <Flex justify="flex-end" gap={10}>
                        <Button
                            className="w-20"
                            type="primary"
                            onClick={onSubmit}
                            loading={isDisabled}
                        >
                            Submit
                        </Button>
                        <Button
                            className="w-20"
                            type="primary"
                            onClick={onSave}
                            loading={isDisabled}
                        >
                            Save
                        </Button>
                        <Button
                            className="w-20"
                            danger
                            type="primary"
                            onClick={onCancel}
                            loading={isDisabled}
                        >
                            Cancel
                        </Button>
                    </Flex>
                </Flex>
            ) : (
                <Flex justify="space-between">
                    <Flex>
                        <Button
                            type="primary"
                            onClick={onBack}
                            loading={isDisabled}
                            icon={<FontAwesomeIcon icon={faArrowLeft} />}
                        >
                            Back
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
                    </Flex>
                </Flex>
            )}
        </>
    )
}

export default CustomButtonGroup
