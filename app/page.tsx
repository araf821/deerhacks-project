import { currentUser } from "@/lib/data/user";
import Image from "next/image";

export default async function Home() {
  const user = await currentUser();

  return <main>{user?.name || "No user"}</main>;
}
