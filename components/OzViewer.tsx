"use client"

import { useEffect } from "react"

const Viewer = () => {
    return (
        <div
            id="OZviewer"
            style={{
                width: "99%",
                height: "93vh",
                marginTop: 60
            }}
        ></div>
    )
}

const OzViewer = () => {
    useEffect(() => {
        window.SetOZParamters_OZviewer = () => {
            const oz = document.getElementById("OZviewer")
            oz!.sendToActionScript(
                "connection.servlet",
                `http://10.4.18.92/traning/server`
            )
            oz!.sendToActionScript(
                "connection.reportname",
                `/input/Thẻ/BIDV.ozr`
            )
        }
        //window.start_ozjs("OZviewer", `/html5viewer/`)
    }, [])
    return <Viewer />
}

/* class Viewer extends React.Component {
    submit = () => {
        if (
            window.OZviewer.GetInformation("INPUT_CHECK_VALIDITY") === "valid"
        ) {
            const input = window.OZviewer.GetInformation("INPUT_JSON_ALL")
            alert(input)
            this.props.close()
        }
    }

    componentDidMount() {
        window.SetOZParamters_OZviewer = () => {
            const oz = document.getElementById("OZviewer")
            oz.sendToActionScript("connection.servlet", `/oz/server`)
            oz.sendToActionScript(
                "connection.reportname",
                `/edu/eformdev/customer-submit.ozr`
            )
        }
        window.start_ozjs("OZviewer", `/html5viewer/`)
    }

    render() {
        const { classes } = this.props

        return (
            <>
                <OZviewer />
            </>
        )
    }
} */

export default OzViewer
