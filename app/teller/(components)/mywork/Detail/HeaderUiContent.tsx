"use client"
import SelectEproduct from "../../customSelect/SelectEproduct"
import { useState, useCallback } from "react"
import { Row, Col, Select } from "antd"

import { useContextMyWorkDetail } from "@/components/cusTomHook/useContext"
import { eProduct, formTemplate } from "@/app/(types)/eProduct"
import { DataTranfer } from "@/app/(types)/typeDataTranfe"


interface DataTranfeCustom extends DataTranfer, eProduct {
    repository: string
}
const HeaderUi = () => {
    const { setListLeft, listLeft, setListRight, listRight, dataGlobal } =
        useContextMyWorkDetail()
    const [idProduct, setIdProduct] = useState<string>(dataGlobal.idEProduct)
    const [dataService, setDataService] = useState<eProduct[]>([])

    const onChangeProduct = useCallback(
        (value: string) => {
            if (listLeft.length > 0) {
                setListLeft([])
            }
            if (listRight.length > 0) {
                setListRight([])
            }
            setIdProduct(value)
        },
        [listLeft.length]
    )
    const onChangeNV = (value: string) => {
        if (listRight.length > 0) {
            setListRight([])
        }
        if (!value) {
            if (listLeft.length > 0) {
                setListLeft([])
            }
            return
        }
        const find = dataService.find((item) => item._id === value)
        const template: formTemplate[] = find?.formTemplate ?? []
        console.log(find)
        console.log("temp", template)
        // try {
        //     setLoading(true)
        //     const res = await axios.post(process.env.NEXT_PUBLIC_EFORM_LIST!, {
        //         repository: find?.name
        //     })
        //     const res_1: EformList[] = res.data
        //     const dataTranfer: DataTranfeCustom[] = []
        //     res_1.forEach((resChild) => {
        //         dataTranfer.push({
        //             id: resChild.repository + resChild.name,
        //             name: resChild.name,
        //             checkBox: false,
        //             repository: resChild.repository
        //         })
        //     })
        //     setLoading(false)
        //     setListLeft(dataTranfer)
        // } catch (e) {
        //     alert("có lỗi")
        // }

        // try {
        // setLoading(true)
        // const res = await GetProduct({
        //     bodyRequest: { _id: value },
        //     token: cookes.get("token") ?? "",
        //     session: cookes.get("session") ?? ""
        // })

        const dataTranfer: DataTranfeCustom[] = []
        template.forEach((resChild) => {
            const block = resChild?.block?.[0]
            dataTranfer.push({
                id: resChild?._id ?? "",
                name: block?.name ?? "",
                checkBox: false,
                repository: block?.ozrRepository ?? ""
            })
        })
        setListLeft(dataTranfer)

        //     setLoading(false)
        // } catch (e) {
        //     alert("có lỗi")
        // }
    }

    return (
        <Row gutter={9}>
            <Col span={12}>
                <SelectEproduct
                    defalutValue={dataGlobal.nameEproduct}
                    typeQuery="getProduct"
                    onChange={onChangeProduct}
                    placeholder="Sản phẩm"
                />
            </Col>

            <Col span={12}>
                {idProduct && idProduct?.length > 0 ? (
                    <SelectEproduct
                        typeQuery="getNV"
                        parent={idProduct}
                        onChange={onChangeNV}
                        placeholder="Dịch vụ"
                        setDataService={setDataService}
                    />
                ) : (
                    <Select style={{ width: "100%" }} placeholder="Dịch vụ" />
                )}
            </Col>
        </Row>
    )
}
export default HeaderUi
