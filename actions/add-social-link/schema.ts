import { z } from "zod";

export const AddSocialSchema = z.object({
  label: z.string().min(1).max(15),
  link: z.string().url(),
});
