"use client";

import { Actions } from "@/components/actions";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useRenameModel } from "@/store/use-rename-model";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

interface InforProps {
  boardId: string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const TabSeparator = () => {
  return (
    <div className="w-px h-6 bg-neutral-300 mx-2" />
  );
};

export const Info = ({ boardId }: InforProps) => {
  const { onOpen } = useRenameModel();

  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  if (!data) return <InfoSkeleton />;

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md flex p-1.5 items-center shadow-md">
      <Hint label="Go to boards" side="bottom">
        <Button asChild variant="board" className="p-2">
          <Link href="/">
            <Image src="/logo.svg" alt="Board Logo" width={40} height={40} />
            <span
              className={cn(
                "font-semibold text-xl ml-1 text-black",
                font.className,
              )}
            >
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Rename" side="bottom">
        <Button
          variant="board"
          className="cursor-pointer p-2 text-base font-normal"
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions id={data._id} title={data.title} side="bottom" sideOffset={8}>
        <div>
          <Hint label="Main menu" side="bottom">
            <Button size="icon" variant="board">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-11 items-center shadow-md w-[300px]" />
  );
};
