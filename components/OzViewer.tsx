"use client"

import { useCallback, useEffect } from "react"

const OzViewer = () => {
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

    return <Viewer />
}

const Viewer = () => {
    return (
        <div
            id="OZViewer"
            style={{
                width: "100%",
                height: "90vh"
                //marginTop: 60
            }}
        />
    )
}

export default OzViewer
