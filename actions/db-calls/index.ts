import { db } from "@/lib/db";

export const setAvailStatus = async (userId: string, status: null | "LOOKING_FOR_STUDY_GROUP_IRL" |"AVAILABLE_TO_HELP_IRL" |"AVAILABLE_TO_HELP_ONLINE" |"LOOKING_FOR_HELP_IRL" |"LOOKING_FOR_HELP_ONLINE",
msg?: string) => {
    if(status === null){
        let user = await db.user.findFirst({
            where:{
                id:userId,
            }
        })
        if(user){
            if(status === null){
                user.currentAvailStatus = null
            } else{
                user.currentAvailStatus = {
                    msg: msg ? msg : null,
                    userAvaibilityType: status
                }
            }
        }
        else{
            throw new Error("User does not exist.")
        }
    }
}

interface StudentCourseData{
    isCompleted: boolean
    grade? : "A"|"B"|"C"|"D"
    courseCode: string
    type: "TEACHER"|"LEARNER"
    school: "string"
}


export const setUserCourses = async (userId: string, coursesData: StudentCourseData[]) => {
    
    let sourceCourse = db.course.findFirst({
        where: {
            school: c
        }
    })
}


