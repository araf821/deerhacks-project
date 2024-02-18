import { db } from "@/lib/db";
import { StudentCourseData, StudentCourseDataUpdate } from "@/types/types";
import { STUDENT_TYPE, USER_AVAILABILITY_TYPE } from "@prisma/client";
export const setAvailStatus = async (userId: string, status: null | USER_AVAILABILITY_TYPE,
    courseIds: string[], msg?: string) => {
    let user = await db.user.findFirst({
        where: {
            id: userId,
        }
    })
    console.log("hello")
    if (user) {
        if (status === null) {
            //@ts-ignore
            user.currentAvailStatus = null
        } else {
            await db.status.delete({
                where: {
                    userId: userId
                }
            })
            let userStatus = await db.status.create({
                data: {
                    userAvaibilityType: status,
                    msg: msg,
                    userId: userId,
                    courseIDs: courseIds
                }
            })
            db.user.update({
                where: {
                    id: userId
                },
                data: {
                    //@ts-ignore
                    currentAvailStatus: userStatus
                }
            })
        }
    }
    else {
        throw new Error("User does not exist.")
    }
}

export const addStudentCourses = async (studentCourseData: StudentCourseData[]) => {
    await db.studentCourseStatus.createMany({
        data: studentCourseData
    })
}

export const addCourse = async (school: string, name:string, courseCode:string, )=>{
    await db.course.create({
        data:{
            school:school,
            name:name,
            courseCode:courseCode
        }
    })
}


export const updateStudentCourses = async (id: string, newType:StudentCourseDataUpdate) => {
    await db.studentCourseStatus.update({
        where: {
            id: id
        },
        data:{
            ...newType
        }
    })
}

export const getStatuses = async (courseId: string, userAvaibilityType: USER_AVAILABILITY_TYPE) => {
    return await db.status.findMany({
        where: {
            courseIDs: {
                hasSome: [courseId]
            },
            userAvaibilityType: userAvaibilityType
        }
    })
}



