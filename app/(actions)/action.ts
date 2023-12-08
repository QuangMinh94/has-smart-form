"use server"

import { revalidateTag } from "next/cache"

export const RevalidateListUser = async () => {
    revalidateTag("ListUser")
}
export const RevalidateListDepartment = async () => {
    revalidateTag("ListDepartmentr")
}
export const RevalidateMyworkTeller = async () => {
    revalidateTag("MyworkTeller")
}
