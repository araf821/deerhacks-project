"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { cn } from "@/lib/utils";
import { port } from "@/lib/font";
import { toast } from "sonner";
import { Course } from "@prisma/client";
import { submitFunc } from "@/app/(main)/dashboard/_components/submit-func";
import { Button } from "../ui/button";
import Link from "next/link";

interface AddCourseToDashboardProps {
  children: React.ReactNode;
  selectableCourses: Course[];
}

const AddCourseToDashboard = ({
  children,
  selectableCourses,
}: AddCourseToDashboardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader className={cn("", port.className)}>
          <DialogTitle className="text-2xl md:text-3xl">
            Enroll in a course
          </DialogTitle>
          <DialogDescription className="text-lg md:text-xl">
            Add a course to your dashboard!
          </DialogDescription>
        </DialogHeader>

        <div>
          <form
            action={async (formData: FormData) => {
              await submitFunc(formData).then((data) => {
                if (data.error) toast.error(data.error);
                if (data.success) {
                  toast.success(data.success);
                  setIsOpen(false);
                }
              });
            }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="selectedCourse">Course</label>
              <select
                className="bg-zinc-900 px-3 py-1.5"
                id="selectedCourse"
                name="selectedCourse"
              >
                {selectableCourses.map((course) => {
                  return (
                    <option
                      key={course.id}
                      value={course.id}
                      className="border-none p-8"
                    >
                      {course.courseCode}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex min-w-0 flex-col gap-1">
              <label htmlFor="studentType">Student Type</label>
              <select
                id="studentType"
                name="studentType"
                className="w-full bg-zinc-900 px-3 py-1.5"
              >
                <option value={"TEACHER"}>
                  {
                    "Teacher: You're confident about your skills and want to help others"
                  }
                </option>
                <option value={"LEARNER"}>
                  {"Learner: You're here to get home help from others"}
                </option>
                <option value={"NEITHER"}>{"Neither"}</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="grade">Grade</label>
              <select
                id="grade"
                name="grade"
                className="bg-zinc-900 px-3 py-1.5"
              >
                <option disabled selected value={""}>
                  {" "}
                  select an option{" "}
                </option>
                <option value={"A"}>A</option>
                <option value={"B"}>B</option>
                <option value={"C"}>C</option>
                <option value={"D"}>D</option>
                <option value={"N/A"}>Prefer not to say</option>
              </select>
            </div>
            <hr className="my-2 border-t-2 border-zinc-700" />
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#FF9900] text-lg font-semibold text-black hover:bg-amber-600"
            >
              Add Course
            </Button>

            <hr className="my-2 border-t-2 border-zinc-700" />
            <p className="text-center text-zinc-400">
              Can&rsquo;t find the course you&rsquo;re looking for?
            </p>
            <Button asChild>
              <Link href="/courses/add">Create New Course</Link>
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCourseToDashboard;
