import { currentUser } from "@/lib/data/user";
import { db } from "@/lib/db";
import { port } from "@/lib/font";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";

interface CourseListProps {}

const CourseList = async ({}: CourseListProps) => {
  const user = await currentUser();

  if (!user) return null;

  const courses = await db.course.findMany({
    where: {
      school: user.school as string,
    },
  });

  if (!courses)
    return (
      <div className="mt-4 rounded-xl border-2 border-zinc-800 p-4 md:p-8">
        <p className="md:text-md text-zinc-800">
          Students from {user.school} have not added any courses yet.
        </p>

        <Button asChild className="mt-2">
          <Link href="/courses/add">Add New Course</Link>
        </Button>
      </div>
    );

  return (
    <>
      <h2
        className={cn(
          "mt-4 text-2xl md:mt-8 md:text-3xl lg:text-4xl",
          port.className,
        )}
      >
        Discover Courses at <span className="font-bold">{user.school}</span>
      </h2>
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
              href={`/courses/${course.id}`}
              className="text-2xl font-semibold text-white"
            >
              {course.courseCode}
            </Link>
            <p className="truncate text-xl text-zinc-400">{course.name}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <hr className="border-t-2 border-orange-700" />
        <p className="mt-4 text-orange-900">
          Can&rsquo;t find the course you&rsquo;re looking for?
        </p>
        <Button asChild className="mt-2">
          <Link href="/courses/add">Add New Course</Link>
        </Button>
      </div>
    </>
  );
};

export default CourseList;
