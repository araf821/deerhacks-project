"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "../auth/LogoutButton";

interface NavLinksProps {}

const NavLinks = ({}: NavLinksProps) => {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-4 rounded-full bg-black px-2 py-1.5 font-medium text-white shadow-xl shadow-black/25 max-md:hidden">
      <li
        className={cn(
          " px-3",
          pathname.includes("dashboard") &&
            "rounded-full bg-orange-600 py-1.5 font-medium text-white",
        )}
      >
        <Link href="/dashboard">Dashboard</Link>
      </li>
      <li
        className={cn(
          " px-3",
          pathname.includes("study-group") &&
            "rounded-full bg-orange-600 py-1.5 font-medium text-white",
        )}
      >
        <Link href="/study-groups">Study Groups</Link>
      </li>
      <li
        className={cn(
          " px-3",
          pathname.includes("study-group") &&
            "rounded-full bg-orange-600 py-1.5 font-medium text-white",
        )}
      >
        <LogoutButton />
      </li>
    </ul>
  );
};

export default NavLinks;
