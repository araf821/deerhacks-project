import { z } from "zod";

// TODO: Improve the validations

export const RegisterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  imageUrl: z.string().url(),
});
