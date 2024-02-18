import Loader from "@/components/Loader";
import StudyGroupCoursePicker from "@/components/StudyGroupCoursePicker";
import React, { Suspense } from "react";

const StudyGroupsPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <StudyGroupCoursePicker />
    </Suspense>
  );
};

export default StudyGroupsPage;
