
'use client'
import { Course } from "@prisma/client"
import { useState } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
interface Props {
    userCourses: Course[]
}
export default function TeacherSearchClient(props: Props) {
    let defaultVal;
    let userCourses = props.userCourses
    if (userCourses.length == 0) {
        return (<div></div>)
    }
    defaultVal = userCourses[0]
    const [selectedCourse, setSelectedCourse] = useState<null | Course>(defaultVal)

    return (<div>
        <DropdownMenu>
            <DropdownMenuTrigger>Open</DropdownMenuTrigger>
            <DropdownMenuContent>
                {userCourses.map((course)=>{
                    return <DropdownMenuItem>{course.courseCode}</DropdownMenuItem>
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    </div>)
}