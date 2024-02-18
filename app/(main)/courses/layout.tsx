import OtherCoursesSidebar from "@/components/OtherCoursesSidebar";
import { port } from "@/lib/font";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface layoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: layoutProps) => {
  return (
    <div className="mx-auto w-full max-w-screen-xl py-12 max-2xl:px-4">
      <div className="relative aspect-video w-full rounded-2xl shadow-[0_0_12px] shadow-black/50 md:aspect-[24/9]">
        <Image
          alt="dashboard"
          src="/cat-grad.webp"
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
            Courses
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2 md:gap-8 lg:mt-10 lg:grid-cols-3">
        <OtherCoursesSidebar directory={"courses"} />

        <div className="lg:col-span-2">{children}</div>
      </div>
    </div>
  );
};

export default layout;
