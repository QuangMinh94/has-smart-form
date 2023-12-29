import { eProduct } from "@/app/(types)/eProduct"
import { ToFilterName } from "@/util/formatText"
import { faPaperclip } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Badge } from "antd"
import type { DataNode } from "antd/es/tree"
export interface CustomEproduct extends eProduct {
    checked?: boolean
}
type Cusomter = {
    Tree: CustomEproduct[]
    searchValue: string
    colorSeacrh: string
    Checkbox: React.FC<{
        id: string
        checked: boolean
    }>
}

export function updateCheckbox({
    eProduct,
    id,
    checked
}: {
    eProduct: CustomEproduct[]
    id: string
    checked: boolean
}): void {
    eProduct.forEach((product, index) => {
        if (product._id === id) {
            eProduct[index] = { ...product, checked: !checked }
        } else {
            eProduct[index] = { ...product, checked: false }
        }
        if (product?.children && product?.children?.length > 0) {
            updateCheckbox({ eProduct: product?.children, id, checked })
        }
    })
}
function TreeCustom({
    Tree,
    searchValue,
    colorSeacrh,
    Checkbox
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
                <div className="flex items-center">
                    <div className="mr-[16px]">{name}</div>
                    {item?.type === "B" && (
                        <div
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                            className="flex items-center"
                        >
                            {item?.integration &&
                                item?.integration?.length > 0 && (
                                    <Badge
                                        size="small"
                                        count={item?.integration?.length}
                                    >
                                        <FontAwesomeIcon icon={faPaperclip} />
                                    </Badge>
                                )}
                            <div className="ml-[10px]">
                                <Checkbox
                                    id={item._id ?? ""}
                                    checked={!!item?.checked}
                                />
                            </div>
                        </div>
                    )}
                </div>
            ),
            key: item?._id ?? "",
            children:
                item?.children && item?.children?.length > 0
                    ? TreeCustom({
                          Tree: item?.children ?? [],
                          searchValue,
                          colorSeacrh,
                          Checkbox
                      })
                    : [],
            icon: item?.name
        })
    })
    return TreeCustomer
}
export default TreeCustom
