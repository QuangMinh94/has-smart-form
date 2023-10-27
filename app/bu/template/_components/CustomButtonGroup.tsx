"use client"

import { ContextTemplate } from "@/components/context/context"
import { Button, Flex } from "antd"
import { useContext } from "react"

const CustomButtonGroup = ({
    onPreview,
    onSubmit,
    onSave,
    onCancel
}: {
    onPreview: () => void
    onSubmit: () => void
    onSave: () => void
    onCancel: () => void
}) => {
    const { isDisabled } = useContext(ContextTemplate)
    return (
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
    )
}

export default CustomButtonGroup
