import { db } from "@/lib/db";
import { port } from "@/lib/font";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import UserCard from "./UserCard";

interface SinglePostPageProps {
  courseId: string;
}

const SinglePostPage = async ({ courseId }: SinglePostPageProps) => {
  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      StudentCourseStatus: {
        include: {
          student: true, // Include user details for each student
        },
      },
    },
  });

  if (!course) return notFound();

  return (
    <div className="mb:mt-8 mt-4">
      <h2 className={cn("text-2xl md:text-3xl lg:text-4xl", port.className)}>
        [{course.courseCode}] {course?.name}
      </h2>
      <hr className="border-t-2 border-black/10" />
      <ul className="grid grid-cols-1 gap-4 pb-12 pt-4 lg:grid-cols-2">
        {course.StudentCourseStatus.map(({ student }) => (
          //@ts-ignore
          <UserCard key={student.id} user={student} />
        ))}
      </ul>
    </div>
  );
};

export default SinglePostPage;
