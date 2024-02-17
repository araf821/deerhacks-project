import { z } from "zod";

// TODO: Improve the validations

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string({ required_error: "Invalid password." }),
});
