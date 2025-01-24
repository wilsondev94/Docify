import Editor from "@/components/Editor";

interface DocIdPros {
  params: Promise<{ documentId: string }>;
}

export default async function page({ params }: DocIdPros) {
  const { documentId } = await params;
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <Editor />
    </div>
  );
}
