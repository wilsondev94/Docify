"use client";

import HomeNavbar from "@/components/HomeComps/HomeNavbar";
import TemplatesGAllery from "@/components/HomeComps/TemplatesGAllery";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const documents = useQuery(api.documents.get);

  if (documents === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="p-4 fixed top-0 left-0 right-0 z-10 h-16 bg-white">
        <HomeNavbar />
      </div>
      <div className="mt-16">
        <TemplatesGAllery />
        {documents?.map((document) => (
          <span key={document._id}>{document.title}</span>
        ))}
      </div>
    </div>
  );
}
