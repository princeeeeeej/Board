"use client"

import { ReactNode } from "react"
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";

interface RoomProps{
    children : ReactNode
    roomId: string
    fallback: ReactNode
}


export const Room = ({children, roomId, fallback} : RoomProps) => {
    return (
        <RoomProvider id={roomId} initialPresence={{}}>
            <ClientSideSuspense fallback={fallback}>
                {() => children}
            </ClientSideSuspense>
        </RoomProvider>
    )
}