import { preloadQuery } from "convex/nextjs";
import { auth } from "@clerk/nextjs/server";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

import { Document } from "@/components/documentIdPageComps/Document";

interface DocIdProps {
  params: Promise<{ documentId: Id<"documents"> }>;
}

export default async function page({ params }: DocIdProps) {
  const { documentId } = await params;

  const { getToken } = await auth();
  const token = (await getToken({ template: "convex" })) ?? undefined;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const preloadedDocument = await preloadQuery(
    api.documents.getById,
    {
      id: documentId,
    },
    { token }
  );

  return <Document preloadedDocument={preloadedDocument} />;
}
