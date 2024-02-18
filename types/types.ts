import { COMPLETION_STATUS, GRADE, STUDENT_TYPE, StudentCourseStatus } from "@prisma/client";
export interface CourseNameAndStudentData{
    studentData: StudentCourseStatus
    name: string
    school: string
    courseCode: string
    courseId: string
}
export interface StudentCourseData{
    completionStatus: COMPLETION_STATUS
    grade? : GRADE
    type: STUDENT_TYPE
    courseId: string
    userId: string
}

export interface StudentCourseDataUpdate{
    completionStatus?: COMPLETION_STATUS
    grade? : GRADE
    type?: STUDENT_TYPE
}
