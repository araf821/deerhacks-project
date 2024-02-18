import LogoutButton from "@/components/auth/LogoutButton";
import input_image from "./Edumates.png";

import "./style.css";
import Image from "next/image";

export default async function Home() {
  return (
    <div>
      <div className="center"></div>
      <Image
        alt="EduMates"
        width={808}
        height={371}
        className="mx-auto"
        src={input_image}
      />{" "}
      <div />
      <div className="center">
        <LogoutButton />
      </div>
      <div className="center">
        <button type="button">Sign</button>{" "}
      </div>
    </div>
  );
}
