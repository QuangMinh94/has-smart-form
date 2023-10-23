"use client"

import { Button, Flex } from "antd"
import { useCallback, useEffect } from "react"

const Viewer = () => {
    const addScript = () => {
        const oz = document.getElementById("OZViewer")
        oz!.CreateReportEx(
            "connection.servlet=http://10.4.18.92/training/server;connection.reportname=/input/Dịch vụ tài khoản/EXIMBANK Đề nghị kiêm hợp đồng sử dụng dịch vụ tài khoản thanh toán.ozr;global.concatpreview=false;viewer.createreport_doc_index=0;viewer.showtab=true;connection.displayname=Lệnh chuyển cũ;",
            ";"
        )
        //oz!.Script("showthumbnail")
        /*  const oz = document.getElementById("OZViewer")
        oz!.Script("showtab") */
        //console.log("Value", oz!.GetInformation("INPUT_JSON_ALL"))
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

const OzViewer = ({ url }: { url: string }) => {
    const cachedFn = useCallback(() => {
        if (window.start_ozjs) {
            console.log("Here i am")

            window.SetOZParamters_OZViewer = () => {
                const oz = document.getElementById("OZViewer")
                //oz!.sendToActionScript("viewer.showthumbnail", false)
                //oz!.sendToActionScript("viewer.emptyframe", "true")
                oz!.sendToActionScript("connection.servlet", url)
                oz!.sendToActionScript(
                    "connection.reportname",
                    "/input/Thẻ/BIDV.ozr"
                )

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
            window.start_ozjs("OZViewer", `http://10.4.18.92/html5viewer/`)
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
