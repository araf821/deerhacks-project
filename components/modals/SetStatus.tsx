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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AddSocialSchema } from "@/actions/add-social-link/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Course } from "@prisma/client";
import { submitFunc } from "@/app/(main)/dashboard/_components/submit-func";
import { Button } from "../ui/button";
import { CourseNameAndStudentData } from "@/types/types";
import Link from "next/link";
import { setAvailStatus } from "@/actions/db-calls";
import { redirect } from "next/navigation";
interface AddCourseToDashboardProps {
  children: React.ReactNode;
  selectableCourses: CourseNameAndStudentData[];
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
            Set your status
          </DialogTitle>
          <DialogDescription className="text-lg md:text-xl">
            Set whether you&apos;re currently available to help someone out, find a study group, or get help from someone!
          </DialogDescription>
        </DialogHeader>

        <div>
          <form
            action={async (formData: FormData) => {
              let courseId = formData.get("selectedCourse")
              let availType = formData.get("studentType")
              if(availType === ""){
                availType = null
              }
              //@ts-ignore
              await setAvailStatus(selectableCourses[0].studentData.userId, availType, [courseId])
              window.location.reload();
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
                      key={course.courseId}
                      value={course.courseId}
                      className="border-none p-8"
                    >
                      {course.courseCode}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex min-w-0 flex-col gap-1">
              <label htmlFor="studentType">What are you looking to do?</label>
              <select
                id="studentType"
                name="studentType"
                className="w-full bg-zinc-900 px-3 py-1.5"
              >
                <option value={"AVAILABLE_TO_HELP_IRL"}>
                    Available to help someone in-person
                </option>
                <option value={"LOOKING_FOR_HELP_IRL"}>
                    Looking to get in-person help
                </option>
                <option value={"AVAILABLE_TO_HELP_ONLINE"}>
                    Available to help someone online
                </option>
                <option value={"LOOKING_FOR_HELP_ONLINE"}>
                    Available to help someone online
                </option>
                <option value={"LOOKING_FOR_STUDY_GROUP_IRL"}>
                    Looking for an in-person study group
                </option>
                <option value={""}>
                    Not Available
                </option>
              </select>
            </div>
            <hr className="my-2 border-t-2 border-zinc-700" />
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#FF9900] text-lg font-semibold text-black hover:bg-amber-600"
            >
              Set Status
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCourseToDashboard;
