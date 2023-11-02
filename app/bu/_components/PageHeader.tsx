"use client"

import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Flex, Input } from "antd"
import { useRouter } from "next/navigation"
import { ReactNode, useContext } from "react"
import { SearchParamContext } from "../_context/context"

const PageHeader = ({
    path,
    children,
    addNewPermission
}: {
    path: string
    children: ReactNode
    addNewPermission: boolean
}) => {
    const router = useRouter()
    const { searchValue, setSearchValue } = useContext(SearchParamContext)
    return (
        <Flex vertical gap={10}>
            <Flex justify="space-between">
                <Input
                    style={{ width: 400 }}
                    placeholder="Tim kiem"
                    prefix={<FontAwesomeIcon icon={faSearch} />}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onPressEnter={() => {
                        let searchQuery = path
                        if (searchValue) {
                            searchQuery = `${path}?name=${searchValue}`
                        }
                        router.push(searchQuery)
                    }}
                />
                {addNewPermission && (
                    <Button
                        type="primary"
                        onClick={() => router.push("/bu/template/new")}
                    >
                        Tạo mới
                    </Button>
                )}
            </Flex>
            {children}
        </Flex>
    )
}

export default PageHeader
