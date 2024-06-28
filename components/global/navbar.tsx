"use client";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  const pathname = usePathname();
  return (
    <header
      className="fixed right-0 left-0 top-0 py-4 px-4 bg-white/90 backdrop-blur-lg z-[100] flex items-center border-b-[1px]
     border-neutral-900 justify-between"
    >
      <aside className="flex items-center gap-[2px]">
        <Image
          src={"/logo.png"}
          height={50}
          width={150}
          alt={"logo"}
          className="shadow-sm"
        />
      </aside>
      <nav className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] hidden md:block">
        <ul className="flex items-center gap-4 list-none text-black">
          <li className="hover:scale-105 hover:text-blue-800 duration-300 transition-all ease-in-out hover:animate-pulse">
            <Link href="/">ANASAYFA</Link>
          </li>
          <li className="hover:scale-105 hover:text-blue-800 duration-300 transition-all ease-in-out hover:animate-pulse">
            <Link href="#about">FORMOLOG HAKKINDA</Link>
          </li>
          <li className="hover:scale-105 hover:text-blue-800 duration-300 transition-all ease-in-out hover:animate-pulse">
            <Link href="#features">HANGİ FORMOLOGSUN?</Link>
          </li>

          <li className="hover:scale-105 hover:text-blue-800 duration-300 transition-all ease-in-out hover:animate-pulse">
            <Link href="#form">BAŞVURU</Link>
          </li>
        </ul>
      </nav>
      <aside className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="relative group inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Dashboard
          </span>
        </Link>

        <MenuIcon className="md:hidden" />
      </aside>
    </header>
  );
};

export default Navbar;
