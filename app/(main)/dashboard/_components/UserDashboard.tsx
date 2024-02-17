import { auth } from "@/auth";
import { db } from "@/lib/db";
import { port } from "@/lib/font";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import UserCourses from "./UserCourses";

interface UserDashboardProps {}

const UserDashboard = async ({}: UserDashboardProps) => {
  const session = await auth();
  const user = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    },
    include: {
      courses: true,
      socialLinks: true,
    },
  });

  if (!user) {
    return null;
  }

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-8 md:grid-cols-3 md:gap-8 lg:gap-12">
      <div className="col-span-1 space-y-4">
        <div className="rounded-xl bg-[#1e1e1e] px-4 py-6 md:px-6 md:py-10">
          <div className="relative mx-auto aspect-square w-32 rounded-full border-2 border-white">
            <Image
              alt="user profile picture"
              src={user.imageUrl}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="mt-4">
            <p
              className={cn(
                "text-xl text-white md:text-2xl lg:text-3xl",
                port.className,
              )}
            >
              {user.name}
            </p>
            <p
              className={cn(
                "text-zinc-500 md:text-lg lg:text-xl",
                port.className,
              )}
            >
              {user.school}
            </p>
            <hr className="mt-2 border-t-2 border-zinc-800" />
            <p className="mt-4 text-zinc-200">
              {user.bio || "Start writing about yourself..."}
            </p>
          </div>
        </div>
        <div className="rounded-xl bg-[#1e1e1e] p-4 md:p-6">
          <p
            className={cn(
              "text-center text-2xl text-white md:text-3xl",
              port.className,
            )}
          >
            Social Links
          </p>
          <ul className="mt-2 space-y-3">
            {user.socialLinks.map((item) => (
              <li key={item.id}>
                <Link
                  className="flex w-full items-center justify-between gap-4 rounded-xl bg-zinc-800 px-3 py-2 text-lg text-zinc-400 md:text-xl"
                  href={item.link}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <button className="flex w-full items-center justify-between gap-4 rounded-xl bg-zinc-800 px-3 py-2 text-lg text-zinc-400 md:text-xl">
                Add
                <span>+</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <UserCourses courses={user.courses} />
    </div>
  );
};

export default UserDashboard;
