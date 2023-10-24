"use client"

import { Button, Flex } from "antd"
import { useRouter } from "next/navigation"

const TemplatePage = () => {
    const router = useRouter()
    return (
        <Flex justify="space-between">
            <p>TemplatePage</p>
            <Flex gap={8}>
                <Button
                    type="primary"
                    onClick={() => router.push("/bu/template/new")}
                >
                    Create new
                </Button>
                <Button
                    type="primary"
                    onClick={() => router.push("/bu/template/2")}
                >
                    Go to detail
                </Button>
            </Flex>
        </Flex>
    )
}

export default TemplatePage
