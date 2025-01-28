import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import SearchInput from "./SearchInput";

import { MoonIcon, SunIcon } from "lucide-react";
import { useDarkModeStore } from "@/store/darkModeStore";

export default function HomeNavbar() {
  const { isDarkMode, setIsDarkMode } = useDarkModeStore();

  return (
    <nav className="flex items-center justify-between h-full w-full ">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="logo"
            width={40}
            height={40}
            className="bg-gray-400 dark:bg-gray-100 rounded-full"
          />
        </Link>
        <h3 className="text-xl">Docs</h3>
      </div>
      <SearchInput />
      <UserButton />

      <button onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? (
          <SunIcon className="size-6 cursor-pointer dark:text-white" />
        ) : (
          <MoonIcon className="size-6 cursor-pointer" />
        )}
      </button>
    </nav>
  );
}
