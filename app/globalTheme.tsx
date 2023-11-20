"use client"

import type Entity from "@ant-design/cssinjs/es/Cache"
import { useServerInsertedHTML } from "next/navigation"
import { useMemo, useRef } from "react"

import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs"

const AntdProvider = ({ children }: React.PropsWithChildren) => {
    const cache = useMemo<Entity>(() => createCache(), [])
    const isServerInserted = useRef<boolean>(false)
    useServerInsertedHTML(() => {
        // avoid duplicate css insert
        if (isServerInserted.current) {
            return
        }
        isServerInserted.current = true
        return (
            <style
                id="antd"
                dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
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
