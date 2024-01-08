"use client"

import FilterOption from "@/app/users/(components)/filter/FilterTeamplate"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Flex, Input } from "antd"
import { useRouter } from "next/navigation"
import { ReactNode, useContext } from "react"
import { SearchParamContext } from "../../(context)/context"
const PageHeader = ({
    path,
    children,
    addNewPermission,
    headerChild
}: {
    path: string
    children: ReactNode
    addNewPermission: boolean
    headerChild?: ReactNode
}) => {
    const router = useRouter()
    const { searchValue, setSearchValue } = useContext(SearchParamContext)
    return (
        <Flex vertical gap={10}>
            <Flex justify="space-between">
                <div className="flex items-center">
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
                    {!headerChild && !addNewPermission && (
                        <div className="ml-[5px]">
                            <FilterOption />
                        </div>
                    )}
                </div>
                {headerChild}
                {addNewPermission && (
                    <Button
                        type="primary"
                        onClick={() => router.push("/users/template/new")}
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
