"use client";

import { usePaginatedQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

import TemplatesGAllery from "@/components/HomeComps/TemplatesGAllery";
import DocumentsTable from "@/components/HomeComps/DocumentsTable";
import HomeNavbar from "@/components/HomeComps/HomeNavbar";
import { useSearchParams } from "@/hooks/useSearchParam";

export default function Home() {
  const [search] = useSearchParams();

  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.get,
    { search },
    { initialNumItems: 5 }
  );

  return (
    <div className="flex min-h-screen flex-col">
      <div className="p-4 fixed top-0 left-0 right-0 z-10 h-16 bg-gray-100 shadow shadow-gray-200 dark:shadow-gray-900 dark:bg-gray-950">
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
