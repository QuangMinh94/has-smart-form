"use client"

import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Flex, Input } from "antd"
import { useRouter } from "next/navigation"
import { PropsWithChildren } from "react"

const PageHeader = ({ children }: PropsWithChildren) => {
    const router = useRouter()
    return (
        <Flex vertical gap={10}>
            <Flex justify="space-between">
                <Input
                    style={{ width: 400 }}
                    placeholder="Tim kiem"
                    prefix={<FontAwesomeIcon icon={faSearch} />}
                />
                <Button
                    type="primary"
                    onClick={() => router.push("/bu/template/new")}
                >
                    Tạo mới
                </Button>
            </Flex>
            {children}
        </Flex>
    )
}

export default PageHeader
