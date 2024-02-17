import { StudentCourseStatus } from "@prisma/client";
export interface CourseNameAndStudentData{
    studentData: StudentCourseStatus
    name: string
    school: string
    courseCode: string
}
