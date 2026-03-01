"use client";

import { Hint } from "@/components/hint";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import { Plus } from "lucide-react";

export const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square mt-4">
          <Hint label="Create organization" side="right" align="center">
            <button className=" bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
              <Plus className="text-white"></Plus>
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[480px] flex flex-col items-center justify-center ">
        <DialogTitle className="text-center">
          Create a new organization
        </DialogTitle>
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
};
