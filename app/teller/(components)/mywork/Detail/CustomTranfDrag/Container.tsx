"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Checkbox, Empty, Input, Spin, theme } from "antd"
import update from "immutability-helper"
import { useCallback, useEffect, useState } from "react"
import { useDrop } from "react-dnd"

export type typeKey = "left" | "right"
type typeProps = {
    list: any[]
    setList: React.Dispatch<React.SetStateAction<any[]>>
    setRomoveList: React.Dispatch<React.SetStateAction<any[]>>
    setChangeListFilter: React.Dispatch<React.SetStateAction<boolean>>
    ChangeListFilter: boolean
    type: typeKey
    title: string
    HidenUI?: React.ReactNode
    loading?: boolean
}

import { ToFilterName } from "@/util/formatText"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import DragItem, { TypeDragItem } from "./DragItem"

const MyDropTarget: React.FC<typeProps> = ({
    list,
    setList,
    setRomoveList,
    type,
    title,
    ChangeListFilter,
    setChangeListFilter,
    HidenUI,
    loading
}) => {
    const {
        token: { colorPrimary }
    } = theme.useToken()
    const [listFilter, setListFilter] = useState<any[]>([])
    const [valueSearch, setValueSearch] = useState<string>("")
    const HandeFilter = {
        HanderChange: (e: any) => {
            setValueSearch(e.target.value)
        },
        FilterData: (list: any[], valueSearch: string) => {
            const ListSearch = list.filter(
                (item) =>
                    ToFilterName(`${item.name}`).indexOf(
                        ToFilterName(valueSearch)
                    ) > -1
            )
            setListFilter(ListSearch)
        }
    }
    const RemoveList = (id: string) => {
        setRomoveList((ListRemove) => ListRemove.filter((row) => row.id !== id))
    }
    const [, drop] = useDrop({
        accept: "CARD",
        drop(item: TypeDragItem) {
            if (item.type !== type) {
                setList((List) => {
                    if (List.some((row) => row.id === item.rowData.id)) {
                        return [...List]
                    }
                    RemoveList(item.rowData.id)
                    setChangeListFilter((p) => !p)
                    return [...List, item.rowData]
                })
            }
        }
    })

    const moveCard = useCallback(
        (dragIndex: number, hoverIndex: number, typeRow: typeKey) => {
            const HanderMove = (list: any[]) => {
                return update(list, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, list[dragIndex]]
                    ]
                })
            }
            if (type === typeRow) {
                if (valueSearch.length <= 0) {
                    setList(HanderMove)
                } else {
                    setListFilter(HanderMove)
                }
            }
        },
        [valueSearch.length]
    )
    const addCard = useCallback(
        (hoverIndex: number, typeRow: typeKey, rowAdd: any) => {
            if (type !== typeRow) {
                setChangeListFilter((p) => !p)
                RemoveList(rowAdd?.id)
                setList((List) => {
                    List.splice(hoverIndex, 0, rowAdd)
                    return [...List]
                })
            }
        },
        []
    )
    useEffect(() => {
        let debounceDelay: any
        if (valueSearch.length > 0) {
            debounceDelay = setTimeout(() => {
                HandeFilter.FilterData(list, valueSearch)
            }, 400)
        }
        return () => clearTimeout(debounceDelay)
    }, [valueSearch])

    useEffect(() => {
        if (valueSearch.length > 0) {
            HandeFilter.FilterData(list, valueSearch)
        }
    }, [ChangeListFilter])

    const HanderCheckItem = (idData: string) => {
        setList((list) => {
            setChangeListFilter((p) => !p)
            return list.map((item) => {
                if (item.id === idData) {
                    return { ...item, checkBox: !item?.checkBox }
                }
                return item
            })
        })
    }
    const onCheck = (e: any) => {
        setList((list) =>
            list.map((item) => ({ ...item, checkBox: !!e.target.checked }))
        )
    }
    const data = valueSearch.length > 0 ? listFilter : list
    return (
        <div
            className="shadow-md h-full"
            style={{
                width: "auto",
                border: "1px solid #f0f0f0",
                borderRadius: "10px"
            }}
        >
            <header style={{ borderBottom: "1px solid  #f0f0f0" }}>
                <div
                    className="flex"
                    style={{
                        width: "95%",
                        margin: "10px auto "
                    }}
                >
                    <div className="flex-1" style={{ color: colorPrimary }}>
                        {title}
                    </div>
                    <div>
                        <Checkbox
                            onChange={onCheck}
                            checked={
                                list.length > 0 &&
                                list.every((item) => !!item?.checkBox)
                            }
                        >
                            Chọn toàn bộ
                        </Checkbox>
                    </div>
                </div>
            </header>

            <div style={{ width: "95%", margin: "10px auto " }}>
                {HidenUI && <div className="my-5"> {HidenUI} </div>}
                <Input
                    value={valueSearch}
                    onChange={(e) => HandeFilter.HanderChange(e)}
                    prefix={<FontAwesomeIcon icon={faSearch} />}
                    placeholder="Search"
                />
            </div>

            <ul
                className="test"
                ref={drop}
                style={{
                    overflowY: "scroll",
                    height: "300px"
                }}
            >
                {loading ? (
                    <div className="mt-20">
                        <Spin tip="Loading....">
                            <div className="content" />
                        </Spin>
                    </div>
                ) : data.length <= 0 ? (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                ) : (
                    data.map((item, index) => (
                        <div key={item.id}>
                            <DragItem
                                type={type}
                                HanderCheckItem={HanderCheckItem}
                                rowData={item}
                                index={index}
                                moveCard={moveCard}
                                addCard={addCard}
                            />
                        </div>
                    ))
                )}
            </ul>
        </div>
    )
}
export default MyDropTarget
