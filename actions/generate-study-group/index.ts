"use server";

import { db } from "@/lib/db";
import { delay } from "@/lib/utils";

export const generateStudyGroup = async (courseId: string, userId: string) => {
  await delay(1500); // Just to make the user think that we're doing some crazy calculations to bring them the results

  const enrolledUsers = await db.studentCourseStatus.findMany({
    where: {
      courseId: courseId,
      userId: {
        not: userId,
      },
    },
    include: {
      student: {
        include: {
          socialLinks: true,
        },
      }, // Include user details
    },
  });

  // Extract the user details
  const users = enrolledUsers.map((enrollment) => enrollment.student);

  // Shuffle the array (Fisher-Yates shuffle)
  for (let i = users.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [users[i], users[j]] = [users[j], users[i]]; // Swap elements
  }

  // Return the first 3 users after shuffling
  return users.slice(0, 3);
};
