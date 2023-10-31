import axios from "axios"
import { cookies } from "next/headers"

import TemlateWrapper from "@/app/teller/(components)/mywork/Detail/TeamplateWrapper"
import { EformList } from "@/app/(types)/EformList"

const GetEformList = async (): Promise<EformList[]> => {
    const cookie = cookies()

    const response = await axios.post(
        process.env.NEXT_PUBLIC_EFORM_LIST!,
        {
            repository: "input"
        },
        {
            headers: {
                Authorization: "Bearer " + cookie.get("token")?.value,
                Session: cookie.get("session")?.value
            }
        }
    )
    return response.data
}
const DetailMyWork = async ({ params }: { params: { id: string } }) => {
    const data = await GetEformList()
    console.log(data)
    return (
      
            <TemlateWrapper />
       
    )
}

export default DetailMyWork
