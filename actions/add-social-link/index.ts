"use server";

import { z } from "zod";
import { AddSocialSchema } from "./schema";
import { currentUser } from "@/lib/data/user";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const addSocialLink = async (
  values: z.infer<typeof AddSocialSchema>,
) => {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return {
        error: "Unauthorized!",
      };
    }

    const validatedFields = AddSocialSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: "Invalid label or link was provided.",
      };
    }

    await db.social.create({
      data: {
        label: validatedFields.data.label,
        link: validatedFields.data.link,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard");

    return {
      success: "New social link was added!",
    };
  } catch (error) {
    return {
      error: "Something went wrong.",
    };
  }
};
