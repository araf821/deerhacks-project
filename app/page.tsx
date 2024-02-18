import LogoutButton from "@/components/auth/LogoutButton";
import { currentUser } from "@/lib/data/user";
import input_image from "./Edumates.png";

import "./style.css"
import Image from "next/image";

export default async function Home() {
  const user = await currentUser();

  return (
    <div>
      {user?.name || "No user"}
      <div className="center">
      </div><Image alt="" width={808} height={371} className="mx-auto" src={input_image} /> <div/>
      <div className="center"><LogoutButton /></div>
      <div className="center"><button type="button">Sign</button> </div>
    </div>
  );
}
