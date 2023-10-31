"use client"
import SelectEproduct from "../../customSelect/SelectEproduct"
import { useState, useCallback } from "react"
import { Row, Col } from "antd"
import { GetProduct } from "@/app/(service)/eProduct"
import { useCookies } from "next-client-cookies"
import { useContextMyWorkDetail } from "@/components/cusTomHook/useContext"
import { eProduct } from "@/app/(types)/eProduct"
import { DataTranfer } from "@/app/(types)/typeDataTranfe"
interface DataTranfeCustom extends DataTranfer, eProduct {}
const HeaderUi = () => {
    const cookes = useCookies()
    const { setListLeft, listLeft, setLoading } = useContextMyWorkDetail()
    const [idProduct, setIdProduct] = useState<string>("")
    const onChangeProduct = useCallback(
        (value: string) => {
            if (listLeft.length > 0) {
                setListLeft([])
            }
            setIdProduct(value)
        },
        [listLeft.length]
    )
    const onChangeNV = useCallback(
        async (value: string) => {
            if (!value) {
                if (listLeft.length > 0) {
                    setListLeft([])
                }
                return
            }
            try {
                setLoading(true)
                const res = await GetProduct({
                    bodyRequest: { id: value },
                    token: cookes.get("token") ?? "",
                    session: cookes.get("session") ?? ""
                })
                const res_1: eProduct[] = res.data
                const dataTranfer: DataTranfeCustom[] = []
                res_1.forEach((resChild) => {
                    dataTranfer.push({
                        id: resChild?._id ?? "",
                        name: resChild?.name ?? "",
                        checkBox: false
                    })
                })
                console.log("du", dataTranfer)
                setListLeft(dataTranfer)
                setLoading(false)
            } catch (e) {
                alert("có lỗi")
            }
        },
        [listLeft.length]
    )

    return (
        <Row gutter={9}>
            <Col span={12}>
                <SelectEproduct
                    typeQuery="getProduct"
                    onChange={onChangeProduct}
                />
            </Col>

            <Col span={12}>
                <SelectEproduct
                    typeQuery="getNV"
                    parent={idProduct}
                    onChange={onChangeNV}
                />
            </Col>
        </Row>
    )
}
export default HeaderUi
