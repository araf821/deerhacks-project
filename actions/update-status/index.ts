import { db } from "@/lib/db";

export const setAvailStatus = async (userId: string, status: null | "LOOKING_FOR_STUDY_GROUP_IRL" |"AVAILABLE_TO_HELP_IRL" |"AVAILABLE_TO_HELP_ONLINE" |"LOOKING_FOR_HELP_IRL" |"LOOKING_FOR_HELP_ONLINE", 
courses: number) => {
    if(status === null){
        let user = await db.user.findFirst({where:{
            "id":userId
        }})
        //Intellisense not updating for whatever reason
    }
}
