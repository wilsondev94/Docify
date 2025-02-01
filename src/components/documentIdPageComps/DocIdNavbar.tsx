"use client";

import Image from "next/image";
import Link from "next/link";
import { BsFilePdf } from "react-icons/bs";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../ui/menubar";

import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";

import { useEditorStore } from "@/store/useEditorStore";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";
import { Doc } from "../../../convex/_generated/dataModel";
import RemoveDialog from "../reusableComps/RemoveDialog";
import RenameDialog from "../reusableComps/RenameDialog";
import ReusableNavItems from "../reusableComps/ReusableNavItems";
import { Avatars } from "./Avatar";
import DocumentInput from "./DocumentInput";
import Inbox from "./Inbox";

interface DocIdNavbarProps {
  documentData: Doc<"documents">;
}

export default function DocIdNavbar({ documentData }: DocIdNavbarProps) {
  const router = useRouter();

  const { editor } = useEditorStore();

  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({
        rows,
        cols,
        withHeaderRow: false,
      })
      .run();
  };

  const onDownload = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
  };

  const onSaveJSON = () => {
    if (!editor) return;

    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });

    onDownload(blob, `${documentData.title}.json`);
  };

  const onSaveHTML = () => {
    if (!editor) return;

    const content = editor.getHTML();
    const blob = new Blob([content], {
      type: "text/html",
    });

    onDownload(blob, `${documentData.title}.html`);
  };

  const onSaveText = () => {
    if (!editor) return;

    const content = editor.getText();
    const blob = new Blob([content], {
      type: "text/plain",
    });

    onDownload(blob, `${documentData.title}.txt`);
  };

  const mutation = useMutation(api.documents.create);

  const onNewDocument = () => {
    mutation({
      title: "Untitled document",
      initialContent: "",
    })
      .catch(() => toast.error("Something went wrong"))
      .then((id) => {
        console.log(id);
        toast.success("Document created");
        router.push(`/documents/${id}`);
      });
  };

  return (
    <nav className=" flex items-center justify-between dark:text-gray-200">
      <div className="flex gap-4 items-center">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="logo"
            width={40}
            height={40}
            className="bg-gray-400 dark:bg-gray-100 rounded-full"
          />
        </Link>
        <div className="flex flex-col xsm:absolute xsm:top-[3.5rem] sm:absolute sm:top-2 sm:left-[5rem]">
          <DocumentInput title={documentData.title} id={documentData._id} />
          <div className="flex">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              <MenubarMenu>
                <MenubarTrigger
                  className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-gray-300 dark:hover:bg-gray-900 h-auto
                data-[state=open]:bg-gray-400
                dark:data-[state=open]:bg-gray-600
                data-[state=open]:text-accent-foreground

                "
                >
                  File
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className="size-4 mr-2" />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={onSaveJSON}>
                        <FileJsonIcon className="size-4 mr-2" />
                        JSON
                      </MenubarItem>

                      <MenubarItem onClick={onSaveHTML}>
                        <GlobeIcon className="size-4 mr-2" />
                        HTML
                      </MenubarItem>

                      <MenubarItem onClick={() => window.print()}>
                        <BsFilePdf className="size-4 mr-2" />
                        PDF
                      </MenubarItem>

                      <MenubarItem onClick={onSaveText}>
                        <FileTextIcon className="size-4 mr-2" />
                        TEXT
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarItem onClick={onNewDocument}>
                    <FilePlusIcon className="size-4 mr-2" /> New Document
                  </MenubarItem>

                  <MenubarSeparator />

                  <RenameDialog
                    documentId={documentData._id}
                    initialTitle={documentData.title}
                  >
                    <MenubarItem
                      onClick={(e) => e.stopPropagation()}
                      onSelect={(e) => e.preventDefault()}
                    >
                      <FilePenIcon className="size-4 mr-2" /> Rename
                    </MenubarItem>
                  </RenameDialog>

                  <MenubarSeparator />

                  <RemoveDialog documentId={documentData._id}>
                    <MenubarItem
                      onClick={(e) => e.stopPropagation()}
                      onSelect={(e) => e.preventDefault()}
                    >
                      <TrashIcon className="size-4 mr-2" /> Remove
                    </MenubarItem>
                  </RemoveDialog>

                  <MenubarSeparator />

                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className="size-4 mr-2" /> Print{" "}
                    <MenubarShortcut>&#8984;P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger
                  className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-gray-300 dark:hover:bg-gray-900 h-auto
                data-[state=open]:bg-gray-400
                dark:data-[state=open]:bg-gray-600
                data-[state=open]:text-accent-foreground"
                >
                  Edit
                </MenubarTrigger>

                <MenubarContent>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().undo().run()}
                  >
                    <Undo2Icon className="size-4 mr-2" />
                    Undo <MenubarShortcut>&#8984;Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().redo().run()}
                  >
                    <Redo2Icon className="size-4 mr-2" />
                    Redo <MenubarShortcut>&#8984;Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger
                  className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-gray-300 dark:hover:bg-gray-900 h-auto
                data-[state=open]:bg-gray-400
                dark:data-[state=open]:bg-gray-600
                data-[state=open]:text-accent-foreground"
                >
                  Insert
                </MenubarTrigger>

                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>Table</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 1, cols: 1 })}
                      >
                        1 x 1
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 2, cols: 2 })}
                      >
                        2 x 2
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 3, cols: 3 })}
                      >
                        3 x 3
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 4, cols: 4 })}
                      >
                        4 x 4
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger
                  className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-gray-300 dark:hover:bg-gray-900 h-auto
                data-[state=open]:bg-gray-400
                dark:data-[state=open]:bg-gray-600
                data-[state=open]:text-accent-foreground"
                >
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className="size-4 mr-2" /> Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleBold().run()
                        }
                      >
                        <BoldIcon className="size-4 mr-2" />
                        Bold<MenubarShortcut>&#8984;B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleItalic().run()
                        }
                      >
                        <ItalicIcon className="size-4 mr-2" />
                        Italic <MenubarShortcut>&#8984;I</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleUnderline().run()
                        }
                      >
                        <UnderlineIcon className="size-4 mr-2" />
                        Underline <MenubarShortcut>&#8984;U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleStrike().run()
                        }
                      >
                        <StrikethroughIcon className="size-4 mr-2" />
                        <span>Strikethrough &nbsp;</span>
                        <MenubarShortcut>&#8984;S</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem
                    onClick={() =>
                      editor?.chain().focus().unsetAllMarks().run()
                    }
                  >
                    <RemoveFormattingIcon className="size-4 mr-2" /> Clear
                    Formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center pl-2">
        <Avatars />
        <Inbox />

        <ReusableNavItems />
      </div>
    </nav>
  );
}
