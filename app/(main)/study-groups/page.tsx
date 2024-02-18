import StudyGroupCoursePicker from "@/components/StudyGroupCoursePicker";
import { port } from "@/lib/font";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const StudyGroupsPage = () => {
  return (
    <div className="mx-auto w-full max-w-screen-xl py-12 max-2xl:px-4">
      <div className="relative aspect-video w-full rounded-2xl shadow-[0_0_12px] shadow-black/35 md:aspect-[24/9]">
        <Image
          alt="dashboard"
          src="/cat-group.webp"
          fill
          sizes="(max-width: 768px) 100vw, 75vw"
          className="rounded-2xl object-cover"
        />
        <div className="absolute left-0 top-0 rounded-br-xl rounded-tl-xl bg-black/30 p-2 backdrop-blur-md md:p-4">
          <p
            className={cn(
              "text-2xl text-white drop-shadow-2xl sm:text-3xl md:text-4xl lg:text-5xl",
              port.className,
            )}
          >
            Study Groups
          </p>
          <p className="mt-2 text-zinc-200 max-md:text-sm lg:text-lg">
            Find others to study with!
          </p>
        </div>
      </div>

      <StudyGroupCoursePicker />
    </div>
  );
};

export default StudyGroupsPage;
