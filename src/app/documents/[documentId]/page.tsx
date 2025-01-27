import Editor from "@/components/Editor";
import Navbar from "@/components/Navbar";
import Toolbar from "@/components/Toolbar";

interface DocIdPros {
  params: Promise<{ documentId: string }>;
}

export default async function page({ params }: DocIdPros) {
  const { documentId } = await params;
  console.log(documentId);
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#fafbfd] print:hidden">
        <Navbar />
        <Toolbar />
      </div>
      <div className="pt-[114px] prin:pt-0">
        <Editor />
      </div>
    </div>
  );
}
