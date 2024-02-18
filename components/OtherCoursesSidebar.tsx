import { cn } from "@/lib/utils";
import { port } from "@/lib/font";
import { db } from "@/lib/db";
import { CourseNameAndStudentData } from "@/types/types";
import { auth } from "@/auth";
import Link from "next/link";

const OtherCoursesSidebar = async ({
  directory = "study-groups",
}: {
  directory?: "courses" | "study-groups";
}) => {
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

  let userDataArr: CourseNameAndStudentData[] = [];
  for (let i = 0; i < user.courses.length; i++) {
    let course = await db.course.findUnique({
      where: {
        id: user.courses[i].courseId,
      },
    });

    if (!course) {
      throw new Error("Course does not exist");
    }

    userDataArr.push({
      studentData: user.courses[i],
      name: course?.name,
      school: course?.school,
      courseCode: course?.courseCode,
      courseId: course?.id,
    });
  }

  return (
    <div className="h-fit w-full rounded-xl bg-[#1e1e1e] px-4 py-4 shadow-[0_0_12px] shadow-black/25 md:p-6 md:pb-10">
      <h2
        className={cn(
          "text-center text-2xl text-white md:text-3xl",
          port.className,
        )}
      >
        My Courses
      </h2>
      <hr className="mt-2 border-t-2 border-zinc-700" />
      {!userDataArr.length && (
        <p className="mb-6 mt-8 text-center text-zinc-400">
          No courses to display.
        </p>
      )}
      <ul className="mt-6 flex flex-col items-center gap-4">
        {userDataArr.map((course) => (
          <li key={course.courseCode} className="w-full">
            <Link
              className="flex w-full items-center justify-between gap-4 rounded-xl bg-zinc-800 px-3 py-2 text-zinc-400 transition-colors hover:text-white md:text-lg "
              href={
                directory === "study-groups"
                  ? `/study-groups/${course.courseId}`
                  : `/courses/${course.courseId}`
              }
            >
              {course.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OtherCoursesSidebar;
