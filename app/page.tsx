import LogoutButton from "@/components/auth/LogoutButton";
import { currentUser } from "@/lib/data/user";

export default async function Home() {
  const user = await currentUser();

  return (
    <main>
      {user?.name || "No user"}
      <LogoutButton />
    </main>
  );
}
