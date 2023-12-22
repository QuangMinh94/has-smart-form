"use client"

import { theme } from "antd"
import delay from "delay"
import { reverse } from "lodash"
import { useEnvContext } from "next-runtime-env"
import { useCallback, useContext, useEffect, useRef } from "react"
import LoadingBar from "react-top-loading-bar"
import { ContextTemplate } from "./context/context"

const OzViewer = ({
    viewerKey,
    ozParams
}: {
    viewerKey: number
    ozParams?: string
}) => {
    return <Viewer key={viewerKey} ozParams={ozParams} />
}

const Viewer = ({ ozParams }: { ozParams?: string }) => {
    const ref = useRef<any>(null)
    const { NEXT_PUBLIC_EFORM_SERVER, NEXT_PUBLIC_EFORM_SERVER_APP } =
        useEnvContext()
    const { listRight } = useContext(ContextTemplate)
    const reverseListRight: any[] = reverse(
        JSON.parse(JSON.stringify(listRight))
    )
    const {
        token: { colorPrimary }
    } = theme.useToken()

    const cachedFn = useCallback(async () => {
        if (window.start_ozjs) {
            ref.current.continuousStart()
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
                            element.name!.toString().replace(".ozr", ""),
                            OzDelimiter()
                        ) + ozParams,
                        OzDelimiter()
                    )

                    count++
                })
            } else {
                console.log("Wut")
            }
            if (ref && ref.current) {
                ref.current.complete()
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
            <LoadingBar color={colorPrimary} ref={ref} />
            <div
                id="OZViewer"
                style={{
                    width: "100%",
                    height: "80vh",
                    //marginTop: 60
                    display: "flex",
                    flexDirection: "column",
                    position: "relative"
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
connection.compressedForm=true${delimiter}
global.concatthumbnail=true${delimiter}
connection.refreshperiod=1${delimiter}
viewer.createreport_doc_index=${index}${delimiter}
viewer.thumbnailsection_makerule=byreport${delimiter}
viewer.thumbnailsection_showclosebutton=true${delimiter}
    global.concatpreview=false${delimiter}
    viewer.showtab=true${delimiter}
    connection.displayname=${displayname}${delimiter}
    connection.inputjson=${inputJson}${delimiter}
    information.debug=true${delimiter}
    eform.signpad_type=dialog${delimiter}
    eform.inputeventcommand=true${delimiter}
    viewer.reportchangecommand=true${delimiter}
    viewer.progresscommand=true${delimiter}
    viewer.errorcommand=true${delimiter}
    viewer.useprogressbar=false${delimiter}`
}

export const KSVParams = (isKSV: boolean, delimiter: string) => {
    return `connection.pcount=1${delimiter}
            connection.args1=isKSV=${isKSV}${delimiter}`
}

//eform.signpad_zoom=50${delimiter}
//global.use_preview_progressbar=true${delimiter}
//viewer.useprogressbar=false${delimiter}

export const OzDelimiter = () => {
    return "==OZDelimiter=="
}

export default OzViewer
