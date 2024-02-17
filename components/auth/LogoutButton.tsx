"use client";

import { signOut } from "next-auth/react";

interface LogoutButtonProps {
  className?: string;
}

const LogoutButton = ({ className }: LogoutButtonProps) => {
  return (
    <button onClick={() => signOut()} className={className}>
      Logout
    </button>
  );
};

export default LogoutButton;
