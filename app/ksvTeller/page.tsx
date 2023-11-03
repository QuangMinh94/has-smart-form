import routers from "@/router/cusTomRouter"
import { redirect } from "next/navigation"
const KsvTellerPage = () => {
    redirect(routers("ksvTeller").mywork.path)
}

export default KsvTellerPage
