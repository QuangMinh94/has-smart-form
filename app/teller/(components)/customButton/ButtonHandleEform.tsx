"use client"
import { Button, Flex } from "antd"
import { useEffect } from "react"
import ButtonApprove from "@/app/ksvteller/(component)/BtnNotApproveAndApprove"

import useGetInfoUser from "@/components/cusTomHook/useGetInfoUser"
const permission: any = {
    VisibleCVCTTeller: false,
    VisibleCVCTReviewer: false
}
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
    const { InFoUser } = useGetInfoUser()
    // const InFoUser: Users = session?.user.userInfo
    useEffect(() => {
        const VisibleTeller = InFoUser?.permission?.find(
            (p) =>
                p.name.toLowerCase() === "VisibleTeller".toLowerCase() &&
                !!p.value
        )
        if (VisibleTeller) {
            VisibleTeller?.children?.forEach((element: any) => {
                permission[element.name] = element?.value
            })
        }
    }, [])

    return (
        <>
            {permission.VisibleCVCTTeller && (
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
            )}
            {permission?.VisibleCVCTReviewer && (
                <Flex justify="flex-end" gap={10} className="mt-10 mb-2">
                    <ButtonApprove type="approve" />
                    <ButtonApprove type="notApprove" />
                </Flex>
            )}
        </>
    )
}

export default CustomButtonGroup
