"use client"
import routers, { rootPath, DE_TAIL, APP_ROVE } from "@/router/cusTomRouter"
import {
    faTrashAlt,
    faLongArrowAltLeft
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { RadioChangeEvent, Row, Col, theme } from "antd"
import { Radio, Button, Input } from "antd"
import ButtonModal from "../customButton/ButtonModal"
import React, { useEffect, memo, useCallback, useMemo } from "react"

import {
    usePathname,
    useParams,
    useRouter,
    useSearchParams
} from "next/navigation"

type condisions = {
    pagemywork: {
        isMyworkpath: boolean
        isDetailMyorkpath: boolean
        isAppRoverPath: boolean
    }
}
export type typeSearch = "CDDD" | "MGD"

const mywork = {
    TYPE_SEARCH: "search",
    VALUE_SEARCH: "idSearch",
    params(type: typeSearch, idSearch: string | null) {
        return `?${this.TYPE_SEARCH}=${type}${
            !idSearch ? "" : `&${this.VALUE_SEARCH}=${idSearch}`
        }`
    }
}

const useHanderNavigation = (
    rootpath: rootPath
): {
    pathName: any
    params: any
    condition: condisions
} => {
    const pathName = usePathname()
    const params = useParams()

    const condition: condisions = {
        pagemywork: {
            isMyworkpath: pathName === routers(rootpath).mywork.path,
            isDetailMyorkpath: pathName.includes(
                routers(rootpath).mywork.path + `/${DE_TAIL}`
            ),
            isAppRoverPath: pathName.includes(
                routers(rootpath).mywork.path + `/${APP_ROVE}`
            )
        }
    }
    return { pathName, params, condition }
}
const CustomerLabel = ({
    text,
    children
}: {
    text: string
    children: React.ReactNode
}) => {
    const {
        token: { colorPrimary }
    } = theme.useToken()
    return (
        <div>
            <div style={{ color: colorPrimary }} className="mb-2 ">
                {text}
            </div>
            {children}
        </div>
    )
}

const RadioComponent: React.FC<{
    pathName: string
    condition: () => condisions
}> = memo(({ pathName, condition }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const value = searchParams.get(mywork.TYPE_SEARCH)
    const searchQuery = useSearchParams()
    const valueSearch: string | null = useMemo(
        () => searchQuery.get(mywork.VALUE_SEARCH),
        [searchQuery.get(mywork.VALUE_SEARCH)]
    )

    const onChange = (e: RadioChangeEvent) => {
        router.push(mywork.params(e.target.value, valueSearch))
    }
    useEffect(() => {
        if (condition().pagemywork.isMyworkpath) {
            router.push(`?${mywork.TYPE_SEARCH}=MGD`)
        }
    }, [pathName])
    return (
        <>
            <Radio.Group
                style={{ marginLeft: "60px" }}
                onChange={onChange}
                value={value}
            >
                <Radio value={"CDDD"}>CDDD</Radio>
                <Radio value={"MGD"}>Mã GD</Radio>
            </Radio.Group>
        </>
    )
})

const CustomBtn: React.FC<{
    condition: () => condisions
    rootPath: rootPath
}> = memo(({ condition, rootPath }) => {
    const router = useRouter()

    const HanderBtn = {
        Back: () => {
            if (
                condition().pagemywork.isDetailMyorkpath ||
                condition().pagemywork.isAppRoverPath
            ) {
                router.push(routers(rootPath).mywork.path)
            }
        },
        Remove: () => {}
    }
    const HandleClick = () => {
        if (
            condition().pagemywork.isDetailMyorkpath ||
            condition().pagemywork.isAppRoverPath
        ) {
            HanderBtn.Back()
        }
        if (condition().pagemywork.isMyworkpath) {
            HanderBtn.Remove()
        }
    }
    const icon =
        condition().pagemywork.isDetailMyorkpath ||
        condition().pagemywork.isAppRoverPath
            ? faLongArrowAltLeft
            : faTrashAlt
    return (
        <Button onClick={HandleClick} type="primary">
            <FontAwesomeIcon className="mr-2" icon={icon} />
            {condition().pagemywork.isDetailMyorkpath ||
            condition().pagemywork.isAppRoverPath
                ? "Quay lại"
                : "error"}
        </Button>
    )
})

const CustomFilter: React.FC<{
    pathName: string
    rootPath: rootPath
    condition: () => condisions
}> = memo(({ pathName, condition, rootPath }) => {
    const router = useRouter()
    const searchQuery = useSearchParams()
    const searchParams = useSearchParams()
    const appointmentCode: string = searchParams.get("code") ?? ""
    const typeSearch: any = useMemo(
        () => searchQuery.get(mywork.TYPE_SEARCH),
        [searchQuery.get(mywork.TYPE_SEARCH)]
    )
    const HanderFilter = {
        [`${routers(rootPath).mywork.path}`]: (value: string) => {
            router.push(mywork.params(typeSearch, value))
        }
    }
    const HandlerChange = (e: any) => {
        HanderFilter[pathName](e.target.value)
    }
    return (
        <>
            {condition().pagemywork.isDetailMyorkpath && (
                <CustomerLabel text="Mã giao dịch">
                    <Input value={appointmentCode} disabled />
                </CustomerLabel>
            )}
            {condition().pagemywork.isMyworkpath && (
                <Input onChange={HandlerChange} placeholder="Tìm Kiếm" />
            )}
        </>
    )
})

const FilterMyWorkDetail = memo(() => {
    const searchParams = useSearchParams()
    const CCCD: string = searchParams.get("CCCD") as string
    const Name: string = searchParams.get("Name") as string

    return (
        <Row gutter={16}>
            <Col span={12}>
                <CustomerLabel text="CCCD">
                    <Input disabled value={CCCD} />
                </CustomerLabel>
            </Col>
            <Col span={12}>
                <CustomerLabel text="Khách Hàng">
                    <Input disabled value={Name} />
                </CustomerLabel>
            </Col>
        </Row>
    )
})

CustomBtn.displayName = "CustomBtn"
CustomFilter.displayName = "CustomFilter"
RadioComponent.displayName = "RadioComponent"
FilterMyWorkDetail.displayName = "FilterMyWorkDetail"

const Filter = ({ rootPath }: { rootPath: rootPath }) => {
    const { condition, pathName, params } = useHanderNavigation(rootPath)
    const cusTomCondition = useCallback(() => {
        return condition
    }, [pathName])

    return (
        <Row align="middle" gutter={16}>
            <Col span={7}>
                <CustomFilter
                    rootPath={rootPath}
                    pathName={pathName}
                    condition={cusTomCondition}
                />
            </Col>
            <Col span={13}>
                {condition.pagemywork.isMyworkpath && (
                    <RadioComponent
                        pathName={pathName}
                        condition={cusTomCondition}
                    />
                )}
                {condition.pagemywork.isDetailMyorkpath && (
                    <FilterMyWorkDetail />
                )}
            </Col>
            <Col span={4}>
                {condition.pagemywork.isMyworkpath && rootPath === "teller" && (
                    <div className="flex justify-end">
                        <ButtonModal
                            type="ADD_MODAL"
                            titleModal="Tạo đơn khách hàng"
                        />
                    </div>
                )}
                {(condition.pagemywork.isDetailMyorkpath ||
                    condition.pagemywork.isAppRoverPath) && (
                    <div className="flex justify-end">
                        <CustomBtn
                            rootPath={rootPath}
                            condition={cusTomCondition}
                        />
                    </div>
                )}
            </Col>
        </Row>
    )
}

export default Filter
