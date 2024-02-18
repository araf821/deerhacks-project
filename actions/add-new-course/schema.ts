import { z } from "zod";

export const AddNewCourseSchema = z.object({
  name: z.string().min(1),
  courseCode: z.string().min(1),
});
