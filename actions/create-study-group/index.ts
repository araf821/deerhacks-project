import { currentUser } from "@/lib/data/user";
import { db } from "@/lib/db";
import { User } from "@prisma/client";

export const createStudyGroup = async (courseId: string) => {
  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
  });

  if (!course) {
    return {
      error: "Course not found.",
    };
  }

  const user = await currentUser();

  if (!user) {
    return {
      error: "Unauthorized.",
    };
  }

  const users = await db.user.findMany({
    where: {
      courses: {
        some: {
          id: courseId,
          type: "LEARNER",
        },
      },
    },
    take: 10,
  });

  //   Shuffle the 10 users and pick 3 random students.
  shuffle(users);
  const newGroup = users.slice(0, 3);

  return newGroup;
};

function shuffle(array: User[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
