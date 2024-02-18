import { port } from "@/lib/font";
import { cn } from "@/lib/utils";
import Image from "next/image";
import UserDashboard from "./_components/UserDashboard";
import Loader from "@/components/Loader";
import { Suspense } from "react";

const DashboardPage = () => {
  return (
    <div className="mx-auto w-full max-w-screen-xl py-12 max-2xl:px-4">
      <div className="relative aspect-video w-full rounded-2xl shadow-[0_0_12px] shadow-black/50 md:aspect-[24/9]">
        <Image
          alt="dashboard"
          src="/cat-medi.svg"
          fill
          priority
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
            Dashboard
          </p>
        </div>
      </div>

      <Suspense fallback={<Loader />}>
        <UserDashboard />
      </Suspense>
    </div>
  );
};
export default DashboardPage;
