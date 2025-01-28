import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import SearchInput from "./SearchInput";

export default function HomeNavbar() {
  return (
    <nav className="flex items-center justify-between h-full w-full">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={40} height={40} />
        </Link>
        <h3 className="text-xl">Docs</h3>
      </div>
      <SearchInput />
      <UserButton />
    </nav>
  );
}
