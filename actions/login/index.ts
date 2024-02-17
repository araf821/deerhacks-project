import { z } from "zod";
import { LoginSchema } from "./schema";

import { db } from "@/lib/db";
import { signIn } from "next-auth/react";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid email or password.",
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    return {
      error: "Invalid email or password.",
    };
  }

  try {
    signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    return {
      error: "Could not log you in at this time. Please try again later.",
    };
  }
};
