import { auth } from "@/auth";
import { db } from "../db";

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};
