"use client"

import { Button, Flex } from "antd"
import { useRouter } from "next/navigation"

const TemplatePage = () => {
    const router = useRouter()
    return (
        <Flex justify="space-between">
            <p>TemplatePage</p>
            <Button
                type="primary"
                onClick={() => router.push("/bu/template/2")}
            >
                Go to detail
            </Button>
        </Flex>
    )
}

export default TemplatePage
