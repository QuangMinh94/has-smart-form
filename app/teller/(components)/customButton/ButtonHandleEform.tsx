import { Button, Flex } from "antd"

const CustomButtonGroup = ({
    onPreview,
    onSubmit,
    onSave,
    onCancel,
    loading,
    onSync
}: {
    loading: boolean
    onPreview: () => void
    onSubmit: () => void
    onSave: () => void
    onCancel: () => void
    onSync?: () => void
}) => {
    return (
        <Flex className="mb-3" vertical gap={10}>
            <Flex justify="flex-end" gap={10}>
                <Button
                    loading={loading}
                    className="w-20"
                    type="primary"
                    onClick={onPreview}
                >
                    Preview
                </Button>
            </Flex>
            <Flex justify="flex-end" gap={10} className="mt-5">
                <Button className="w-20" type="primary" onClick={onSync}>
                    Sync
                </Button>
                  <Button
                    loading={loading}
                    className="w-20"
                    type="primary"
                    onClick={onSubmit}
                >
                    Submit
                </Button>
                <Button
                    loading={loading}
                    className="w-20"
                    type="primary"
                    onClick={onSave}
                >
                    Save
                </Button>
                <Button
                    className="w-20"
                    danger
                    type="primary"
                    onClick={onCancel}
                    loading={loading}
                >
                    Cancel
                </Button>
            </Flex>
        </Flex>
    )
}

export default CustomButtonGroup
