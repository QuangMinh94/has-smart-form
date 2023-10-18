"use client"
import Input from "antd/es/input/Input"
import type { RadioChangeEvent } from "antd"
import { Radio } from "antd"
import React, { useState } from "react"
const RadioComponent = () => {
    const [value, setValue] = useState(1)
    const onChange = (e: RadioChangeEvent) => {
        console.log("radio checked", e.target.value)
        setValue(e.target.value)
    }

    return (
        <Radio.Group style={{marginLeft:"60px"}} onChange={onChange} value={value}>
            <Radio value={1}>CDDD</Radio>
            <Radio value={2}>Mã GD</Radio>
        </Radio.Group>
    )
}
const FilterMyWork:React.FC= () => {
    return (
        <>
            <Input placeholder="Tìm Kiếm" style={{ width: "30%" }} />
            <RadioComponent />
        </>
    )
}

export default FilterMyWork