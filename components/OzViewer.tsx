"use client"

import delay from "delay"
import { useCallback, useContext, useEffect } from "react"
import { ContextTemplate } from "./context/context"

const OzViewer = ({ viewerKey }: { viewerKey: number }) => {
    return <Viewer key={viewerKey} />
}

const Viewer = () => {
    const { listRight } = useContext(ContextTemplate)
    const cachedFn = useCallback(async () => {
        if (window.start_ozjs) {
            window.SetOZParamters_OZViewer = () => {
                const oz = document.getElementById("OZViewer")
                oz!.sendToActionScript("viewer.emptyframe", "true")
                //oz!.sendToActionScript("eform.signpad_type", "dialog")
            }

            window.start_ozjs(
                "OZViewer",
                `${process.env.NEXT_PUBLIC_EFORM_SERVER}/html5viewer/`
            )

            await delay(3000)

            if (listRight.length > 0) {
                let count = 0
                listRight.forEach((element) => {
                    const oz = document.getElementById("OZViewer")
                    oz!.CreateReportEx(
                        DefaultParams(
                            process.env.NEXT_PUBLIC_EFORM_SERVER_APP!,
                            "/" + element.type + "/" + element.name,
                            element.name!,
                            count.toString()
                        ),
                        ";"
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
    index: string = "0"
) => {
    return `connection.servlet=${url};
connection.reportname=${reportName};
global.concatthumbnail=true;
connection.refreshperiod=1;
viewer.createreport_doc_index=${index};
    global.concatpreview=false;
    viewer.showtab=true;
    connection.displayname=${displayname};
    viewer.thumbnailsection_showclosebutton=true;
    information.debug=true;
    eform.signpad_zoom=50;
    eform.signpad_type=dialog;
    viewer.reportchangecommand=true;`
}

export default OzViewer
