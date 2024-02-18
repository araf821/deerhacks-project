"use server";
import { addStudentCourses } from "@/actions/db-calls";
import { currentUser } from "@/lib/data/user";
import { revalidatePath } from "next/cache";

export const submitFunc = async (formData: FormData) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  let selectedCourse = formData.get("selectedCourse");
  let studentType = formData.get("studentType");
  let grade = formData.get("grade");

  if (!selectedCourse || !studentType || !grade) {
    return {
      error: "Invalid fields provided.",
    };
  }

  if (
    (studentType === "NEITHER" ||
      studentType === "TEACHER" ||
      studentType === "LEARNER") &&
    typeof selectedCourse === "string" &&
    typeof grade === "string"
  ) {
    if (
      grade === "A" ||
      grade === "B" ||
      grade === "C" ||
      grade === "D" ||
      grade === "N/A"
    ) {
      await addStudentCourses([
        {
          completionStatus: "ONGOING",
          type: studentType,
          courseId: selectedCourse,
          userId: user.id,
          grade: grade === "N/A" ? undefined : grade,
        },
      ]);
    }

    revalidatePath("/dashboard");
    return { success: `Course was added!` };
  } else {
    return {
      error: "Invalid fields provided.",
    };
  }
};
