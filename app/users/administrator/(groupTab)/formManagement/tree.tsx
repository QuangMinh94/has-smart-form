import { Input, Tree } from "antd"
import { DataNode, TreeProps } from "antd/es/tree"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useMemo, useState } from "react"
import { ContextFormManagement } from "./context"
import "./style/style.css"

const { Search } = Input
const dataList: { key: React.Key; title: string }[] = []

const TreeComp = ({ treeSelectData }: { treeSelectData: DataNode[] }) => {
    const router = useRouter()
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])
    const [searchValue, setSearchValue] = useState("")
    const [autoExpandParent, setAutoExpandParent] = useState(true)
    const { selectedKey, setSelectedKey } = useContext(ContextFormManagement)

    useEffect(() => {
        generateList(treeSelectData)
    }, [JSON.stringify(treeSelectData)])

    const onExpand = (newExpandedKeys: React.Key[]) => {
        setExpandedKeys(newExpandedKeys)
        setAutoExpandParent(false)
    }

    const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
        console.log("selected", selectedKeys, info)
        setSelectedKey(selectedKeys)
        router.push(
            "/users/administrator/formManagement?folderId=" + selectedKeys
        )
        router.refresh()
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        console.log("Data list", dataList)
        const newExpandedKeys = dataList
            .map((item) => {
                if (item.title!.toString().indexOf(value) > -1) {
                    return getParentKey(item.key, treeSelectData)
                }
                return null
            })
            .filter(
                (item, i, self): item is React.Key =>
                    !!(item && self.indexOf(item) === i)
            )
        setExpandedKeys(newExpandedKeys)
        setSearchValue(value)
        setAutoExpandParent(true)
    }

    const treeData = useMemo(() => {
        const loop = (data: DataNode[]): DataNode[] =>
            data.map((item) => {
                const strTitle = item.title as string
                const index = strTitle.indexOf(searchValue)
                const beforeStr = strTitle.substring(0, index)
                const afterStr = strTitle.slice(index + searchValue.length)
                const title =
                    index > -1 ? (
                        <span>
                            {beforeStr}
                            <span className="site-tree-search-value">
                                {searchValue}
                            </span>
                            {afterStr}
                        </span>
                    ) : (
                        <span>{strTitle}</span>
                    )
                if (item.children) {
                    return {
                        title,
                        key: item.key,
                        children: loop(item.children)
                    }
                }

                return {
                    title,
                    key: item.key
                }
            })

        return loop(treeSelectData)
    }, [searchValue])

    return (
        <div>
            <Search
                style={{ marginBottom: 8 }}
                placeholder="Search"
                onChange={onChange}
            />
            <Tree
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                treeData={treeData}
                onSelect={onSelect}
                selectedKeys={selectedKey}
            />
        </div>
    )
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

const generateList = (data: DataNode[]) => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i]
        const { key, title } = node
        dataList.push({ key, title: title as string })
        if (node.children) {
            generateList(node.children)
        }
    }
}

export default TreeComp
