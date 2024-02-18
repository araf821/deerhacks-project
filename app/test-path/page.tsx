import { db } from "@/lib/db";
import { setAvailStatus, addStudentCourses } from "@/actions/db-calls";
export default async function Home() {
    await addStudentCourses([{completionStatus:"ONGOING", courseId:"65d11f15c2e7e8db43fc843d", userId:"65d0c672bdefb2dc36f426c8", type:"LEARNER"}])
    console.log("lmao")
    console.log("hiii")
    return (<div></div>)
}
