import Navbar from "@/components/navbar/Navbar";

interface layoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: layoutProps) => {
  return (
    <div className="flex h-full flex-col bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-yellow-50 via-orange-400 to-yellow-50">
      <Navbar />
      <main className="mt-16 flex-1">{children}</main>
    </div>
  );
};

export default layout;
