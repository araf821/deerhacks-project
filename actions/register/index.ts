"use server";

import { z } from "zod";
import { RegisterSchema } from "./schema";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Error validating credentials.",
    };
  }

  const { name, email, password, imageUrl, university } = validatedFields.data;

  if (!email.includes(university)) {
    return {
      error: "Please proceed with your university email.",
    };
  }

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email is already in use." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      imageUrl,
    },
  });

  return { success: "Account created! Please log in." };
};
