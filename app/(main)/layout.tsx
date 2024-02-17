import Navbar from "@/components/navbar/Navbar";

interface layoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: layoutProps) => {
  return (
    <div className="flex h-full flex-col bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-orange-900 via-amber-100 to-orange-900">
      <Navbar />
      <main className="mt-16 flex-1">{children}</main>
    </div>
  );
};

export default layout;
