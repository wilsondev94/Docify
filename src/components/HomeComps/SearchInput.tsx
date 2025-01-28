"use client";

import { useRef, useState } from "react";
import { SearchIcon, XIcon } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSearchParams } from "@/hooks/useSearchParam";

export default function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useSearchParams();
  const [value, setValue] = useState(search);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  };

  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClearInputValue = () => {
    setValue("");
    setSearch("");
    inputRef.current?.blur();
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <form className="relative max-w-[720px]  w-full" onSubmit={handleSubmit}>
        <Input
          value={value}
          onChange={handleChangeInputValue}
          placeholder="Search..."
          className="md:text-base placeholder:text-neutral-800 px-14  w-full border-none focus-visible:shadow[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-[#f0f4f8] dark:bg-gray-900 placeholder:dark:text-gray-500
          dark:text-gray-200
          rounded-full h-[48px] focus-visible:ring-0 focus:bg-white"
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="dark:text-gray-200 absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
        >
          <SearchIcon />
        </Button>
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full dark:text-gray-200"
            onClick={handleClearInputValue}
          >
            <XIcon />
          </Button>
        )}
      </form>
    </div>
  );
}
