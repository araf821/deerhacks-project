import { User } from "@prisma/client";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return <li></li>;
};

export default UserCard;
