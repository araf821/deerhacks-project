import Link from "next/link";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { port } from "@/lib/font";

export default async function Home() {
  return (
    <div className={cn("relative h-full", port.className)}>
      <Image
        alt="landing page background"
        sizes="100vw"
        fill
        priority
        className="-z-10 object-cover"
        src={"/landing.webp"}
      />

      <div className="mx-auto w-fit px-4 pt-40">
        <Image
          src="/edumates.webp"
          alt="edumates logo"
          width={600}
          height={100}
        />
        <h2 className="py-8 text-center text-2xl md:text-3xl lg:text-4xl">
          Find Your Perfect Study Match
        </h2>

        <div className="flex items-center justify-center gap-4 max-sm:flex-col sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24">
          <Link
            className="w-40 rounded-xl border-2 border-zinc-800 bg-zinc-800 px-4 py-2 text-center text-xl text-white transition hover:scale-125 max-sm:w-56 md:text-2xl"
            href="/auth/login"
          >
            Log in
          </Link>
          <Link
            className="w-40 rounded-xl border-2 border-black bg-white px-4 py-2 text-center text-xl text-black transition hover:scale-125 max-sm:w-56 md:text-2xl"
            href="/auth/register"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
