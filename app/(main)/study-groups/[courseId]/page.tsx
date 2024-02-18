import Loader from "@/components/Loader";
import OtherCoursesSidebar from "@/components/OtherCoursesSidebar";
import StudyGroupSetup from "@/components/StudyGroupSetup";
import { port } from "@/lib/font";
import { cn } from "@/lib/utils";
import React, { Suspense } from "react";

interface Props {
  params: {
    courseId: string;
  };
}

const StudyGroupPage = ({ params }: Props) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2 md:gap-8 lg:mt-10 lg:grid-cols-3">
      <OtherCoursesSidebar />

      <div className="lg:col-span-2">
        <Suspense fallback={<Loader />}>
          <StudyGroupSetup courseId={params.courseId} />
        </Suspense>
      </div>
    </div>
  );
};

export default StudyGroupPage;
