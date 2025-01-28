import { Doc } from "../../../convex/_generated/dataModel";
import { TableCell, TableRow } from "../ui/table";

import { SiGoogledocs } from "react-icons/si";
interface DocumentRowProps {
  document: Doc<"documents">;
}

export default function DocumentRow({ document }: DocumentRowProps) {
  return (
    <TableRow className="cursor-pointer">
      <TableCell className="w-[50px]">
        <SiGoogledocs className="size-6 fill-blue-500" />
      </TableCell>
      <TableCell className="font-medium md:45% dark:text-gray-200">
        {document.title}
      </TableCell>
    </TableRow>
  );
}
