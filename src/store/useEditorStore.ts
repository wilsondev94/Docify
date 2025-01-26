import { create } from "zustand";
import { type Editor } from "@tiptap/react";

interface EditorState {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
}));

// export const useStore = create((set) => ({
//   darkMode: false,
//   toggleDarkMode: () => set((state) => ({ darkMode: (state.darkMode = true) })),
// }));
