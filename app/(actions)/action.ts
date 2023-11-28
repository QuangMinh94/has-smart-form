"use server"

import { revalidateTag } from "next/cache"

export const RevalidateListUser = async () => {
    revalidateTag("ListUser")
}
