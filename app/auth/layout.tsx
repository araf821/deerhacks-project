interface layoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: layoutProps) => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-200 via-red-500 to-fuchsia-500 px-4 py-12">
      {children}
    </div>
  );
};

export default layout;
