"use client"

import { Button, Flex } from "antd"
import { useCallback, useEffect } from "react"

const Viewer = () => {
    const addScript = () => {
        const oz = document.getElementById("OZviewer")
        oz!.CreateReportEx(
            "connection.servlet=http://10.4.18.92/training/server;connection.reportname=/input/Thẻ/Lệnh chuyển tiền.ozr;viewer.showthumbnail=true;global.concatthumbnail=true;global.concatpreview=false;viewer.showtree=true;viewer.createreport_doc_index=0;viewer.showtab=true;connection.displayname=Lệnh chuyển mới;viewer.thumbnailsection_showclosebutton=true",
            ";"
        )
    }
    return (
        <Flex vertical gap={10}>
            <Button
                className="w-36 float-right"
                type="primary"
                onClick={addScript}
            >
                Click to add form
            </Button>
            <div
                id="OZviewer"
                style={{
                    width: "100%",
                    height: "90vh"
                    //marginTop: 60
                }}
            />
        </Flex>
    )
}

const OzViewer = ({ url }: { url: string }) => {
    const cachedFn = useCallback(() => {
        if (window.start_ozjs) {
            console.log("Here i am")

            window.SetOZParamters_OZviewer = () => {
                const oz = document.getElementById("OZviewer")
                //oz!.sendToActionScript("viewer.emptyframe", "true")
                oz!.sendToActionScript("connection.servlet", url)
                oz!.sendToActionScript(
                    "connection.reportname",
                    "/input/Thẻ/BIDV.ozr"
                )
                return true
                /* oz!.sendToActionScript("etcmenu.showtree", "true")
                oz!.sendToActionScript("viewer.showthumbnail", `false`)
                oz!.sendToActionScript("global.concatthumbnail", `true`)
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
            }
            window.start_ozjs("OZviewer", `http://10.4.18.92/html5viewer/`)
        }
    }, [])
    useEffect(() => {
        if (window) {
            cachedFn()
        }
    }, [cachedFn])
    return <Viewer />
}

const DefaultParams = `viewer.showthumbnail=true;global.concatthumbnail=true;
    global.concatpreview=false;viewer.showtree=true;
    viewer.showtab=true;
    connection.displayname=new ozr;
    viewer.thumbnailsection_showclosebutton=true;`

export default OzViewer
