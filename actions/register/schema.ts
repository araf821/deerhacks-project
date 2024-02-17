import { z } from "zod";

// TODO: Improve the validations

export const RegisterSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z
    .string()
    .min(6, { message: "Must be at least 6 character(s) in length." }),
  imageUrl: z.string().url(),
  university: z.string().min(1),
});
