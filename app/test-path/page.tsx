import { db } from "@/lib/db";
import { setAvailStatus, addStudentCourses, addCourse } from "@/actions/db-calls";
import { addSocialLink } from "@/actions/add-social-link";
export default async function Home() {
    await db.social.create({
        data: {
          label: "My Email",
          link: "karmjot.girn@mail.utoronto.ca",
          userId: "65d166d236dcc1a834d7cb7a",
        },
      });
  
    console.log("lmao")
    console.log("hiii")
    return (<div></div>)
}
