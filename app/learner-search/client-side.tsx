
'use client'
import { Course, Social, User } from "@prisma/client"
import { useEffect, useState } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getStatuses } from "@/actions/db-calls"
import { Status } from "@prisma/client"
import Navbar from "@/components/navbar/Navbar"
interface Props {
    userCourses: Course[]
}
export default function TeacherSearchClient(props: Props) {
    let defaultVal = null;
    let userCourses = props.userCourses
    if (userCourses.length > 0) {
        defaultVal = userCourses[0]
    }

    const [selectedCourse, setSelectedCourse] = useState<null | Course>(defaultVal)
    const [selectedLocation, setSelectedLocation] = useState<"In-Person"|"Online">("In-Person")
    const [relevantStatuses, setRelevantStauses] = useState<{status:Status, user:User, socialLinks: Social[]}[]|null>(null)
    console.log(relevantStatuses)
    useEffect(()=>{
    },[selectedCourse, selectedLocation])
    return (
        <div style={{marginTop:"75px", display:"flex", alignItems:"center", flexDirection:"column"}}>
             <h2 style={{fontSize:"100px", marginBottom:"25px"}}>Learner Search</h2>
             <h2 style={{fontSize:"20px", marginBottom:"25px"}}>Select a course which you&apos;re a teacher for, and your desired location (in-person on campus vs. online) 
             to find someone you can help!</h2>
            <div style={{ display: "flex", width: "100vw", paddingLeft:"50px", paddingTop:"25px" }}>
            <form style={{display:"flex", columnGap:"50px"}} action={async (formData: FormData)=>{
                let courseId = formData.get("selectedCourse")
                let availability = formData.get("helpType")
                console.log(courseId)
                if(typeof courseId === "string"){
                    let res = null
                    if(availability === "In-person"){
                        res = await getStatuses(courseId, "LOOKING_FOR_HELP_IRL")
                    } else{
                        res = await getStatuses(courseId, "LOOKING_FOR_HELP_ONLINE")
                    }
                    //@ts-ignore
                    setRelevantStauses(res)
                }
                
              }}>
                <label htmlFor="selectedCourse">Course</label>
                <select id="selectedCourse" name="selectedCourse">
                <option disabled selected value={""}> select an option </option>
                  {userCourses.map((course)=>{
                    return <option key={course.id} value={course.id}>{course.courseCode}</option>
                  })}
                </select>
                <label htmlFor="helpType">Location</label>
                <select id="helpType" name="helpType">
                    <option disabled selected value={""}> select an option </option>
                    <option value={"Online"}>Online</option>
                    <option value={"In-person"}>In-person</option>
                </select>
                <button type="submit" className="hover:text-white">Search</button>
              </form>
            </div>
            <div style={{width:"100vw", display:"flex", justifyContent:"center", paddingTop:"50px"}}>
                {relevantStatuses ? relevantStatuses.map((relevantStatus)=>{
                    return <div key={relevantStatus.status.id} style={{width:"400px", height:"400px", display:"flex", alignItems:"center", flexDirection:"column", justifyContent:"space-between"}} className="bg-[#1e1e1e] rounded-xl text-zinc-400 transition-colors">
                        <p>{relevantStatus.user.name}</p>
                        {relevantStatus.socialLinks.map((link)=>{
                            console.log(link.link)
                            return <p key={link.link}>{link.label}: {link.link}</p>
                        })}
                        <img src={relevantStatus.user.imageUrl} style={{width:"50px", height:"auto"}}/>
                    </div>
                }):null}
            </div>
        </div>
    )
}
