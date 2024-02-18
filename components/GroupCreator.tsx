"use client";

import { generateStudyGroup } from "@/actions/generate-study-group";
import { Button } from "./ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useState, useTransition } from "react";
import { User } from "@prisma/client";
import { toast } from "sonner";
import Loader from "./Loader";
import UserCard from "./UserCard";

interface GroupCreatorProps {
  courseId: string;
}

const GroupCreator = ({ courseId }: GroupCreatorProps) => {
  const user = useCurrentUser();
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  if (!user || !user.id) return null;

  if (users?.length) {
    return (
      <ul className="grid grid-cols-1 gap-4 pb-12 pt-4 lg:grid-cols-2">
        {users.map((u) => (
          //@ts-ignore
          <UserCard key={u.id} user={u} />
        ))}
      </ul>
    );
  }

  if (users?.length === 0) {
    return (
      <p className="mt-4 text-zinc-800 lg:text-lg">
        This course appears to not have any students at the moment. Please check
        back later!
      </p>
    );
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="mt-4 rounded-xl border-2 border-zinc-800 p-4 lg:p-6">
      <p className="font-medium lg:text-lg">
        Generate a study group for this course?
      </p>
      <form
        action={() => {
          startTransition(async () => {
            await generateStudyGroup(courseId, user.id!)
              .then((data) => {
                if (data.length === 0) {
                  toast.error(
                    "Hmmmm... Looks like there are no students available.",
                  );
                }
                toast.success("Good luck on your studies!");
                setUsers(data);
              })
              .catch(() => {
                toast.error("Something went wrong. Please try again.");
              });
          });
        }}
      >
        <Button className="mt-2">Generate</Button>
      </form>
    </div>
  );
};

export default GroupCreator;
