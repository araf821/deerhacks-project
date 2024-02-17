import { z } from "zod";
import { RegisterSchema } from "./schema";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const login = async (
  values: z.infer<typeof RegisterSchema>,
  university: string,
) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Error validating credentials.",
    };
  }

  const { name, email, password, imageUrl } = validatedFields.data;

  if (!email.endsWith(university)) {
    return {
      error: "Please proceed with your university email.",
    };
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
};
