"use client"
import React, { useEffect, useState } from "react"
import { Transfer, Card } from "antd"
import type { TransferDirection } from "antd/es/transfer"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

const DraggableCard: React.FC<{ data: any; type: string }> = ({ data,type }) => {
    const [, ref] = useDrag({
        type,
        item: data
    })

    return (
        <li
            ref={ref}
            style={{
                color: "black",
                width: "100px"
            }}
        >
            {data?.name}
        </li>
    )
}

function MyDropTarget(props: {
    list: any[]
    setList: React.Dispatch<React.SetStateAction<any[]>>
    setRomoveList: React.Dispatch<React.SetStateAction<any[]>>
    typeDrag: string
    typeDrop: string
}) {
    const { list, setList, setRomoveList, typeDrag, typeDrop } = props
    const [, ref] = useDrop({
        accept: typeDrop,
        drop: (item: any) => {
            setList((p) => [...p, item])
            setRomoveList((p) => p.filter((elment) => item?.id !== elment?.id))
        }
    })

    return (
        <div
            ref={ref}
            className="Left"
            style={{
                overflow: "scroll",
                border: "1px solid red",
                width: "200px",
                height: "200px"
            }}
        >
            {list.map((item: any, index) => (
                <DraggableCard type={typeDrag} key={index} data={item} />
            ))}
        </div>
    )
}

const DetailFormUser = () => {
    const [listLeft, setListLeft] = useState<any[]>([])
    const [listR, setListR] = useState<any[]>([])
    function getMock() {
        const arr = []
        for (let i = 0; i <= 100; i++) {
            arr.push({ id: i, name: `name ${i}` })
        }
        setListLeft(arr)
    }
    useEffect(() => {
        getMock()
    }, [])

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ display: "flex" }}>
                <MyDropTarget
                    typeDrag="left"
                    typeDrop="R"
                    setList={setListLeft}
                    list={listLeft}
                    setRomoveList={setListR}
                />
                <MyDropTarget
                    typeDrop="left"
                    typeDrag="R"
                    setList={setListR}
                    list={listR}
                    setRomoveList={setListLeft}
                />
            </div>
        </DndProvider>
    )
}

export default DetailFormUser
