import CustomSpin from "@/components/CustomSpin"
import dynamic from "next/dynamic"
const SigninForm = dynamic(() => import("./signInForm"), {
    loading: () => <CustomSpin />,
    ssr: false
})

const SigninPage = () => {
    return <SigninForm />
}

export default SigninPage
