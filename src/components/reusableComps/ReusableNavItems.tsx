import { ChevronDown, ChevronUp, MoonIcon, SunIcon } from "lucide-react";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";

import { useDarkModeStore } from "@/store/darkModeStore";
import { useUserAccToggleStore } from "@/store/userAccToggleStore";

export default function ReusableNavItems() {
  const { isDarkMode, setIsDarkMode } = useDarkModeStore();
  const { isUserAccToggle, setIsUserAccToggle } = useUserAccToggleStore();

  return (
    <>
      <div className="flex gap-3 items-center pl-6">
        <Menubar
          className="sm:hidden bg-gray-300 dark:bg-gray-900 border-none
        "
        >
          <MenubarMenu>
            <MenubarTrigger
              className="text-sm  font-normal py-0.5 px-[5px] rounded-sm h-auto sm:hidden bg-gray-300 text-gray-950
              dark:bg-gray-900
              dark:text-gray-100
              cursor-pointer
              data-[state=open]:text-gray-700 dark:data-[state=open]:bg-gray-800 dark:data-[state=open]:text-gray-300
              "
              onClick={() => setIsUserAccToggle(!isUserAccToggle)}
            >
              {isUserAccToggle ? (
                <ChevronDown className="size-4 mr-2" />
              ) : (
                <ChevronUp className="size-4 mr-2" />
              )}{" "}
              Users
            </MenubarTrigger>

            <MenubarContent>
              <MenubarItem className="flex gap-3 items-center">
                <div className=" dark:bg-gray-300 rounded-full">
                  <OrganizationSwitcher
                    afterCreateOrganizationUrl="/"
                    afterLeaveOrganizationUrl="/"
                    afterSelectOrganizationUrl="/"
                    afterSelectPersonalUrl="/"
                  />
                </div>
                <UserButton />
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <>
          <div className=" dark:bg-gray-300 rounded-full hidden sm:block">
            <OrganizationSwitcher
              afterCreateOrganizationUrl="/"
              afterLeaveOrganizationUrl="/"
              afterSelectOrganizationUrl="/"
              afterSelectPersonalUrl="/"
            />
          </div>
          <div className="hidden  sm:flex items-center">
            <UserButton />
          </div>
        </>
      </div>

      <button onClick={() => setIsDarkMode(!isDarkMode)} className="pl-4">
        {isDarkMode ? (
          <SunIcon className="size-6 cursor-pointer dark:text-white" />
        ) : (
          <MoonIcon className="size-6 text-gray-950 cursor-pointer" />
        )}
      </button>
    </>
  );
}
