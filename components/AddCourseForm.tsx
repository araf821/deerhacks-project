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
import { Button, buttonVariants } from "./ui/button";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { port } from "@/lib/font";
import BackButton from "./BackButton";

interface AddCourseFormProps {}

const AddCourseForm = ({}: AddCourseFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AddNewCourseSchema>>({
    resolver: zodResolver(AddNewCourseSchema),
    defaultValues: {
      name: "",
      courseCode: "",
    },
  });

  const onSubmit = (values: z.infer<typeof AddNewCourseSchema>) => {
    startTransition(async () => {
      await addNewCourse(values)
        .then((data) => {
          if (data.error) toast.error(data.error);
          if (data.success) {
            toast.success(data.success);
            form.reset();
          }
        })
        .catch(() => {
          toast.error("Something went wrong. Please try again later");
        });
    });
  };

  return (
    <>
      <CardWrapper>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <h3
              className={cn("text-2xl text-white md:text-3xl", port.className)}
            >
              Create New Course
            </h3>
            <p className="text-zinc-400 max-md:text-sm">
              Add a new course to the database if we are missing it!
            </p>

            <hr className="mb-6 mt-4 border-t-2 border-zinc-700" />

            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-200">Course name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Intro to Something Crazy..."
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="courseCode"
              control={form.control}
              render={({ field }) => (
                <FormItem className="pt-2">
                  <FormLabel className="text-zinc-200">Course code</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="CBPN2077..."
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <hr className="my-4 border-t-2 border-zinc-700" />

            <Button
              disabled={isPending}
              className="w-full bg-[#FF9900] text-lg font-semibold text-black hover:bg-amber-600"
            >
              Create New Course
            </Button>
            <BackButton
              className={cn(buttonVariants({ className: "mt-2 w-full" }))}
            >
              Back to Courses
            </BackButton>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
};

export default AddCourseForm;
