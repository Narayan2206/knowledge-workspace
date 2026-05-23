// toolbar-state.ts

import type { Editor } from "@tiptap/core";
import type { EditorStateSnapshot } from "@tiptap/react";

export function menuBarStateSelector(
  ctx: EditorStateSnapshot<Editor | null>
) {
  const editor = ctx.editor;

  if (!editor) {
    return {
      isBold: false,
      canBold: false,

      isItalic: false,
      canItalic: false,

      isUnderline: false,
      canUnderline: false,

      isStrike: false,
      canStrike: false,

      isBulletList: false,
      isOrderedList: false,
    };
  }

  return {
    isBold: editor.isActive("bold"),
    canBold: editor.can().chain().toggleBold().run(),

    isItalic: editor.isActive("italic"),
    canItalic: editor.can().chain().toggleItalic().run(),

    isUnderline: editor.isActive("underline"),
    canUnderline: editor.can().chain().toggleUnderline().run(),

    isStrike: editor.isActive("strike"),
    canStrike: editor.can().chain().toggleStrike().run(),

    isBulletList: editor.isActive("bulletList"),
    isOrderedList: editor.isActive("orderedList"),
  };
}

export type MenuBarState =
  ReturnType<typeof menuBarStateSelector>;