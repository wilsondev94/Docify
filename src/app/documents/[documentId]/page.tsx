import Editor from "@/components/documentIdPageComps/Editor";
import DocIdNavbar from "@/components/documentIdPageComps/DocIdNavbar";
import Toolbar from "@/components/documentIdPageComps/Toolbar";
import { Room } from "@/components/documentIdPageComps/Room";

interface DocIdPros {
  params: Promise<{ documentId: string }>;
}

export default async function page({ params }: DocIdPros) {
  const { documentId } = await params;
  console.log(documentId);
  return (
    <div className="min-h-screen ">
      <div className="flex flex-col px-4 py-3 gap-y-2 fixed top-0 left-0 right-0 z-10  print:hidden bg-gray-100 dark:bg-gray-950">
        <DocIdNavbar />
        <Toolbar />
      </div>
      <div className="pt-[114px] prin:pt-0">
        <Room>
          <Editor />
        </Room>
      </div>
    </div>
  );
}
