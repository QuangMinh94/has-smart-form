import { useContextBa } from "@/components/cusTomHook/useContext"
import React, { memo } from "react"
import { Checkbox } from "antd"

const ActiveTree: React.FC = () => {
    const { setDataGlobal } = useContextBa()

    return <Checkbox />
}
export default memo(ActiveTree)
