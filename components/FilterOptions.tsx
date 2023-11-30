"use client"

import { CategoryTypes } from "@/app/(types)/Categories"
import {
    faFilter,
    faFilterCircleXmark
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    Button,
    Col,
    DatePicker,
    Divider,
    Flex,
    Input,
    Popover,
    Row
} from "antd"
import { RangePickerProps } from "antd/es/date-picker"
import dayjs, { Dayjs } from "dayjs"
import { useCookies } from "next-client-cookies"
import { useEnvContext } from "next-runtime-env"
import { useRouter, useSearchParams } from "next/navigation"
import { ReactNode, useContext, useEffect, useState } from "react"
import QueriesContext, { createDate } from "./context/queriesContext"
import RemoteSelectorCategory from "./selector/RemoteSelectorCategory"
import RemoteSelectorDepartment from "./selector/RemoteSelectorDepartment"
import RemoteSelectorEProduct from "./selector/RemoteSelectorEProduct"
import RemoteSelectorUser from "./selector/RemoteSelectorUser"

const { Search } = Input

const FilterOption = () => {
    const [openFilter, setOpenFilter] = useState(false)
    const params = useSearchParams()
    const router = useRouter()
    const {
        citizenId,
        setCitizenId,
        setAppointmentCode,
        setName,
        setChannel,
        setExecutor,
        setStatus,
        setEProduct,
        setOfficeBranch,
        appointmentCode,
        name,
        channel,
        createDate,
        status,
        executor,
        eProduct,
        officeBranch
    } = useContext(QueriesContext)

    const initValue = () => {
        setCitizenId(
            params.get("citizenId") ? params.get("citizenId")!.toString() : ""
        )
        setAppointmentCode(
            params.get("appointmentCode")
                ? params.get("appointmentCode")!.toString()
                : ""
        )
        setName(params.get("name") ? params.get("name")!.toString() : "")
        setChannel(
            params.get("channel") ? params.get("channel")!.toString() : ""
        )
        setStatus(params.get("status") ? params.get("status")!.toString() : "")
        setExecutor(
            params.get("executor") ? params.get("executor")!.toString() : ""
        )
        setEProduct(
            params.get("eProduct") ? params.get("eProduct")!.toString() : ""
        )
        setOfficeBranch(
            params.get("officeBranch")
                ? params.get("officeBranch")!.toString()
                : ""
        )
    }

    useEffect(() => {
        console.log("Params", params)
        initValue()
    }, [params])

    const onEnterKeyPress = () => {
        let routeParams = "?"
        routeParams = MapParams(routeParams, "citizenId", citizenId)
        routeParams = MapParams(routeParams, "appointmentCode", appointmentCode)
        routeParams = MapParams(routeParams, "name", name)
        routeParams = MapParams(routeParams, "channel", channel)
        if (createDate) {
            routeParams = MapParams(
                routeParams,
                "from",
                createDate.from.toString()
            )
            routeParams = MapParams(routeParams, "to", createDate.to.toString())
        }
        routeParams = MapParams(routeParams, "status", status)
        routeParams = MapParams(routeParams, "executor", executor)
        routeParams = MapParams(routeParams, "eProduct", eProduct)
        routeParams = MapParams(routeParams, "officeBranch", officeBranch)
        const lastChar = routeParams.substring(routeParams.length - 1) // => "1"
        if (lastChar === "&") {
            routeParams = routeParams.slice(0, -1)
        }
        router.replace("/teller/queries/" + routeParams)
    }
    return (
        <Flex align="center" gap={10}>
            <Search
                key="citizenId"
                style={{ width: 300 }}
                placeholder="Tìm theo CCCD"
                allowClear
                defaultValue={
                    params.get("citizenId")
                        ? params.get("citizenId")?.toString()
                        : ""
                }
                onChange={(e) => setCitizenId(e.target.value.trim())}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onEnterKeyPress()
                    }
                }}
            />

            <Button type="primary" onClick={onEnterKeyPress}>
                Tìm kiếm
            </Button>
            <Popover
                placement="bottom"
                title={
                    <Flex vertical>
                        <h1>Filter</h1>
                        <Divider />
                    </Flex>
                }
                content={
                    <FilterComponent
                        onKeyPress={onEnterKeyPress}
                        onInit={initValue}
                    />
                }
                trigger="click"
                onOpenChange={async () => {
                    setOpenFilter(!openFilter)
                }}
            >
                {!openFilter ? (
                    <FontAwesomeIcon
                        icon={faFilter}
                        size="lg"
                        style={{ float: "right", cursor: "pointer" }}
                        onClick={() => setOpenFilter(!openFilter)}
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={faFilterCircleXmark}
                        size="lg"
                        style={{ float: "right", cursor: "pointer" }}
                        onClick={() => setOpenFilter(!openFilter)}
                    />
                )}
            </Popover>
        </Flex>
    )
}

const MapParams = (params: string, field: string, value: string) => {
    if (value && !params.includes(field)) {
        params += field + "=" + value + "&"
    }
    return params
}

const MiniComp = ({
    condition,
    value
}: {
    condition: ReactNode
    value: ReactNode
}) => {
    return (
        <Row gutter={10} align="middle" style={{ marginBottom: "5px" }}>
            <Col span={8}>{condition}</Col>
            <Col span={16} style={{ width: "100%" }}>
                {value}
            </Col>
        </Row>
    )
}

const rangePresets: {
    label: string
    value: [Dayjs, Dayjs]
}[] = [
    { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
    { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
    { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
    { label: "Last 90 Days", value: [dayjs().add(-90, "d"), dayjs()] }
]

const FilterComponent = ({
    onKeyPress,
    onInit
}: {
    onKeyPress: () => void
    onInit: () => void
}) => {
    const params = useSearchParams()
    const { setAppointmentCode, setName, setCreateDate } =
        useContext(QueriesContext)

    useEffect(() => {
        onInit()
    }, [params])

    const {
        NEXT_PUBLIC_CATEGORY,
        NEXT_PUBLIC_GET_EXECUTOR,
        NEXT_PUBLIC_DEPARTMENT,
        NEXT_PUBLIC_GET_EPRODUCT
    } = useEnvContext()
    const { RangePicker } = DatePicker
    const cookies = useCookies()
    const axiosHeader: any = {
        Authorization: "Bearer " + cookies.get("token"),
        Session: cookies.get("session")
    }

    const Base64ToInputValue = (field: string): any => {
        try {
            const value = params.get(field)
            if (value) {
                //decode base64 string
                const decodeValue = decodeURIComponent(atob(value))

                //return the base64 with parse
                return JSON.parse(decodeValue)
            }
            return []
        } catch (error: any) {
            console.log("Error in convert to base64", error)
            return []
        }
    }

    const onRangeDueDateChange = (
        value: RangePickerProps["value"],
        dateString: [string, string] | string
    ) => {
        if (value) {
            const dateFilter: createDate = {
                from: dayjs(value[0]!).unix(),
                to: dayjs(value[1]!).unix()
            }

            setCreateDate(dateFilter)
        } else {
            setCreateDate(undefined)
        }
    }
    return (
        <>
            <Row>
                <Flex vertical>
                    {/* <MiniComp
                condition={<p>CCCD</p>}
                value={
                    <Input
                        onChange={(e) => setCitizenId(e.target.value.trim())}
                    />
                }
            />*/}
                    <MiniComp
                        condition={<p>Mã giao dịch</p>}
                        value={
                            <Input
                                key="appointmentCode"
                                onBlur={(e) =>
                                    setAppointmentCode(e.target.value.trim())
                                }
                                defaultValue={
                                    params.get("appointmentCode")
                                        ? params
                                              .get("appointmentCode")
                                              ?.toString()
                                        : ""
                                }
                            />
                        }
                    />
                    <MiniComp
                        condition={<p>Tên khách hàng</p>}
                        value={
                            <Input
                                key="customerName"
                                onBlur={(e) => setName(e.target.value.trim())}
                                defaultValue={
                                    params.get("name")
                                        ? params.get("name")?.toString()
                                        : ""
                                }
                            />
                        }
                    />
                    <MiniComp
                        condition={<p>Sản phẩm</p>}
                        value={
                            <RemoteSelectorEProduct
                                url={NEXT_PUBLIC_GET_EPRODUCT!}
                                header={axiosHeader}
                                initValue={Base64ToInputValue("eProduct")}
                            />
                        }
                    />
                    <MiniComp
                        condition={<p>Kênh</p>}
                        value={
                            <RemoteSelectorCategory
                                type={CategoryTypes.CHANNEL}
                                url={NEXT_PUBLIC_CATEGORY!}
                                header={axiosHeader}
                                initValue={Base64ToInputValue("channel")}
                            />
                        }
                    />
                    <MiniComp
                        condition={<p>Ngày tạo</p>}
                        value={
                            <RangePicker
                                allowClear
                                presets={rangePresets}
                                onChange={onRangeDueDateChange}
                                style={{ width: "100%" }}
                                placeholder={["From", "To"]}
                                defaultValue={
                                    params.get("from")
                                        ? [
                                              dayjs.unix(
                                                  parseInt(params.get("from")!)
                                              ),
                                              dayjs.unix(
                                                  parseInt(params.get("to")!)
                                              )
                                          ]
                                        : undefined
                                }
                            />
                        }
                    />
                    <MiniComp
                        condition={<p>Trạng thái</p>}
                        value={
                            <RemoteSelectorCategory
                                type={CategoryTypes.STATUS_FORM}
                                url={NEXT_PUBLIC_CATEGORY!}
                                header={axiosHeader}
                                initValue={Base64ToInputValue("status")}
                            />
                        }
                    />
                    <MiniComp
                        condition={<p>Người thực hiện</p>}
                        value={
                            <RemoteSelectorUser
                                url={NEXT_PUBLIC_GET_EXECUTOR!}
                                header={axiosHeader}
                                initValue={Base64ToInputValue("executor")}
                            />
                        }
                    />
                    <MiniComp
                        condition={<p>Đơn vị</p>}
                        value={
                            <RemoteSelectorDepartment
                                url={NEXT_PUBLIC_DEPARTMENT!}
                                header={axiosHeader}
                                initValue={Base64ToInputValue("officeBranch")}
                            />
                        }
                    />
                </Flex>
            </Row>
            <Row justify="end">
                <Button className="mt-3" type="primary" onClick={onKeyPress}>
                    Xác nhận
                </Button>
            </Row>
        </>
    )
}

export default FilterOption
