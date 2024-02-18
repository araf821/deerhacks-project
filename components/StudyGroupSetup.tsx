import { db } from "@/lib/db";
import { port } from "@/lib/font";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import GroupCreator from "./GroupCreator";

interface StudyGroupSetupProps {
  courseId: string;
}

const StudyGroupSetup = async ({ courseId }: StudyGroupSetupProps) => {
  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
  });

  if (!course) {
    return notFound();
  }

  return (
    <div className="max-md:mt-4">
      <h2 className={cn("text-2xl md:text-3xl lg:text-4xl", port.className)}>
        {course.name}
      </h2>
      <hr className="border-t-2 border-black/10" />
      <GroupCreator courseId={courseId} />
    </div>
  );
};

export default StudyGroupSetup;
