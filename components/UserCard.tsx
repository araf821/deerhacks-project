import { port } from "@/lib/font";
import { cn } from "@/lib/utils";
import { Social, User } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";

interface UserCardProps {
  user: User & { socialLinks: Social[] };
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <li className="flex aspect-square w-full flex-col rounded-xl bg-zinc-800 p-4 md:p-6">
      <div className="relative mx-auto mt-8 aspect-square w-[40%] overflow-hidden rounded-full">
        <Image
          src={user.imageUrl}
          alt="user profile picture"
          fill
          className="object-cover"
        />
      </div>
      <p
        className={cn(
          "mt-4 flex-1 text-center text-2xl text-white sm:text-3xl",
          port.className,
        )}
      >
        {user.name}
      </p>
      <Button
        size="lg"
        className="w-full self-end bg-[#FF9900] text-xl text-black hover:bg-amber-600"
      >
        Connect +
      </Button>
    </li>
  );
};

export default UserCard;
