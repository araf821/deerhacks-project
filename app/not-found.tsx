"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="grid h-full place-items-center bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-200 via-red-500 to-fuchsia-500 px-4 sm:px-8">
      <div className="w-full max-w-lg rounded-xl border-2 border-yellow-400 bg-yellow-200/50 p-4 md:p-8">
        <h2 className="text-center text-2xl font-medium text-yellow-800 md:text-3xl lg:text-4xl">
          Resource Not Found
        </h2>
        <p className="mt-2 text-center text-yellow-600">
          Sorry :(( we didn&rsquo;t have time to test everything out.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 max-sm:flex-col sm:gap-4 md:gap-8">
          <Button
            onClick={() => router.refresh()}
            className="w-full"
            variant="link"
          >
            Retry
          </Button>
          <Button onClick={() => router.push("/")} className="w-full">
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
