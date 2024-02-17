import { cn } from "@/lib/utils";
import Link from "next/link";
import NavLinks from "./NavLinks";

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  return (
    <nav className="fixed top-0 grid h-16 w-full place-items-center">
      <div className="flex w-full max-w-screen-xl items-center justify-between max-2xl:px-8">
        {/* TODO: Create the logo */}
        <p>Logo</p>

        {/* Desktop nav links */}
        <NavLinks />
      </div>
    </nav>
  );
};

export default Navbar;
