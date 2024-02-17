import { port } from "@/lib/font";
import { cn } from "@/lib/utils";
import Image from "next/image";
import UserDashboard from "./_components/UserDashboard";

const DashboardPage = () => {
  return (
    <div className="mx-auto w-full max-w-screen-xl py-12 max-2xl:px-4">
      <div className="relative aspect-video w-full rounded-2xl shadow-[0_0_12px] shadow-black/35 md:aspect-[24/9]">
        <Image
          alt="dashboard"
          src="/cat-medi.svg"
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
            Dashboard
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:gap-12">
        <UserDashboard />
      </div>
    </div>
  );
};
export default DashboardPage;
