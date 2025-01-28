"use client";

import HomeNavbar from "@/components/HomeComps/HomeNavbar";
import TemplatesGAllery from "@/components/HomeComps/TemplatesGAllery";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import DocumentsTable from "@/components/HomeComps/DocumentsTable";

export default function Home() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.get,
    {},
    { initialNumItems: 5 }
  );

  return (
    <div className="flex min-h-screen flex-col">
      <div className="p-4 fixed top-0 left-0 right-0 z-10 h-16 dark:bg-gray-950">
        <HomeNavbar />
      </div>
      <div className="mt-16">
        <TemplatesGAllery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  );
}
