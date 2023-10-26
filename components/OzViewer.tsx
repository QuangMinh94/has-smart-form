"use client"

import delay from "delay"
import { useCallback, useContext, useEffect } from "react"
import { ContextTemplate } from "./context/context"

const OzViewer = ({ viewerKey }: { viewerKey: number }) => {
    return <Viewer key={viewerKey} />
}

const Viewer = () => {
    const { formData } = useContext(ContextTemplate)
    const cachedFn = useCallback(async () => {
        if (window.start_ozjs) {
            console.log("Here i am with", formData)
            const formdata = formData[0]

            window.SetOZParamters_OZViewer = () => {
                const oz = document.getElementById("OZViewer")
                oz!.sendToActionScript("viewer.emptyframe", "true")
            }

            window.start_ozjs(
                "OZViewer",
                `${process.env.NEXT_PUBLIC_EFORM_SERVER}/html5viewer/`
            )

            await delay(2000)

            if (formData.length > 0) {
                formdata.block!.forEach((element) => {
                    const oz = document.getElementById("OZViewer")
                    oz!.CreateReportEx(
                        DefaultParams(
                            process.env.NEXT_PUBLIC_EFORM_SERVER_APP!,
                            "/" + element.ozrRepository + "/" + element.name,
                            element.name!
                        ),
                        ";"
                    )
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

const DefaultParams = (
    url: string,
    reportName: string,
    displayname: string
) => {
    return `connection.servlet=${url};
connection.reportname=${reportName};
global.concatthumbnail=true;
connection.refreshperiod=1;
viewer.createreport_doc_index=0;
    global.concatpreview=false;
    viewer.showtab=true;
    connection.displayname=${displayname};
    viewer.thumbnailsection_showclosebutton=true;`
}

export default OzViewer
