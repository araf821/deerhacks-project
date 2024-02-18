"use server";

import { currentUser } from "@/lib/data/user";
import { db } from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { z } from "zod";
import { AddNewCourseSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const addNewCourse = async (
  values: z.infer<typeof AddNewCourseSchema>,
) => {
  const validatedFields = AddNewCourseSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields provided.",
    };
  }

  const user = await currentUser();

  const userWithSchool = await db.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  if (!user || !userWithSchool) return { error: "Unauthorized." };

  const { name, courseCode } = validatedFields.data;

  try {
    await db.course.create({
      data: {
        courseCode,
        name,
        school: userWithSchool.school,
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return {
        error: `Course with the course code ${courseCode} already exists.`,
      };
    }

    return {
      error: "Something went wrong, please try again later.",
    };
  }

  revalidatePath("/courses");
  return { success: `${courseCode} was added as a course!` };
};
