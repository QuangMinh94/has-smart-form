"use client"

import { useServerInsertedHTML } from "next/navigation"
import { PropsWithChildren, useState } from "react"

import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs"

const AntdProvider = ({ children }: PropsWithChildren) => {
    const [cache] = useState(() => createCache())

    useServerInsertedHTML(() => {
        return (
            <script
                dangerouslySetInnerHTML={{
                    __html: `</script>${extractStyle(cache)}<script>`
                }}
            />
        )
    })

    return (
        <StyleProvider hashPriority="high" cache={cache}>
            {children}
        </StyleProvider>
    )
}

export default AntdProvider
