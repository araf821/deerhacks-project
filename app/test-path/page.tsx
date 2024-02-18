import { db } from "@/lib/db";
import { setAvailStatus, addStudentCourses, addCourse } from "@/actions/db-calls";
export default async function Home() {
    await addCourse("yorku","Lin Alg", "MATH 1025")
    console.log("lmao")
    console.log("hiii")
    return (<div></div>)
}
