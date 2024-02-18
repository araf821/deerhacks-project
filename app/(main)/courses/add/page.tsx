import AddCourseForm from "@/components/AddCourseForm";
import Loader from "@/components/Loader";
import { Suspense } from "react";

const CourseAddPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4">
      <Suspense fallback={<Loader />}>
        <AddCourseForm />
      </Suspense>
    </div>
  );
};
export default CourseAddPage;
