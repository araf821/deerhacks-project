"use client";

import { generateStudyGroup } from "@/actions/generate-study-group";
import { Button } from "./ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useState, useTransition } from "react";
import { User } from "@prisma/client";
import { toast } from "sonner";
import Loader from "./Loader";

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
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
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
