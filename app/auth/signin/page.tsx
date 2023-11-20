import { Spin } from "antd"
import dynamic from "next/dynamic"
const SigninForm = dynamic(() => import("./signInForm"), {
    loading: () => (
        <div
            style={{
                backgroundImage: `url(/img/background.png)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                //backgroundColor: "rgba(228, 240, 244, 1)",
                height: "100vh",
                width: "100vw",
                justifyContent: "center",
                alignItems: "center"
                //zIndex: 1
            }}
        >
            <center>
                <Spin />
            </center>
        </div>
    ),
    ssr: false
})

const SigninPage = () => {
    return <SigninForm />
}

export default SigninPage
