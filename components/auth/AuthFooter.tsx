import { toast } from "sonner";

interface AuthFooterProps {}

const AuthFooter = ({}: AuthFooterProps) => {
  const onClick = () => {
    toast.info("Coming soon!");
  };

  return (
    <div className="flex items-center gap-2 text-center text-xs text-zinc-500 md:text-sm">
      <button
        onClick={onClick}
        className="transition-colors hover:text-zinc-200"
      >
        Help
      </button>
      |
      <button
        onClick={onClick}
        className="transition-colors hover:text-zinc-200"
      >
        Privacy Policy
      </button>
      |
      <button
        onClick={onClick}
        className="transition-colors hover:text-zinc-200"
      >
        Terms
      </button>
    </div>
  );
};

export default AuthFooter;
