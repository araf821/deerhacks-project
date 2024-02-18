import CourseList from "@/components/CourseList";
import Loader from "@/components/Loader";
import { Suspense } from "react";

const CoursesPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <CourseList />
    </Suspense>
  );
};
export default CoursesPage;
