"use client";

import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import { Id } from "../../../convex/_generated/dataModel";
import { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";
import { useStatus } from "@liveblocks/react";
import { Loader } from "lucide-react";

interface DocumentInputProps {
  title: string;
  id: Id<"documents">;
}
export default function DocumentInput({ title, id }: DocumentInputProps) {
  const status = useStatus();

  const [value, setValue] = useState(title);

  const [isPending, setIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const updateDocName = useMutation(api.documents.updateById);

  const debounceUpdate = useDebounce((newValue: string) => {
    if (newValue === title) return;

    setIsPending(true);

    updateDocName({ id, title: newValue })
      .then(() => toast.success("Document updated"))
      .catch(() => toast.error("Something went wrong."))
      .finally(() => setIsPending(false));
  });

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    setValue(newValue);
    debounceUpdate(newValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsPending(true);

    updateDocName({ id, title: value })
      .then(() => {
        toast.success("Document updated");
        setIsEditing(false);
      })
      .catch(() => toast.error("Something went wrong."))
      .finally(() => setIsPending(false));
  };

  const showLoader =
    isPending || status === "connecting" || status === "reconnecting";
  const showError = status === "disconnected";

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="relative w-fit max-w-[50ch]">
          <span className="invisible whitespace-pre px-1.5 text-lg">
            {value || ""}
          </span>
          <input
            ref={inputRef}
            value={value}
            onBlur={() => setIsEditing(false)}
            onChange={onChangeInputValue}
            className="absolute inset-0 text-lg text-black dark:text-white px-1.5 bg-transparent truncate focus:ring-0"
          />
        </form>
      ) : (
        <span
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
          className="text-lg px-1.5 cursor-pointer truncate"
        >
          {title}
        </span>
      )}
      {showError && <BsCloudSlash className="size-4" />}
      {!showError && !showLoader && <BsCloudCheck />}
      {showLoader && (
        <Loader className="size-4 animate-spin text-muted-foreground" />
      )}
    </div>
  );
}
