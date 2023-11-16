"use client"

import delay from "delay"
import { reverse } from "lodash"
import { useEnvContext } from "next-runtime-env"
import { useCallback, useContext, useEffect } from "react"
import { ContextTemplate } from "./context/context"

const OzViewer = ({ viewerKey }: { viewerKey: number }) => {
    return <Viewer key={viewerKey} />
}

const Viewer = () => {
    const { NEXT_PUBLIC_EFORM_SERVER, NEXT_PUBLIC_EFORM_SERVER_APP } =
        useEnvContext()
    const { listRight } = useContext(ContextTemplate)
    const reverseListRight: any[] = reverse(
        JSON.parse(JSON.stringify(listRight))
    )
    const cachedFn = useCallback(async () => {
        if (window.start_ozjs) {
            window.SetOZParamters_OZViewer = () => {
                const oz = document.getElementById("OZViewer")
                oz!.sendToActionScript("viewer.emptyframe", "true")
                oz!.sendToActionScript("viewer.errorcommand", "true")
                //oz!.sendToActionScript("eform.signpad_type", "dialog")
            }

            window.start_ozjs(
                "OZViewer",
                `${NEXT_PUBLIC_EFORM_SERVER}/html5viewer/`
            )

            await delay(3000)

            if (reverseListRight.length > 0) {
                let count = 0
                reverseListRight.forEach((element) => {
                    const oz = document.getElementById("OZViewer")
                    oz!.CreateReportEx(
                        DefaultParams(
                            NEXT_PUBLIC_EFORM_SERVER_APP!,
                            "/" + element.type + "/" + element.name,
                            element.name!,
                            OzDelimiter()
                        ),
                        OzDelimiter()
                    )
                    count++
                })
            } else {
                console.log("Wut")
            }
        }
    }, [])

    useEffect(() => {
        if (window) {
            cachedFn()
        }
    }, [cachedFn])

    return (
        <div className="container mx-auto">
            <div
                id="OZViewer"
                style={{
                    width: "100%",
                    height: "80vh"
                    //marginTop: 60
                }}
            />
        </div>
    )
}

export const DefaultParams = (
    url: string,
    reportName: string,
    displayname: string,
    delimiter: string,
    inputJson: string = "",
    index: string = "0"
) => {
    return `connection.servlet=${url}${delimiter}
connection.reportname=${reportName}${delimiter}
global.concatthumbnail=true${delimiter}
connection.refreshperiod=1${delimiter}
viewer.createreport_doc_index=${index}${delimiter}
    global.concatpreview=false${delimiter}
    viewer.showtab=true${delimiter}
    connection.displayname=${displayname}${delimiter}
    connection.inputjson=${inputJson}${delimiter}
    viewer.thumbnailsection_showclosebutton=true${delimiter}
    information.debug=true${delimiter}
    eform.signpad_zoom=50${delimiter}
    eform.signpad_type=dialog${delimiter}
    viewer.reportchangecommand=true${delimiter}
    viewer.progresscommand=true${delimiter}
    global.use_preview_progressbar=true${delimiter}
    viewer.errorcommand=true${delimiter}`
}

export const OzDelimiter = () => {
    return "==OZDelimiter=="
}

export default OzViewer
