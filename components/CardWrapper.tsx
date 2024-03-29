import { cn } from "@/lib/utils";

interface CardWrapperProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const CardWrapper = ({
  children,
  size = "md",
  className,
}: CardWrapperProps) => {
  return (
    <div
      className={cn(
        "w-full max-w-md rounded-lg bg-zinc-800 px-4 py-8 shadow-[0_0_12px] shadow-black/25 sm:px-6 sm:py-10 md:px-8 md:py-12",
        {
          "max-w-sm": size === "sm",
          "max-w-lg": size === "lg",
          "max-w-xl": size === "xl",
          className,
        },
      )}
    >
      {children}
    </div>
  );
};

export default CardWrapper;
