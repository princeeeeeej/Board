"use client";

import { ReactNode } from "react";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "@/types/canvas";

interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: ReactNode;
}

export const Room = ({ children, roomId, fallback }: RoomProps) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{ cursor: null, selection: [], pencilDraft: null, pencilColor: null }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layersIds: new LiveList<string>([]),
      }}
    >
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};
