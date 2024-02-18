import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduMates",
  description:
    "Discover your perfect study group with EduMates, where collaboration meets fun in learning. Connect with peers, share knowledge, and achieve your academic goals together. Elevate your study experience and make learning a shared adventure. Join EduMates now and turn study sessions into opportunities for success!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={cn("flex min-h-[100dvh]", poppins.className)}>
        <Toaster
          richColors
          theme="dark"
          position="bottom-center"
          duration={2500}
        />
        <SessionProvider session={session}>
          <div className="flex-1">{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
