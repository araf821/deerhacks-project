"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  className?: String;
  children: React.ReactNode;
}

const BackButton = ({ className, children }: BackButtonProps) => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className={cn(className)}>
      {children}
    </button>
  );
};

export default BackButton;
