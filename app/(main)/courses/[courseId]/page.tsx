import Loader from "@/components/Loader";
import OtherCoursesSidebar from "@/components/OtherCoursesSidebar";
import SinglePostPage from "@/components/SinglePostPage";
import { Suspense } from "react";

interface pageProps {
  params: {
    courseId: string;
  };
}

const page = ({ params }: pageProps) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2 md:gap-8 lg:mt-10 lg:grid-cols-3">
      <OtherCoursesSidebar directory={"courses"} />

      <div className="lg:col-span-2">
        <Suspense fallback={<Loader />}>
          <SinglePostPage courseId={params.courseId} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
