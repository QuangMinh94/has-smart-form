"use client"
import routers from "@/router/cusTomRouter"
import Input from "antd/es/input/Input"
import { RadioChangeEvent, Row, Col } from "antd"
import { Radio, Button } from "antd"
import React, { useEffect } from "react"
import {
    usePathname,
    useParams,
    useRouter,
    useSearchParams
} from "next/navigation"

const useHanderNavigation = () => {
    const pathName = usePathname()
    const params = useParams()
    const router = useRouter()
    const searchParams = useSearchParams()
    const condition = {
        pagemywork: {
            isMyworkpath: pathName === routers.mywork.path,
            isDetailMyorkpath:
                pathName === routers.detailMywork.path({ id: `${params?.id}` })
        }
    }
    return { pathName, params, router, condition, searchParams }
}
const RadioComponent = () => {
    const { pathName, params, router, condition, searchParams } =
        useHanderNavigation()
    const value = searchParams.get("search")
    const onChange = (e: RadioChangeEvent) => {
        router.push(`?search=${e.target.value}`)
    }
    useEffect(() => {
        if (condition.pagemywork.isMyworkpath) {
            router.push(`?search=CDDD`)
        }
    }, [pathName])
    return (
        <Radio.Group
            style={{ marginLeft: "60px" }}
            onChange={onChange}
            value={value}
        >
            <Radio value={"CDDD"}>CDDD</Radio>
            <Radio value={"MCD"}>Mã GD</Radio>
        </Radio.Group>
    )
}

const CustomBtn = () => {
    const { pathName, params, router, condition } = useHanderNavigation()
    const HanderBtn = {
        Back: () => {
            const pathRevert = {
                [`${routers.detailMywork.path({ id: `${params?.id}` })}`]:
                    routers.mywork.path
            }
            router.push(pathRevert[pathName])
        },
        Add: () => {}
    }
    const HandleClick = () => {
        if (condition.pagemywork.isDetailMyorkpath) {
            HanderBtn.Back()
        }
        if (condition.pagemywork.isMyworkpath) {
            HanderBtn.Add()
        }
    }

    return (
        <Button onClick={HandleClick}>
            {condition.pagemywork.isDetailMyorkpath
                ? " Quay lại"
                : condition.pagemywork.isMyworkpath
                ? "Tạo mới"
                : "error"}
        </Button>
    )
}
const CustomFilter = () => {
    const { pathName, params, router, condition, searchParams } =
        useHanderNavigation()
       
    const HanderFilter = {
        [`${routers.mywork.path}`]: (value: string) => {
            console.log("filterMywork", value)
            console.log("search", searchParams.get("search"))
        }
    }
    const HandlerChange = (e: any) => {
        HanderFilter[pathName](e.target.value)
    }
    return (
        <Input
            value={params?.id}
            onChange={HandlerChange}
            disabled={condition.pagemywork.isDetailMyorkpath}
            placeholder="Tìm Kiếm"
            style={{ width: "100%" }}
        />
    )
}
const Filter = () => {
    return (
        <Row align="middle">
            <Col span={7}>
                <CustomFilter />
            </Col>
            <Col span={15}>
                <RadioComponent />
            </Col>
            <Col
                span={2}
                style={{ display: "flex", justifyContent: "flex-end" }}
            >
                <CustomBtn />
            </Col>
        </Row>
    )
}

export default Filter
