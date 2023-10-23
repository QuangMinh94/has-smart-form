"use client"
import React, { useEffect, useMemo, useState } from "react"
import { Input, Checkbox, Button, Empty } from "antd"
import { useContextMyWork } from "@/components/cusTomHook/useContext"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { ToFilterName } from "@/util/formatText"
import {
    faSearch,
    faChevronLeft,
    faChevronRight
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "@/public/css/myWork/detailMyWork.css"
type typeProps = {
    list: any[]
    setList: React.Dispatch<React.SetStateAction<any[]>>
    setRomoveList: React.Dispatch<React.SetStateAction<any[]>>
    typeDrag: string
    typeDrop: string
}
const DraggableCard: React.FC<{
    data: any
    type: string
    setList: React.Dispatch<React.SetStateAction<any[]>>
}> = ({ data, type, setList }) => {
    const [, ref] = useDrag({
        type,
        item: data,
        
    })
    const { setChangeListFilter } = useContextMyWork()
    const HanderClick = (idData: string) => {
        setList((list) => {
            setChangeListFilter((p) => !p)
            return list.map((item) => {
                if (item.id === idData) {
                    return { ...item, checkBox: !item.checkBox }
                }
                return item
            })
        })
    }
    return (
        <li
            className="itemDrag"
            ref={ref}
            onClick={() => {
                HanderClick(data?.id)
            }}
            style={{
                color: "black",
                display: "flex",
                margin: "8px 0",
                cursor: "pointer",
                padding: " 5px 0 5px 14px"
            }}
        >
            <div style={{ flex: 1 }}>{data?.name}</div>
            <Checkbox
                checked={!!data?.checkBox}
                style={{ marginRight: "15px" }}
            />
        </li>
    )
}

const MyDropTarget: React.FC<typeProps> = ({
    list,
    setList,
    setRomoveList,
    typeDrag,
    typeDrop
}) => {
    const [listFilter, setListFilter] = useState<any[]>([])
    const [valueSearch, setValueSearch] = useState<string>("")
    const { ChangeListFilter, setChangeListFilter } = useContextMyWork()

    const [, ref] = useDrop({
        accept: typeDrop,
        drop: (item: any, monitor:any) => {
            
            if (list.some((list) => list.id === item.id)) {
            } else {
                setList((p) => [{ ...item, checkBox: false }, ...p])
                setRomoveList((p) =>
                    p.filter((elment) => item?.id !== elment?.id)
                )
                setChangeListFilter((p) => !p)
            }
        },
        hover:(item, monitor) =>{
            console.log("hover",monitor)
        }
    })

    const filterData = (list: any[], valueSearch: string) => {
        const ListSearch = list.filter(
            (item) =>
                ToFilterName(`${item.name}`).indexOf(
                    ToFilterName(valueSearch)
                ) > -1
        )
        setListFilter(ListSearch)
    }
    const HandelerChange = (e: any) => {
        setValueSearch(e.target.value)
    }

    useEffect(() => {
        let debounceDelay: any
        if (valueSearch.length > 0) {
            debounceDelay = setTimeout(() => {
                filterData(list, valueSearch)
            }, 400)
        }
        return () => clearTimeout(debounceDelay)
    }, [valueSearch])

    useEffect(() => {
        if (valueSearch.length > 0) {
            filterData(list, valueSearch)
        }
    }, [ChangeListFilter])

    const data = valueSearch.length > 0 ? listFilter : list
    return (
        <div
            ref={ref}
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
                Tên Biểu mẫu
            </div>
            <div style={{ margin: "10px 0", textAlign: "center" }}>
                <Input
                    value={valueSearch}
                    onChange={HandelerChange}
                    style={{ width: "90%" }}
                    prefix={<FontAwesomeIcon icon={faSearch} />}
                    placeholder="Search"
                />
            </div>
            <ul
                style={{
                    overflowY: "scroll",
                    height: "300px"
                }}
            >
                {data.length <= 0 ? (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                ) : (
                    data.map((item: any, index) => (
                        <DraggableCard
                            setList={setList}
                            type={typeDrag}
                            key={index}
                            data={item}
                        />
                    ))
                )}
            </ul>
        </div>
    )
}

const ButtonLeftandRight: React.FC = () => {
    const {
        listLeft,
        listRight,
        setListLeft,
        setListRight,
        setChangeListFilter
    } = useContextMyWork()
    const HandlerAdditem = (type: "addRight" | "addLeft") => {
        if (type === "addRight") {
            setListRight((listRight) => {
                setListLeft((listLeft) =>
                    listLeft.filter((item) => !item.checkBox)
                )

                listRight.unshift(
                    ...listLeft
                        .filter((item) => item.checkBox)
                        .map((item) => ({ ...item, checkBox: false }))
                )
                return listRight
            })
        }
        if (type === "addLeft") {
            setListLeft((listLeft) => {
                setListRight((listRight) =>
                    listRight.filter((item) => !item.checkBox)
                )

                listLeft.unshift(
                    ...listRight
                        .filter((item) => item.checkBox)
                        .map((item) => ({ ...item, checkBox: false }))
                )
                return listLeft
            })
        }
        setChangeListFilter((p) => !p)
    }
    const checkBtnRight = useMemo(() => {
        return !listLeft.some((item) => item.checkBox)
    }, [listLeft])
    const checkBtnLeft = useMemo(() => {
        return !listRight.some((item) => item.checkBox)
    }, [listRight])
    return (
        <>
            <Button
                style={{ marginBottom: "6px" }}
                onClick={() => HandlerAdditem("addRight")}
                disabled={checkBtnRight}
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </Button>
            <Button
                onClick={() => HandlerAdditem("addLeft")}
                disabled={checkBtnLeft}
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
        </>
    )
}

const DetailFormUser = () => {
    const { listLeft, listRight, setListLeft, setListRight } =
        useContextMyWork()

    useEffect(() => {
        function getMock() {
            const arr = []
            for (let i = 0; i <= 100; i++) {
                arr.push({ id: i, name: `name ${i}`, checkBox: false })
            }
            setListLeft(arr)
        }
        getMock()
    }, [])

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <MyDropTarget
                    typeDrag="left"
                    typeDrop="left"
                    setList={setListLeft}
                    list={listLeft}
                    setRomoveList={setListRight}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "0 6px"
                    }}
                >
                    <ButtonLeftandRight />
                </div>
                <MyDropTarget
                    typeDrop="left"
                    typeDrag="left"
                    setList={setListRight}
                    list={listRight}
                    setRomoveList={setListLeft}
                />
            </div>
        </DndProvider>
    )
}

export default DetailFormUser
