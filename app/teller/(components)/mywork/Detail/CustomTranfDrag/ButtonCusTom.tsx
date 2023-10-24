"use client"
import { useMemo } from "react"
import { Button } from "antd"
import { useContextMyWork } from "@/components/cusTomHook/useContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faChevronRight,
    faChevronLeft
} from "@fortawesome/free-solid-svg-icons"
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
                    listRight.filter((item) => !item?.checkBox)
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
        return !listLeft.some((item) => item?.checkBox)
    }, [listLeft])
    const checkBtnLeft = useMemo(() => {
        return !listRight.some((item) => item?.checkBox)
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
export default ButtonLeftandRight
