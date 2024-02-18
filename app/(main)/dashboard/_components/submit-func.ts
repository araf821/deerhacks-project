'use server'
import { addStudentCourses } from "@/actions/db-calls"
import { redirect } from "next/navigation"
export const submitFunc = async (formData:FormData, user: string)=>{
    let selectedCourse= formData.get("selectedCourse")
    let studentType = formData.get("studentType")
    let grade = formData.get("grade")
    if((studentType === "NEITHER" || studentType === "TEACHER" || studentType === "LEARNER") && typeof selectedCourse === "string" && typeof grade === "string" ){
      if(grade === "N/A"){
        await addStudentCourses([{completionStatus:"ONGOING", type:studentType, courseId:selectedCourse, userId:user}])
      } else if(grade === "A"|| grade === "B" || grade === "C" || grade === "D"){
        await addStudentCourses([{completionStatus:"ONGOING", type:studentType, courseId:selectedCourse, userId:user, grade:grade}])
      }
      return redirect("/dashboard")
    }
  
  }
