import "@/public/css/jquery.css"
import "@/public/css/ui.dynatree.css"
import Script from "next/script"

const OzScript = () => {
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
                src="http://10.4.18.92/html5viewer/jquery.dynatree.js"
                // strategy="beforeInteractive"
            />
            <Script
                type="text/javascript"
                src="http://10.4.18.92/html5viewer/OZJSViewer.js"
                //strategy="beforeInteractive"
            />
            <Script
                type="text/javascript"
                src="http://10.4.18.92/html5viewer/pdf_js/web/compatibility.js"
                // strategy="beforeInteractive"
            />
            <Script
                type="text/javascript"
                src="http://10.4.18.92/html5viewer/pdf_js/build/pdf.js"
                // strategy="beforeInteractive"
            />
            <Script id={"ozScript"}>
                {`function OZCommand_OZViewer(code, args) {
                console.log('OzEvent',args);
            }`}
            </Script>
        </>
    )
}

export default OzScript
