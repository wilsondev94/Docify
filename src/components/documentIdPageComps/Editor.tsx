"use client";

import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Color } from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";

import { FontSizeExtension } from "@/extensions/fontSize";
import { LineHeightExtension } from "@/extensions/lineHeight";
import { useEditorStore } from "@/store/useEditorStore";

import { useLiveblocksExtension } from "@liveblocks/react-tiptap";

import {
  DEFAULT_LEFT_MARGIN,
  DEFAULT_RIGHT_MARGIN,
} from "@/constants/marginDefaults";
import { useStorage } from "@liveblocks/react";
import Ruler from "./Ruler";
import { Threads } from "./Threads";

interface EditorProps {
  initialContent?: string | undefined;
}

export default function Editor({ initialContent }: EditorProps) {
  const leftMargin =
    useStorage((root) => root.leftMargin) ?? DEFAULT_LEFT_MARGIN;
  const rightMargin =
    useStorage((root) => root.rightMargin) ?? DEFAULT_RIGHT_MARGIN;

  const liveblocks = useLiveblocksExtension({
    initialContent,
    offlineSupport_experimental: true,
  });
  const { setEditor } = useEditorStore();

  const editor = useEditor({
    autofocus: true,
    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onUpdate({ editor }) {
      setEditor(editor);
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor);
    },
    onTransaction({ editor }) {
      setEditor(editor);
    },
    onFocus({ editor }) {
      setEditor(editor);
    },
    onBlur({ editor }) {
      setEditor(editor);
    },
    onContentError({ editor }) {
      setEditor(editor);
    },
    editorProps: {
      attributes: {
        style: `padding-left: ${leftMargin}px; padding-right:${rightMargin}px;`,
        class:
          "focus:outline-none print:border-0 bg-white dark:bg-gray-950 border border-[#C7C7C7] dark:border-gray-700 dark:print:border-0 flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text dark:text-white",
      },
    },
    extensions: [
      liveblocks,
      StarterKit.configure({
        history: false,
      }),
      FontSizeExtension,
      LineHeightExtension.configure({
        types: ["heading", "paragraph"],
        defaultLineHeight: "normal",
      }),
      Image,
      // ImageResize,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Underline,
      FontFamily,
      TextStyle,
      Highlight.configure({ multicolor: true }),
      Color,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],

    immediatelyRender: false,
  });

  return (
    <div className="size-full overflow-x-auto bg-[#fbfcfc] dark:bg-black p-4 print:p-0 print:bg-white print:overflow-visible mt-3">
      <Ruler />
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0 bg-[#fbfcfc] dark:bg-black dark:text-black">
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  );
}
