import input_image from "./Edumates.png";

import "./style.css";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  return (
    <div>
      <div className="center"></div>
      <Image
        alt=""
        width={808}
        height={371}
        className="mx-auto"
        src={input_image}
      />{" "}
      <div />
      <div className="center">
        <form
          action={async () => {
            "use server";
            redirect("/auth/login");
          }}
        >
          <button type="submit">Log in</button>
        </form>
      </div>
      <div className="center">
        <form
          action={async () => {
            "use server";
            redirect("/auth/register");
          }}
        >
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}
