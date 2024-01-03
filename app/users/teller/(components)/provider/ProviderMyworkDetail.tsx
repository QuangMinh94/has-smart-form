"use client"
import React, { useState } from "react"
import {
    changeBlock,
    contextMyworkDetail,
    dataGlobal,
    typeContextMyworkDetail
} from "../context"

type typeProvider = {
    children: React.ReactNode
}
const ProviderMyWorkDetail: React.FC<typeProvider> = ({ children }) => {
    const [listLeft, setListLeft] = useState<any[]>([])
    const [listRight, setListRight] = useState<any[]>([])
    const [ChangeListFilter, setChangeListFilter] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [choosenBlock, setChoosenBlock] = useState<changeBlock>({
        choosenBlock: [],
        changeBlock: 0
    })
    const [dataGlobal, setDataGlobal] = useState<dataGlobal>({
        idEProduct: "",
        nameEproduct: "",
        dataMywork: [],
        myworkDetail: { docusignDocumentId: "" },
        inFoUser: {
            _id: "",
            createDate: "",
            citizenId: "",
            dateOfBirth: "",
            fullName: "",
            mobilePhoneNumber: "",
            emailAddress: ""
        }
    })
    const [selectedProduct, setSelectedProduct] = useState<string>("")
    const data: typeContextMyworkDetail = {
        setListLeft,
        setListRight,
        setChangeListFilter,
        setDataGlobal,
        setChoosenBlock,
        setLoading,
        dataGlobal,
        listLeft,
        listRight,
        ChangeListFilter,
        choosenBlock,
        loading,
        setSelectedProduct,
        selectedProduct
    }
    return (
        <contextMyworkDetail.Provider value={data}>
            {children}
        </contextMyworkDetail.Provider>
    )
}
export default ProviderMyWorkDetail
