"use client"
import { signOut, useSession } from "next-auth/react"
import React, { useEffect } from "react"
import { useIdleTimer } from "react-idle-timer"

export default function Layout({ children }: { children: React.ReactNode }) {
    const { data: session, status, update } = useSession()
    const CHECK_SESSION_EXP_TIME = 300000 // 5 mins
    const SESSION_IDLE_TIME = 300000 // 5 mins
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

    const onUserIdle = () => {
        console.log("IDLE")
    }

    const onUserActive = () => {
        console.log("ACTIVE")
    }

    const { isIdle } = useIdleTimer({
        onIdle: onUserIdle,
        onActive: onUserActive,
        timeout: SESSION_IDLE_TIME, //milliseconds
        throttle: 500
    })

    useEffect(() => {
        const checkUserSession = setInterval(() => {
            const expiresTimeTimestamp = Math.floor(
                new Date(session?.expires || "").getTime()
            )
            const currentTimestamp = Date.now()
            const timeRemaining = expiresTimeTimestamp - currentTimestamp

            // If the user session will expire before the next session check
            // and the user is not idle, then we want to refresh the session
            // on the client and request a token refresh on the backend
            if (!isIdle() && timeRemaining < CHECK_SESSION_EXP_TIME) {
                update() // extend the client session

                // request refresh of backend token here
            } else if (timeRemaining < 0) {
                // session has expired, logout the user and display session expiration message
                signOut({
                    callbackUrl: BASE_URL + "/login?error=SessionExpired"
                })
            }
        }, CHECK_SESSION_EXP_TIME)

        return () => {
            clearInterval(checkUserSession)
        }
    }, [update])
    return <main>{children}</main>
}
