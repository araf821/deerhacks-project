import { signOut } from "@/auth";

interface LogoutButtonProps {}

const LogoutButton = ({}: LogoutButtonProps) => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button>Logout</button>
    </form>
  );
};

export default LogoutButton;
