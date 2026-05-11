"use client";

import { Button } from "../../../components/ui/button";
import {
  // TasbihIcon,
  DuaIcon,
  DatesIcon,
  // AlAqsaMosqueIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Landmark } from "./landmark";
import { usePathname } from "next/navigation";
import { Menu } from "./menu";
import { isActiveHref } from "@/lib/path";

export interface LinkType {
  name: string;
  href: string;
  icon: IconSvgElement;
}

const links: LinkType[] = [
  {
    name: "Ruqyah Mandiri",
    href: "/ruqyah-mandiri",
    icon: DatesIcon,
  },
  // {
  //   name: "Dzikir Pagi & Petang",
  //   href: "/dzikir-pagi-petang",
  //   icon: TasbihIcon,
  // },
  {
    name: "Doa Harian",
    href: "/doa-harian",
    icon: DuaIcon,
  },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b">
      <Landmark />
      <div className="md:flex hidden">
        {links.map((link, id) => (
          <Button
            variant={isActiveHref(link.href, pathname) ? "default" : "link"}
            key={id}
            asChild
          >
            <Link href={link.href} className="dark:text-white">
              <HugeiconsIcon icon={link.icon} /> {link.name}
            </Link>
          </Button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <div className="md:hidden block">
          <Menu links={links} />
        </div>
      </div>
    </div>
  );
}
