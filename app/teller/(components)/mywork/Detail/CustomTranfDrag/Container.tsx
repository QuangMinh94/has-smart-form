"use client"
import update from "immutability-helper"
import { useState, useEffect, useCallback } from "react"
import { Empty, Input } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDrop } from "react-dnd"

export type typeKey = "left" | "right"
type typeProps = {
    list: any[]
    setList: React.Dispatch<React.SetStateAction<any[]>>
    setRomoveList: React.Dispatch<React.SetStateAction<any[]>>
    type: typeKey
    title: string
}

import { ToFilterName } from "@/util/formatText"
import { useContextMyWork } from "@/components/cusTomHook/useContext"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import DragItem, { TypeDragItem } from "./DragItem"

const MyDropTarget: React.FC<typeProps> = ({
    list,
    setList,
    setRomoveList,
    type,
    title
}) => {
    const [listFilter, setListFilter] = useState<any[]>([])
    const [valueSearch, setValueSearch] = useState<string>("")
    const { ChangeListFilter, setChangeListFilter } = useContextMyWork()
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

    const data = valueSearch.length > 0 ? listFilter : list
    return (
        <div
            style={{
                width: "300px",
                border: "1px solid #f0f0f0",
                borderRadius: "10px"
            }}
        >
            <div
                style={{
                    color: "black",
                    padding: "15px 0px 15px 10px ",
                    borderBottom: "1px solid  #f0f0f0"
                }}
            >
                {title}
            </div>
            <div style={{ margin: "10px 0", textAlign: "center" }}>
                <Input
                    value={valueSearch}
                    onChange={(e) => HandeFilter.HanderChange(e)}
                    style={{ width: "90%" }}
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
                {data.length <= 0 ? (
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
