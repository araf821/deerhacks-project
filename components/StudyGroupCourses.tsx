import { currentUser } from "@/lib/data/user";
import { db } from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { port } from "@/lib/font";
import { cn } from "@/lib/utils";

interface StudyGroupCoursesProps {}

const StudyGroupCourses = async ({}: StudyGroupCoursesProps) => {
  const user = await currentUser();

  if (!user) redirect("/auth/login");

  const courses = await db.course.findMany({
    where: {
      StudentCourseStatus: {
        some: {
          userId: user.id,
        },
      },
    },
  });

  if (!courses.length) {
    return (
      <>
        <p className="mt-4 text-zinc-800 md:text-lg">
          You have not added any courses in your dashboard yet.
        </p>
        <Button asChild className="mt-4">
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </>
    );
  }

  return (
    <ul
      className={cn(
        "mt-4 grid grid-cols-1 gap-4 min-[500px]:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4",
        port.className,
      )}
    >
      {courses.map((course) => (
        <li
          key={course.id}
          className="flex aspect-[21/9] flex-col justify-center gap-1.5 rounded-xl bg-[#1e1e1e] px-4 py-2.5"
        >
          <Link
            href={`/course/${course.id}`}
            className="text-2xl font-semibold text-white"
          >
            {course.courseCode}
          </Link>
          <p className="truncate text-xl text-zinc-400">{course.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default StudyGroupCourses;
