"use client";

import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import NewGuest from "./NewGuest-component";
import useGuestStore from "@/store/useGuestStore";
import { useToast } from "@/components/ui/use-toast";

export default function GuestMenuBar({ createGuest }: any) {
  const { toast } = useToast();
  return (
    <Menubar className="w-full border-none flex items-center justify-between pr-4">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer hover:bg-secondary">
          Actions
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem className="cursor-pointer">Send invites</MenubarItem>
          <MenubarItem className="cursor-pointer">Ask confirmation</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <NewGuest />
    </Menubar>
  );
}
