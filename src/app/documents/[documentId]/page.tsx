import Editor from "@/components/Editor";
import Toolbar from "@/components/Toolbar";

interface DocIdPros {
  params: Promise<{ documentId: string }>;
}

export default async function page({ params }: DocIdPros) {
  const { documentId } = await params;
  console.log(documentId);
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <div className="bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
        <Toolbar />
      </div>
      <Editor />
    </div>
  );
}
