import { useCookies } from "next-client-cookies"
const useCustomCookies = (): { token: string; session: string } => {
    const cookies = useCookies()
    return {
        token: cookies.get("token") ?? "",
        session: cookies.get("session") ?? ""
    }
}
export default useCustomCookies
