import { Button, Flex } from "antd"

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
    return (
        <Flex className="mb-3" vertical gap={10}>
            <Flex justify="flex-end">
                <Button className="w-20" type="primary" onClick={onCancel}>
                    Rebind
                </Button>
                <Button className="w-20" type="primary" onClick={onPreview}>
                    Preview
                </Button>
            </Flex>
            <Flex justify="flex-end" gap={10}>
                <Button className="w-20" type="primary" onClick={onSubmit}>
                    Submit
                </Button>
                <Button className="w-20" type="primary" onClick={onSave}>
                    Save
                </Button>
                <Button
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
