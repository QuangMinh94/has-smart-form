import "@/html5viewer/ui.dynatree.css"
import "@/public/css/jquery.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import QueryClientProvider from "./QueryClientProvider"
import AuthProvider from "./auth/Provider"
import AntdProvider from "./globalTheme"
import "./globals.css"

config.autoAddCss = false

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app"
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <QueryClientProvider>
                    <AuthProvider>
                        <AntdProvider>
                            {/*  <NavBar /> */}
                            <main>{children}</main>
                        </AntdProvider>
                    </AuthProvider>
                </QueryClientProvider>
            </body>
        </html>
    )
}
