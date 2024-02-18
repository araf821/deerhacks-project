"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { redirect } from "next/navigation";
import CardWrapper from "./CardWrapper";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import { addNewCourse } from "@/actions/add-new-course";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { AddNewCourseSchema } from "@/actions/add-new-course/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddCourseFormProps {}

const AddCourseForm = ({}: AddCourseFormProps) => {
  const form = useForm<z.infer<typeof AddNewCourseSchema>>({
    resolver: zodResolver(AddNewCourseSchema),
    defaultValues: {
      name: "",
      courseCode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof AddNewCourseSchema>) => {
    await addNewCourse(values).then((data) => {
      if (data.error) toast.error(data.error);
      if (data.success) toast.success(data.success);
    });
  };

  return (
    <CardWrapper>
      <Form {...form}>
        <form className="text-white" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Intro to Something Crazy..." />
                </FormControl>
              </FormItem>
            )}
          />

          <button>click me</button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default AddCourseForm;
