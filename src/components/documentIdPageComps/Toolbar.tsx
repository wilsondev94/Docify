"use client";

import { useEditorStore } from "@/store/useEditorStore";
import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheck,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { Separator } from "../ui/separator";
import {
  AlignBtn,
  FontFamilyBtn,
  FontSizeBtn,
  HeadingBtn,
  HighlightColorBtn,
  ImageBtn,
  LineHeightBtn,
  LinkBtn,
  ListBtn,
  TextColorBtn,
  ToolbarBtn,
} from "./ToolbarBtns";

interface sectionsType {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
}

export default function Toolbar() {
  const { editor } = useEditorStore();

  const sections: sectionsType[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheck,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");

          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
    ],

    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        isActive: editor?.isActive("liveblocksCommentMark"),
        onClick: () => editor?.chain().focus().addPendingComment().run(),
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        isActive: editor?.isActive("taskList"),
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <div className="w-full overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide right-[0.5rem] left-[0.3rem] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center xsm:justify-start sm:justify-center gap-x-0 bg-gray-200 dark:text-gray-300 dark:bg-gray-900 xsm:absolute xsm:top-28 sm:absolute sm:top-[4.5rem]">
      {sections[0].map((item) => (
        <ToolbarBtn key={item.label} {...item} />
      ))}
      <Separator
        orientation="vertical"
        className="h-6 bg-neutral-300 dark:bg-gray-500"
      />
      <FontFamilyBtn />
      <Separator
        orientation="vertical"
        className="h-6 bg-neutral-300 dark:bg-gray-500"
      />
      <HeadingBtn />
      <Separator
        orientation="vertical"
        className="h-6 bg-neutral-300 dark:bg-gray-500"
      />
      <FontSizeBtn />

      {sections[1].map((item) => (
        <ToolbarBtn key={item.label} {...item} />
      ))}
      <TextColorBtn />
      <HighlightColorBtn />
      <Separator
        orientation="vertical"
        className="h-6 bg-neutral-300 dark:bg-gray-500"
      />
      <LinkBtn />
      <ImageBtn />
      <AlignBtn />
      <LineHeightBtn />
      <ListBtn />
      {sections[2].map((item) => (
        <ToolbarBtn key={item.label} {...item} />
      ))}
    </div>
  );
}
