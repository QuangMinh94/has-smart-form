import Script from "next/script"

const OzScript = () => {
    return (
        <>
            <Script src="https://code.jquery.com/jquery-2.0.3.min.js" />
            {/*   <link
                rel="stylesheet"
                href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css"
                type="text/css"
            /> */}
            <Script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" />
            {/*   <link
                rel="stylesheet"
                href="/html5viewer/ui.dynatree.css"
                type="text/css"
            /> */}
            <Script
                type="text/javascript"
                src="/html5viewer/jquery.dynatree.js"
                //charset="utf-8"
            />
            <Script
                type="text/javascript"
                src="/html5viewer/OZJSViewer.js"
                //charset="utf-8"
            />
            <Script
                type="text/javascript"
                src="/html5viewer/pdf_js/web/compatibility.js"
            />
            <Script
                type="text/javascript"
                src="/html5viewer/pdf_js/build/pdf.js"
            />
        </>
    )
}

export default OzScript
