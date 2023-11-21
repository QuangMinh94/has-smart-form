import theme from "@/theme/themeConfig"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { ConfigProvider } from "antd"
import type { Metadata } from "next"
import { PublicEnvProvider } from "next-runtime-env"
import { inter } from "./(utilities)/Fonts"
import OzScript from "./OzScript"
import QueryClientProvider from "./QueryClientProvider"
import AuthProvider from "./auth/Provider"
import AntdProvider from "./globalTheme"

import Layout from "./clientLayout"
import "./globals.css"

config.autoAddCss = false

export const metadata: Metadata = {
    title: "Form Governance",
    description: "Form Governance by HPT"
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <OzScript />
            <body className={inter.className}>
                <PublicEnvProvider>
                    <QueryClientProvider>
                        <AuthProvider>
                            <ConfigProvider theme={theme}>
                                <AntdProvider>
                                    {/* <main>{children}</main> */}
                                    <Layout>{children}</Layout>
                                </AntdProvider>
                            </ConfigProvider>
                        </AuthProvider>
                    </QueryClientProvider>
                </PublicEnvProvider>
            </body>
        </html>
    )
}
