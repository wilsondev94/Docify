"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

import Editor from "@/components/documentIdPageComps/Editor";
import DocIdNavbar from "@/components/documentIdPageComps/DocIdNavbar";
import Toolbar from "@/components/documentIdPageComps/Toolbar";
import { Room } from "@/components/documentIdPageComps/Room";

interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
}

export function Document({ preloadedDocument }: DocumentProps) {
  const document = usePreloadedQuery(preloadedDocument);

  return (
    <Room>
      <div className="min-h-screen ">
        <div className=" flex flex-col px-4 py-3 gap-y-2 fixed top-0 left-0 right-0 z-10  print:hidden bg-gray-100 dark:bg-gray-950 dark:shadow-sm xsm:h-[160px] sm:h-[120px]">
          <DocIdNavbar documentData={document} />
          <Toolbar />
        </div>
        <div className="pt-[114px] prin:pt-0 xsm:pt-[130px] sm:pt-[114px]">
          <Editor initialContent={document.initialContent} />
        </div>
      </div>
    </Room>
  );
}
