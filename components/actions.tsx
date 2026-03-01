"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { Link2, Pencil, Trash2 } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { toast } from "sonner";
import { ConfirmModel } from "./confirm-model";
import { Button } from "./ui/button";
import { useRenameModel } from "@/store/use-rename-model";

type DropdownMenuContentProps =
  ComponentPropsWithoutRef<typeof DropdownMenuContent>;

interface ActionsProps{
    children: React.ReactNode
    side?: DropdownMenuContentProps["side"]
    sideOffset?: DropdownMenuContentProps["sideOffset"]
    id: string
    title: string
}

export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title
} : ActionsProps) => {

    const {mutate, pending} = useApiMutation(api.board.remove)
    const { onOpen} = useRenameModel()

    const onDelete = () => {
        mutate({id})
          .then(() => toast.success("Board deleted"))
          .catch(() => toast.error("Failed to delete board"))
    }

    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`
        )
          .then(() => toast.success("Link copied"))
          .catch(() => toast.error("Failed to copy link"))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent side={side} onClick={(e) => e.stopPropagation()} sideOffset={sideOffset} className="w-50">
                <DropdownMenuItem onClick={onCopyLink} className="p-2 cursor-pointer">
                    <Link2 className="h-4 w-4 ml-2"/>
                    Copy board link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onOpen(id, title)} className="p-2 cursor-pointer">
                    <Pencil className="h-4 w-4 ml-2"/>
                    Rename
                </DropdownMenuItem>
                <ConfirmModel
                  header="Delete board?"
                  description="This will delete the board and all of its contents."
                  disabled={pending}
                  onConfirm={onDelete}>
                    <Button className="p-0 justify-start cursor-pointer text-sm w-full font-normal" variant="ghost">
                        <Trash2 className="w-4 h-4 ml-1"/>Delete
                    </Button>
                </ConfirmModel>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}