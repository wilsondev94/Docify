import { BsCloudCheck } from "react-icons/bs";

export default function DocumentInput() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg px-1.5 cursor-pointer truncate">
        Untitled Document
      </span>
      <BsCloudCheck />
    </div>
  );
}
