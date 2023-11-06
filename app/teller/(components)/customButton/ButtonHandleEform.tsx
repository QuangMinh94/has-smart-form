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
                    className="min-w-100"
                    type="primary"
                    onClick={onPreview}
                >
                    Xem trước
                </Button>
            </Flex>
            <Flex justify="flex-end" gap={10} className="mt-5">
                <Button className="min-w-100" type="primary" onClick={onSync}>
                    Đồng bộ
                </Button>
                <Button
                    loading={loading}
                    className="min-w-100"
                    type="primary"
                    onClick={onSubmit}
                >
                    Nộp
                </Button>
                <Button
                    loading={loading}
                    className="min-w-100"
                    type="primary"
                    onClick={onSave}
                >
                    Lưu
                </Button>
                <Button
                    className="min-w-100"
                    danger
                    type="primary"
                    onClick={onCancel}
                    loading={loading}
                >
                    Hủy
                </Button>
            </Flex>
        </Flex>
    )
}

export default CustomButtonGroup
