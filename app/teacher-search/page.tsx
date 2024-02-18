import { currentUser } from "@/lib/data/user";
import { db } from "@/lib/db";
import { Course } from "@prisma/client";
import TeacherSearchClient from "./client-side";
import Navbar from "@/components/navbar/Navbar";
export default async function TeacherSearchLayout() {
    const user = await currentUser()
    if(!user){
        return(<div></div>)
    }
    if(user.email){
        const userInfo = await db.user.findFirst({
            where:{
                email:user?.email
            }
        })
        if(!userInfo){
            throw new Error("No user with this email")
        }
        const userCourseInfo = (await db.studentCourseStatus.findMany({
            where:{
                userId:userInfo.id,
                type:"LEARNER"
            }
        }))
        const userCourses: Course[] = await db.course.findMany({
            where:{
                OR:userCourseInfo.map((course)=>{
                    return {
                        id:course.courseId
                    }
                })
            }
        })
        return (
            (
            <>
                <Navbar/>
                <TeacherSearchClient userCourses={userCourses} />
            </>
            )
        );
    }
    return (<div></div>)
}
