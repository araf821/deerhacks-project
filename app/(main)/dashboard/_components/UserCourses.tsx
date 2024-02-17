import { port } from "@/lib/font";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import Link from "next/link";

interface UserCoursesProps {
  courses: Course[];
}

const UserCourses = ({ courses }: UserCoursesProps) => {
  return (
    <div className="md:col-span-2">
      <p
        className={cn(
          "rounded-xl bg-[#1e1e1e] px-3 py-2 text-xl text-white md:text-2xl",
          port.className,
        )}
      >
        Current courses
      </p>
      <ul
        className={cn(
          "mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
          port.className,
        )}
      >
        {courses.map((course) => {
          if (course.completionStatus === "ONGOING") {
            return (
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
            );
          }
        })}
        <li>
          <button className="flex aspect-[21/9] h-full w-full flex-col items-center justify-center gap-1.5 rounded-xl bg-[#1e1e1e] px-4 py-2.5 text-2xl text-zinc-400 transition-colors hover:text-white">
            Add Course
          </button>
        </li>
      </ul>

      <p
        className={cn(
          "mt-8 rounded-xl bg-[#1e1e1e] px-3 py-2 text-xl text-white md:text-2xl",
          port.className,
        )}
      >
        Past courses
      </p>
      <ul
        className={cn(
          "mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
          port.className,
        )}
      >
        {courses.map((course) => {
          if (course.completionStatus === "COMPLETED") {
            return (
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
            );
          }
        })}
        <li>
          <button className="flex aspect-[21/9] h-full w-full shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl bg-[#1e1e1e] px-4 py-2.5 text-2xl text-zinc-400 transition-colors hover:text-white">
            Add Course
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserCourses;
