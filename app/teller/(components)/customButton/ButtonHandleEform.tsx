"use client"
import { Button, Flex } from "antd"
import { useSession } from "next-auth/react"
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
    const { data: session, status } = useSession()
    console.log("sesion", session?.user.userInfo)
    return (
        <Flex className="mb-3" vertical gap={10}>
            <Flex justify="flex-end" gap={10}>
                <Button
                    loading={loading}
                    className="min-w-[100px]"
                    type="primary"
                    onClick={onPreview}
                >
                    Sử dụng
                </Button>
            </Flex>
            <Flex justify="flex-end" gap={10} className="mt-5">
                <Button
                    className="min-w-[100px]"
                    type="primary"
                    onClick={onSync}
                >
                    Đồng bộ
                </Button>
                <Button
                    loading={loading}
                    className="min-w-[100px]"
                    type="primary"
                    onClick={onSubmit}
                >
                    Nộp
                </Button>
                <Button
                    loading={loading}
                    className="min-w-[100px]"
                    type="primary"
                    onClick={onSave}
                >
                    Lưu
                </Button>
                <Button
                    className="min-w-[100px]"
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
