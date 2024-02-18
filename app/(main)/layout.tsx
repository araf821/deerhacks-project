import Navbar from "@/components/navbar/Navbar";

interface layoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: layoutProps) => {
  return (
    <div className="flex h-full flex-col bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-200 via-red-500 to-fuchsia-500">
      <Navbar />
      <main className="mt-16 flex-1">{children}</main>
    </div>
  );
};

export default layout;
