import type { Identifier, XYCoord } from "dnd-core"
import type { FC } from "react"
import { useRef } from "react"
import { useDrag, useDrop } from "react-dnd"
import { Checkbox } from "antd"
import { typeKey } from "./Container"
export interface CardProps {
    rowData: any
    index: number
    moveCard: (dragIndex: number, hoverIndex: number, typerow: typeKey) => void
    addCard: (dragIndex: number, typerow: typeKey, rowAdd: any) => void
    HanderCheckItem: (idData: string) => void
    type: typeKey
}

export interface TypeDragItem {
    index: number
    rowData: any
    type: typeKey
}

const Card: FC<CardProps> = ({
    rowData,
    index,
    moveCard,
    HanderCheckItem,
    addCard,
    type
}) => {
    const ref = useRef<HTMLDivElement>(null)
    const [{ handlerId }, drop] = useDrop<
        TypeDragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: "CARD",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
        drop(item: TypeDragItem) {
            const dragIndex = item.index
            const type = item.type
            addCard(dragIndex, type, item?.rowData)
        },
        hover(item: TypeDragItem, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            const type = item.type
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            const clientOffset = monitor.getClientOffset()
            const hoverClientY =
                (clientOffset as XYCoord).y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            moveCard(dragIndex, hoverIndex, type)
            item.index = hoverIndex
        }
    })

    const [{ isDragging }, drag] = useDrag({
        type: "CARD",
        item: (): TypeDragItem => {
            return { rowData, index, type }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))
    return (
        <div
            ref={ref}
            className="itemDrag"
            onClick={() => {
                HanderCheckItem(rowData?.id)
            }}
            data-handler-id={handlerId}
            style={{
                color: "black",
                display: "flex",
                cursor: "pointer",
                padding: " 8px 0 8px 14px",
                opacity: opacity
            }}
        >
            <div style={{ flex: 1 }}>{rowData?.name}</div>
            <Checkbox
                checked={!!rowData?.checkBox}
                style={{ marginRight: "15px" }}
            />
        </div>
    )
}
export default Card
