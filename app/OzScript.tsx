import "@/public/css/jquery.css"
import "@/public/css/ui.dynatree.css"
import Script from "next/script"

const OzScript = () => {
    const url = process.env.EFORM_SERVER
    return (
        <>
            <Script
                src="https://code.jquery.com/jquery-2.0.3.min.js"
                //strategy="beforeInteractive"
            />
            <Script
                src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
                //strategy="beforeInteractive"
            />

            <Script
                type="text/javascript"
                src={url + "/html5viewer/jquery.dynatree.js"}
                // strategy="beforeInteractive"
            />
            <Script
                type="text/javascript"
                src={url + "/html5viewer/OZJSViewer.js"}
                //strategy="beforeInteractive"
            />
            <Script
                type="text/javascript"
                src={url + "/html5viewer/pdf_js/web/compatibility.js"}
                // strategy="beforeInteractive"
            />
            <Script
                type="text/javascript"
                src={url + "/html5viewer/pdf_js/build/pdf.js"}
                // strategy="beforeInteractive"
            />
            <Script id={"ozScript"}>
                {`function OZReportChangeCommand_OZViewer(docindex) {
                    console.log('DocinDex',docindex);
                }
                function OZProgressCommand_OZViewer(step,state,reportname) {
                    const input = document.getElementById("disableInput");
                    if(input){
                        console.log('Yes');
                    if(step === "4" && state === "2"){
                        const oz = document.getElementById("OZViewer");
                        oz.Script("disable_input_all")
                    }
                    }
                    else{
                        console.log('Got it');
                    }
                }
                 function OZErrorCommand_OZViewer(code, message, detailmessage, reportname) {
                     console.log("ErrorCode",code);
                     console.log("ErrorMessage",message);
                     console.log("DetailMessage",detailmessage);
                     console.log("At report",reportname);
                    }
                `}
            </Script>
        </>
    )
}

export default OzScript
