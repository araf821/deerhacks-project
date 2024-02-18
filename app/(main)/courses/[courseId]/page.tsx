import Loader from "@/components/Loader";
import SinglePostPage from "@/components/SinglePostPage";
import { Suspense } from "react";

interface pageProps {
  params: {
    courseId: string;
  };
}

const page = ({ params }: pageProps) => {
  return (
    <Suspense fallback={<Loader />}>
      <SinglePostPage courseId={params.courseId} />
    </Suspense>
  );
};

export default page;
