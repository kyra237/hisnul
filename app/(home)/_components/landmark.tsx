import { RubElHizbIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export function Landmark() {
  return (
    <Link href="/">
      <div className="flex items-center gap-2">
        <HugeiconsIcon
          icon={RubElHizbIcon}
          className="dark:text-white text-primary"
        />
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Hisnul
        </h4>
      </div>
    </Link>
  );
}
