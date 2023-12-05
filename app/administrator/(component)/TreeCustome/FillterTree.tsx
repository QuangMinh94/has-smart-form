"use client"
import { Input, theme } from "antd"
import { ToFilterName } from "@/util/formatText"
import { useContextTree } from "@/components/cusTomHook/useContext"
import type { DataNode } from "antd/es/tree"
import React, { useMemo } from "react"
import { debounce } from "lodash"
type TypeDataList = { key: React.Key; name: string }
const generateList = (data: DataNode[], dataList: TypeDataList[]) => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i]
        const { key } = node
        dataList.push({ key, name: `${node.icon}` })
        if (node.children && node.children.length > 0) {
            generateList(node.children, dataList)
        }
    }
}
const getDataList = (data: DataNode[]): TypeDataList[] => {
    const dataList: TypeDataList[] = []
    generateList(data, dataList)
    return dataList
}
const getParentKey = (key: React.Key, tree: DataNode[]): React.Key => {
    let parentKey: React.Key
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i]
        if (node.children) {
            if (node.children.some((item) => item.key === key)) {
                parentKey = node.key
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children)
            }
        }
    }
    return parentKey!
}
const FillterProduct: React.FC = () => {
    const {
        setTreeFilter,
        dataGlobal: { DataNode }
    } = useContextTree()

    const dataList = useMemo(() => {
        return getDataList(DataNode)
    }, [JSON.stringify(DataNode)])

    const {
        token: { colorPrimary }
    } = theme.useToken()

    const onChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        const newExpandedKeys = dataList
            .map((item) => {
                if (ToFilterName(item.name).indexOf(ToFilterName(value)) > -1) {
                    return getParentKey(item.key, DataNode)
                }
                return null
            })
            .filter(
                (item, i, self): item is React.Key =>
                    !!(item && self.indexOf(item) === i)
            )

        setTreeFilter((data) => {
            return {
                ...data,
                searchValue: value,
                expandedKeys: value.length > 0 ? newExpandedKeys : [],
                autoExpandParent: true
            }
        })
    }, 400)

    return (
        <div>
            <div style={{ color: colorPrimary }} className="mb-[5px]">
                Tìm Kiếm
            </div>
            <Input onChange={onChange} />
        </div>
    )
}
export default FillterProduct
