import type { DataNode } from "antd/es/tree"
import { ToFilterName } from "@/util/formatText"
import { Flex } from "antd"

import "./TreeViewProduct.css"
type Cusomter = {
    Tree: any[]
    searchValue: string
    colorSeacrh: string
    AddModel?: React.FC<{
        datarow: any
    }>
    UpdateModel?: React.FC<{
        datarow: any
    }>
    ActiveModal?: React.FC<{
        datarow: any
    }>
}
function TreeCustom({
    Tree,
    searchValue,
    colorSeacrh,
    AddModel,
    UpdateModel,
    ActiveModal
}: Cusomter): DataNode[] {
    const TreeCustomer: DataNode[] = []

    Tree?.forEach((item) => {
        const strTitle = item?.name ?? ""
        const index = ToFilterName(strTitle).indexOf(ToFilterName(searchValue))
        const name =
            index > -1 && searchValue.length > 0 ? (
                <span style={{ color: colorSeacrh }}>{strTitle}</span>
            ) : (
                <span>{`${item?.name}`}</span>
            )

        TreeCustomer.push({
            title: (
                <Flex className="boxAction">
                    <div
                        className={`mr-[8px] ${
                            item.active ? "" : "opacity-40"
                        }`}
                    >
                        {name}
                    </div>
                    <div
                        className={`hidden actionHover `}
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                    >
                        {AddModel && (
                            <div className="mr-[8px]">
                                <AddModel datarow={item} />
                            </div>
                        )}
                        {UpdateModel && (
                            <div className="mr-[8px]">
                                <UpdateModel datarow={item} />
                            </div>
                        )}
                        {ActiveModal && (
                            <div>
                                <ActiveModal datarow={item} />
                            </div>
                        )}
                    </div>
                </Flex>
            ),
            key: item?._id ?? "",
            children:
                item?.children && item?.children?.length > 0
                    ? TreeCustom({
                          Tree: item?.children ?? [],
                          searchValue,
                          colorSeacrh,
                          AddModel,
                          UpdateModel,
                          ActiveModal
                      })
                    : [],
            icon: item?.name
        })
    })
    return TreeCustomer
}
export default TreeCustom
