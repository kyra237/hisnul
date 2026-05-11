"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MenuIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { LinkType } from "./navbar";
import { isActiveHref } from "@/lib/path";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface MenuProps {
  links: LinkType[];
}

export function Menu({ links }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button size="icon">
          <HugeiconsIcon icon={MenuIcon} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
        <DrawerHeader>
          <DrawerTitle>Menu Utama</DrawerTitle>
          <DrawerDescription>
            Pilih fitur untuk membaca Al-Qur’an, ruqyah mandiri, dzikir pagi &
            petang, serta doa harian yang dapat diamalkan setiap hari.
          </DrawerDescription>
        </DrawerHeader>
        <div className="no-scrollbar overflow-y-auto px-4 flex flex-col gap-2">
          {links.map((link, index) => (
            <Button
              variant={
                isActiveHref(link.href, pathname) ? "default" : "outline"
              }
              key={index}
              onClick={() => {
                router.push(link.href);
                setIsOpen(false);
              }}
            >
              <HugeiconsIcon icon={link.icon} /> {link.name}
            </Button>
          ))}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Tutup</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
