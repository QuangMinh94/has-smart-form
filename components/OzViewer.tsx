"use client"

import delay from "delay"
import { reverse } from "lodash"
import { useCallback, useContext, useEffect } from "react"
import { ContextTemplate } from "./context/context"

const OzViewer = ({ viewerKey }: { viewerKey: number }) => {
    return <Viewer key={viewerKey} />
}

const Viewer = () => {
    const { listRight } = useContext(ContextTemplate)
    const reverseListRight: any[] = reverse(
        JSON.parse(JSON.stringify(listRight))
    )
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

            if (reverseListRight.length > 0) {
                let count = 0
                reverseListRight.forEach((element) => {
                    const oz = document.getElementById("OZViewer")
                    oz!.CreateReportEx(
                        DefaultParams(
                            process.env.NEXT_PUBLIC_EFORM_SERVER_APP!,
                            "/" + element.type + "/" + element.name,
                            element.name!
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
    inputJson: string = "",
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
    connection.inputjson=${inputJson};
    viewer.thumbnailsection_showclosebutton=true;
    information.debug=true;
    eform.signpad_zoom=50;
    eform.signpad_type=dialog;
    viewer.reportchangecommand=true;
    viewer.progresscommand=true;
    global.use_preview_progressbar=true;`
}

export default OzViewer
