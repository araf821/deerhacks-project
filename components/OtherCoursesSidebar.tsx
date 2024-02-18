import { cn } from "@/lib/utils";
import { port } from "@/lib/font";
import { db } from "@/lib/db";
import { CourseNameAndStudentData } from "@/types/types";
import { auth } from "@/auth";
import Link from "next/link";

const OtherCoursesSidebar = async () => {
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
    <div className="w-full rounded-xl bg-[#1e1e1e] px-4 py-4 shadow-[0_0_12px] shadow-black/25 md:p-6">
      <h2
        className={cn(
          "text-center text-2xl text-white md:text-3xl",
          port.className,
        )}
      >
        Other Courses
      </h2>
      <hr className="mt-2 border-t-2 border-zinc-700" />
      {!userDataArr.length && (
        <p className="mb-6 mt-8 text-center text-zinc-400">
          No courses to display.
        </p>
      )}
      <ul className="mt-6 flex flex-col items-center gap-6">
        {userDataArr.map((course) => (
          <li key={course.courseCode}>
            <Link
              className="w-full rounded-md bg-zinc-800 px-3 py-2 text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
              href={`/study-groups/${course.courseId}`}
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
