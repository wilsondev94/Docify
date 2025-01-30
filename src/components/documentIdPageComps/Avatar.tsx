"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import { useOthers, useSelf } from "@liveblocks/react/suspense";

import { Separator } from "../ui/separator";

const AVATAR_SIZE = 36;

export const Avatars = () => {
  return (
    <ClientSideSuspense fallback={null}>
      <AvatarStack />
    </ClientSideSuspense>
  );
};

const AvatarStack = () => {
  const users = useOthers();
  const currentUser = useSelf();

  if (users.length === 0) return null;

  return (
    <>
      <div className="flex items-center ">
        {currentUser && (
          <div
            className="relative ,l2
      "
          >
            <Avatar src={currentUser.info.avatar} name="You" />
          </div>
        )}

        <div className="flex">
          {users.map(({ connectionId, info }) => {
            return (
              <Avatar key={connectionId} src={info.avatar} name={info.name} />
            );
          })}
        </div>
      </div>
      <Separator orientation="vertical" className="h-6" />
    </>
  );
};

interface AvatarProps {
  src: string;
  name: string;
}

function Avatar({ src, name }: AvatarProps) {
  console.log(name, src);
  return (
    <div
      style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
      className="group -ml-2 flex shrink-0 place-content-center relative border-4 border-gray-300 dark:border-gray-400 rounded-full  dark:bg-gray-800"
    >
      <div className="opacity-0 group-hover:opacity-100 absolute top-full py-1 px-2 text-white dark:text-black text-xs rounded-lg mt-2.5 z-10 bg-black dark:bg-white whitespace-nowrap transition-opacity">
        {name}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={name} className="w-full rounded-full" />
    </div>
  );
}
