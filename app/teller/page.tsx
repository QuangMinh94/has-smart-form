import routers from "@/router/cusTomRouter"
import { redirect } from "next/navigation"
const BUPage = () => {
    redirect(routers.mywork.path)
    // return (
    //     <div className="inser" style={{ color: "red" }}>
    //         err page
    //     </div>
    // )
}

export default BUPage
