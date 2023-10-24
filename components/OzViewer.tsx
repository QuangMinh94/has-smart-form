"use client"

import { Button, Flex } from "antd"
import { useCallback, useEffect } from "react"

interface Props {
    url: string
    onPreview: (e: any) => void
    onSubmit: (e: any) => void
    onSave: (e: any) => void
    onCancel: (e: any) => void
}

const OzViewer = ({ url, onPreview, onSubmit, onSave, onCancel }: Props) => {
    const cachedFn = useCallback(() => {
        if (window.start_ozjs) {
            console.log("Here i am")

            window.SetOZParamters_OZViewer = () => {
                const oz = document.getElementById("OZViewer")
                //oz!.sendToActionScript("viewer.showthumbnail", false)
                oz!.sendToActionScript("viewer.emptyframe", "true")
                /*  oz!.sendToActionScript("connection.servlet", url)
                oz!.sendToActionScript(
                    "connection.reportname",
                    "/input/Thẻ/BIDV.ozr"
                ) */

                //oz!.sendToActionScript("etcmenu.showtree", "true")
                //oz!.sendToActionScript("viewer.showtree", "false")

                /*oz!.sendToActionScript("global.concatthumbnail", `true`)
                oz!.sendToActionScript("global.concatpreview", `true`)
                oz!.sendToActionScript("viewer.showtree", `true`)
                oz!.sendToActionScript("viewer.showtab", `true`)
                oz!.sendToActionScript(
                    "connection.displayname",
                    `Bo may chuyen tien`
                )
                oz!.sendToActionScript(
                    "viewer.thumbnailsection_showclosebutton",
                    `true`
                ) */
                //return true
            }
            window.start_ozjs(
                "OZViewer",
                `${process.env.NEXT_PUBLIC_EFORM_SERVER}/html5viewer/`
            )
        }
    }, [])

    useEffect(() => {
        if (window) {
            cachedFn()
        }
    }, [cachedFn])

    return (
        <Viewer
            url=""
            onPreview={onPreview}
            onSubmit={onSubmit}
            onSave={onSave}
            onCancel={onCancel}
        />
    )
}

const Viewer = ({ onPreview, onSubmit, onSave, onCancel }: Props) => {
    return (
        <Flex vertical gap={10}>
            <Flex justify="flex-end">
                <Button className="w-20" type="primary" onClick={onPreview}>
                    Preview
                </Button>
            </Flex>
            <Flex justify="flex-end" gap={10}>
                <Button className="w-20" type="primary" onClick={onSubmit}>
                    Submit
                </Button>
                <Button className="w-20" type="primary" onClick={onSave}>
                    Save
                </Button>
                <Button
                    className="w-20"
                    danger
                    type="primary"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
            </Flex>
            <div
                id="OZViewer"
                style={{
                    width: "100%",
                    height: "90vh"
                    //marginTop: 60
                }}
            />
        </Flex>
    )
}

export default OzViewer
