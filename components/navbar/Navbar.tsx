import { cn } from "@/lib/utils";
import NavLinks from "./NavLinks";
import { port } from "@/lib/font";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MenuSquare } from "lucide-react";

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  return (
    <nav className="fixed top-0 z-10 grid h-16 w-full place-items-center shadow-lg backdrop-blur-sm">
      <div className="flex w-full max-w-screen-xl items-center justify-between max-2xl:px-8">
        {/* TODO: Create the logo */}
        <Link href={"/"} className={cn("text-4xl font-bold", port.className)}>
          EduMates
        </Link>

        {/* Desktop nav links */}
        <NavLinks />

        <DropdownMenu>
          <DropdownMenuTrigger className="md:hidden" asChild>
            <button>
              <MenuSquare className="h-8 w-8" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href="/courses">Courses</Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href="/study-groups">Study Groups</Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href="/teacher-search">Search for Teachers</Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href="/learner-search">Search for Learners</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
