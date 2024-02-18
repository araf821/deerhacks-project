"use client";

import { cn } from "@/lib/utils";
import { RiseLoader } from "react-spinners";

interface LoaderProps {
  className?: string;
}

const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={cn("mx-auto w-fit py-28", className)}>
      <RiseLoader
        aria-label="Loading Spinner"
        loading={true}
        speedMultiplier={1}
        className="w-fit"
      />
    </div>
  );
};

export default Loader;
