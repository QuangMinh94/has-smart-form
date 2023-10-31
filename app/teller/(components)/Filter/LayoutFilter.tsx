"use client"
import routers from "@/router/cusTomRouter"
import {
    faTrashAlt,
    faLongArrowAltLeft
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { RadioChangeEvent, Row, Col, theme } from "antd"
import { Radio, Button, Input } from "antd"
import React, { useEffect, memo, useCallback, useMemo } from "react"
import { useContextMyWork } from "@/components/cusTomHook/useContext"
import {
    usePathname,
    useParams,
    useRouter,
    useSearchParams
} from "next/navigation"
import MyWork from "../../mywork/page"

type condisions = {
    pagemywork: {
        isMyworkpath: boolean
        isDetailMyorkpath: boolean
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

const useHanderNavigation = (): {
    pathName: any
    params: any
    condition: condisions
} => {
    const pathName = usePathname()
    const params = useParams()
    const condition: condisions = {
        pagemywork: {
            isMyworkpath: pathName === routers.mywork.path,
            isDetailMyorkpath:
                pathName === routers.detailMywork.path({ id: `${params?.id}` })
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
    pathName: string
    paramsId: string
    condition: () => condisions
}> = memo(({ pathName, paramsId, condition }) => {
    const { listIdRmove } = useContextMyWork()

    const router = useRouter()
    const HanderBtn = {
        Back: () => {
            const pathRevert = {
                [`${routers.detailMywork.path({ id: `${paramsId}` })}`]:
                    routers.mywork.path
            }
            router.push(pathRevert[pathName])
        },
        Remove: () => {
            console.log("listIdRmove", listIdRmove)
        }
    }
    const HandleClick = () => {
        if (condition().pagemywork.isDetailMyorkpath) {
            HanderBtn.Back()
        }
        if (condition().pagemywork.isMyworkpath) {
            HanderBtn.Remove()
        }
    }
    const icon = condition().pagemywork.isDetailMyorkpath
        ? faLongArrowAltLeft
        : faTrashAlt
    return (
        <Button onClick={HandleClick} type="primary">
            <FontAwesomeIcon className="mr-2" icon={icon} />
            {condition().pagemywork.isDetailMyorkpath
                ? "Quay lại"
                : condition().pagemywork.isMyworkpath
                ? "Xóa"
                : "error"}
        </Button>
    )
})

const CustomFilter: React.FC<{
    pathName: string
    paramsId: string
    condition: () => condisions
}> = memo(({ pathName, paramsId, condition }) => {
    const router = useRouter()
    const searchQuery = useSearchParams()
    const typeSearch: any = useMemo(
        () => searchQuery.get(mywork.TYPE_SEARCH),
        [searchQuery.get(mywork.TYPE_SEARCH)]
    )
    const HanderFilter = {
        [`${routers.mywork.path}`]: (value: string) => {
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
                    <Input value={paramsId} disabled />
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

const Filter = () => {
    const { condition, pathName, params } = useHanderNavigation()
    const cusTomCondition = useCallback(() => {
        return condition
    }, [pathName])

    return (
        <Row align="middle" gutter={16}>
            <Col span={7}>
                <CustomFilter
                    paramsId={params?.id}
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
                <div className="flex justify-end">
                    <CustomBtn
                        paramsId={params?.id}
                        pathName={pathName}
                        condition={cusTomCondition}
                    />
                </div>
            </Col>
        </Row>
    )
}

export default Filter
