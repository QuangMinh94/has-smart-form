"use client"
import SignatureCanvas from "react-signature-canvas"
import React, { useRef } from "react"
import { Button } from "antd"
const Signature: React.FC = () => {
    const action = useRef<any>()

    return (
        <div>
            <Button
                onClick={() => {
                    action?.current?.clear()
                }}
            >
                {" "}
                clear
            </Button>
            <SignatureCanvas
                ref={(ref) => {
                    action.current = ref
                }}
                // onEnd={() => {
                //     console.log("toData", action?.current?.toData())
                //     console.log(
                //         "toDataURL",
                //         action?.current?.toDataURL("image/png")
                //     )

                //     console.log(" getCanvas", action?.current?.getCanvas())
                // }}
                canvasProps={{
                    width: 500,
                    height: 200,
                    className:
                        "border-neutral-950 cursor-pointer border-solid  rounded-md shadow-md"
                }}
            />
        </div>
    )
}
export default Signature
