"use server";

import { z } from "zod";
import { LoginSchema } from "./schema";

import { AuthError } from "next-auth";
import { getUserByEmail } from "@/lib/data/user";
import { signIn } from "@/auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid email or password.",
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      error: "Invalid email or password.",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return {
          error: "Invalid email or password.",
        };
      }
      return {
        error: "Could not log you in at this time. Please try again later.",
      };
    }

    throw error;
  }
};
