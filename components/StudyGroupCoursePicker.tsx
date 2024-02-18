import { port } from "@/lib/font";
import { cn } from "@/lib/utils";
import StudyGroupCourses from "./StudyGroupCourses";

interface StudyGroupCoursePickerProps {}

const StudyGroupCoursePicker = ({}: StudyGroupCoursePickerProps) => {
  return (
    <div className="mt-6 md:mt-8 lg:mt-10">
      <h2 className={cn("text-2xl md:text-3xl lg:text-4xl", port.className)}>
        Pick A Course
      </h2>
      <hr className="border-t-2 border-black/10" />
      <StudyGroupCourses />
    </div>
  );
};

export default StudyGroupCoursePicker;
