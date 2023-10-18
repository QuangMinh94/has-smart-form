import { Suspense } from "react"
import Loading from "./loading"

const MyWork = () => {
    return (
        <Suspense fallback={<Loading/>}>
           <div style={{color:"black"}}>myword</div>
        </Suspense>
    )
}

export default MyWork
