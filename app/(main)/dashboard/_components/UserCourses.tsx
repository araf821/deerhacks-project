"use client";
import { port } from "@/lib/font";
import { cn } from "@/lib/utils";
import { CourseNameAndStudentData } from "@/types/types";
import Link from "next/link";
import { useState } from "react";
import { Course, GRADE } from "@prisma/client";

import { submitFunc } from "./submit-func";
import AddCourseToDashboard from "@/components/modals/AddCourseToDashboard";
interface UserCoursesProps {
  courses: CourseNameAndStudentData[];
  selectableCourses: Course[];
  user: string;
}

const UserCourses = ({
  courses,
  selectableCourses,
  user,
}: UserCoursesProps) => {
  return (
    <div className="md:col-span-2">
      <p
        className={cn(
          "rounded-xl bg-[#1e1e1e] px-3 py-2 text-xl text-white shadow-xl md:text-2xl",
          port.className,
        )}
      >
        Current courses
      </p>
      <ul
        className={cn(
          "mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6",
          port.className,
        )}
      >
        {courses.map((course) => {
          if (course.studentData.completionStatus === "ONGOING") {
            return (
              <li
                key={course.studentData.id}
                className="flex aspect-[21/9] flex-col justify-center gap-1.5 rounded-xl bg-[#1e1e1e] px-4 py-2.5"
              >
                <Link
                  href={`/course/${course.studentData.id}`}
                  className="text-2xl font-semibold text-white sm:text-xl md:text-2xl"
                >
                  {course.courseCode}
                </Link>
                <p className="truncate text-xl text-zinc-400">{course.name}</p>
              </li>
            );
          }
        })}
        <li>
          <AddCourseToDashboard selectableCourses={selectableCourses}>
            <button className="flex aspect-[21/9] h-full w-full flex-col items-center justify-center gap-1.5 rounded-xl bg-[#1e1e1e] px-4 py-2.5 text-2xl text-zinc-400 transition-colors hover:text-white">
              Add Course
            </button>
          </AddCourseToDashboard>
        </li>
      </ul>

      <p
        className={cn(
          "mt-8 rounded-xl bg-[#1e1e1e] px-3 py-2 text-xl text-white shadow-xl md:text-2xl",
          port.className,
        )}
      >
        Past courses
      </p>
      <ul
        className={cn(
          "mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
          port.className,
        )}
      >
        {courses.map((course) => {
          if (course.studentData.completionStatus === "COMPLETED") {
            return (
              <li
                key={course.studentData.id}
                className="flex aspect-[21/9] flex-col justify-center gap-1.5 rounded-xl bg-[#1e1e1e] px-4 py-2.5"
              >
                <Link
                  href={`/course/${course.studentData.id}`}
                  className="text-2xl font-semibold text-white sm:text-xl md:text-2xl"
                >
                  {course.courseCode}
                </Link>
                <p className="truncate text-xl text-zinc-400">{course.name}</p>
              </li>
            );
          }
        })}
        <li>
          <AddCourseToDashboard selectableCourses={selectableCourses}>
            <button className="flex aspect-[21/9] h-full w-full shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl bg-[#1e1e1e] px-4 py-2.5 text-2xl text-zinc-400 transition-colors hover:text-white">
              Add Course
            </button>
          </AddCourseToDashboard>
        </li>
      </ul>
    </div>
  );
};

export default UserCourses;
