"use client";

import { Hint } from "@/components/hint";
import { cn } from "@/lib/utils";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";

interface ItemsProps {
  id: string;
  name: string;
  imageUrl: string;
}

export const Item = ({ id, name, imageUrl }: ItemsProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) return;

    setActive({ organization: id });
  };

  return (
    <div className="aspect-square relative">
      <Hint label={name} side="right" align="center">
        <Image
          src={imageUrl}
          alt={name}
          fill
          onClick={onClick}
          className={cn(
            "rounded-md opacity-50 cursor-pointer hover:opacity-100 tranistion",
            isActive && "opacity-100",
          )}
        />
      </Hint>
    </div>
  );
};
