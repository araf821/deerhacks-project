'use client'
import { port } from "@/lib/font";
import { cn } from "@/lib/utils";
import { CourseNameAndStudentData } from "@/types/types";
import Link from "next/link";
import { useState } from "react";
import { Course, GRADE } from "@prisma/client";

import { submitFunc } from "./submit-func";
interface UserCoursesProps {
  courses: CourseNameAndStudentData[];
  selectableCourses: Course[]
  user: string
}

const UserCourses = ({ courses, selectableCourses, user}: UserCoursesProps) => {


  const [addingNewCourse, setAddingNewCourse] = useState(false)
  console.log(selectableCourses)
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
          "mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
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
                  className="text-2xl font-semibold text-white"
                >
                  {course.courseCode}
                </Link>
                <p className="truncate text-xl text-zinc-400">{course.name}</p>
              </li>
            );
          }
        })}
        <li>
          {!addingNewCourse ?
            <button onClick={() => { setAddingNewCourse(true) }} className="flex aspect-[21/9] h-full w-full flex-col items-center justify-center gap-1.5 rounded-xl bg-[#1e1e1e] px-4 py-2.5 text-2xl text-zinc-400 transition-colors hover:text-white">
              Add Course
            </button>
            :
            <div className="flex aspect-[21/9] w-full flex-col items-center justify-center gap-1.5 rounded-xl bg-[#1e1e1e] px-4 py-2.5 text-2xl text-zinc-400 transition-colors">
              <form action={async (formData: FormData)=>{
                await submitFunc(formData, user)

              }}>
                <label htmlFor="selectedCourse">Course</label>
                <select id="selectedCourse" name="selectedCourse">
                <option disabled selected value={""}> select an option </option>
                  {selectableCourses.map((course)=>{
                    return <option key={course.id} value={course.id}>{course.courseCode}</option>
                  })}
                </select>
                <label htmlFor="studentType">Student Type</label>
                <select id="studentType" name="studentType" style={{textOverflow:"ellipsis", width:"200px"}}>
                    <option disabled selected value={""}> select an option </option>
                    <option value={"TEACHER"}>{"Teacher: You're confident about your skills and want to help others"}</option>
                    <option value={"LEARNER"}>{"Learner: You're here to get home help from others"}</option>
                    <option value={"NEITHER"}>{"Neither"}</option>
                </select>
                <label htmlFor="grade">Grade</label>
                <select id="grade" name="grade" >
                    <option disabled selected value={""}> select an option </option>
                    <option value={"A"}>A</option>
                    <option value={"B"}>B</option>
                    <option value={"C"}>C</option>
                    <option value={"D"}>D</option>
                    <option value={"N/A"}>Prefer not to say</option>
                </select>
                <button type="submit" className="hover:text-white">Add course</button>
              </form>
              <button className="hover:text-red-700" onClick={()=>{setAddingNewCourse(false)}}>Cancel</button>
            </div>
          }
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
                  className="text-2xl font-semibold text-white"
                >
                  {course.courseCode}
                </Link>
                <p className="truncate text-xl text-zinc-400">{course.name}</p>
              </li>
            );
          }
        })}
        <li>
          <button className="flex aspect-[21/9] h-full w-full shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl bg-[#1e1e1e] px-4 py-2.5 text-2xl text-zinc-400 transition-colors hover:text-white">
            Add Course
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserCourses;
