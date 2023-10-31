"use client"

import { ContextTemplate } from "@/components/context/context"
import { Button, Flex } from "antd"
import { useContext } from "react"

const CustomButtonGroup = ({
    onPreview,
    onSubmit,
    onSave,
    onCancel,
    onVerify,
    onReject,
    role
}: {
    onPreview: () => void
    onSubmit: () => void
    onSave: () => void
    onCancel: () => void
    onVerify?: () => void
    onReject?: () => void
    role: string
}) => {
    const { isDisabled } = useContext(ContextTemplate)
    return (
        <>
            {role === "CV" ? (
                <Flex className="mb-3" vertical gap={10}>
                    <Flex justify="flex-end">
                        <Button
                            disabled={isDisabled}
                            className="w-20"
                            type="primary"
                            onClick={onCancel}
                        >
                            Rebind
                        </Button>
                        <Button
                            disabled={isDisabled}
                            className="w-20"
                            type="primary"
                            onClick={onPreview}
                        >
                            Preview
                        </Button>
                    </Flex>
                    <Flex justify="flex-end" gap={10}>
                        <Button
                            disabled={isDisabled}
                            className="w-20"
                            type="primary"
                            onClick={onSubmit}
                        >
                            Submit
                        </Button>
                        <Button
                            disabled={isDisabled}
                            className="w-20"
                            type="primary"
                            onClick={onSave}
                        >
                            Save
                        </Button>
                        <Button
                            disabled={isDisabled}
                            className="w-20"
                            danger
                            type="primary"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </Flex>
                </Flex>
            ) : (
                <Flex className="mb-3" gap={10}>
                    <Button
                        type="primary"
                        onClick={() => {
                            if (onVerify) onVerify()
                        }}
                    >
                        Phê duyệt
                    </Button>
                    <Button
                        type="primary"
                        danger
                        onClick={() => {
                            if (onReject) onReject()
                        }}
                    >
                        Từ chối
                    </Button>
                </Flex>
            )}
        </>
    )
}

export default CustomButtonGroup
