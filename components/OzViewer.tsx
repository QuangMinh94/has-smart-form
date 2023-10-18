"use client"

import { Button } from "antd"
import { useCallback, useContext, useEffect } from "react"
import { contextBLockInput } from "./context/templateContext"

const Viewer = () => {
    const { choosenBlock } = useContext(contextBLockInput)
    const addScript = () => {
        /*  const oz = document.getElementById("OZviewer")
        oz!.CreateReportEx(
            "connection.servlet=http://10.4.18.92/training/server;connection.reportname=/input/Thẻ/Lệnh chuyển tiền.ozr;viewer.showthumbnail=true;global.concatthumbnail=true;global.concatpreview=false;viewer.showtree=true;viewer.createreport_doc_index=0;viewer.showtab=true;connection.displayname=Lệnh chuyển mới;viewer.thumbnailsection_showclosebutton=true",
            ";"
        ) */
    }
    useEffect(() => {
        console.log("New block", choosenBlock)
        /* const oz = document.getElementById("OZviewer")
        let params = "connection.reportname=/input/Thẻ/BIDV.ozr;"
        params += "connection.servlet=http://10.4.18.92/training/server;"
        params += DefaultParams
        oz!.CreateReportEx(params, ";") */
    }, [choosenBlock.changeBlock])
    return (
        <>
            <div
                id="OZviewer"
                style={{
                    width: "100%",
                    height: "90vh"
                    //marginTop: 60
                }}
            />
            <Button type="primary" onClick={addScript}>
                Click to add form
            </Button>
        </>
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
                    `/input/Thẻ/BIDV.ozr`
                )
                //oz!.sendToActionScript("viewer.showthumbnail", `true`)
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
                )
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
