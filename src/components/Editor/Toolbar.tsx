"use client";

import { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";

import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { menuBarStateSelector } from "./toolbar-state";

type Props = {
  editor: Editor | null;
};

export default function Toolbar({ editor }: Props) {
  const editorState = useEditorState({
    editor,
    selector: menuBarStateSelector,
  });

  if (!editor || !editorState) {
    return null;
  }

  return (
    <div className="sticky top-0 z-10 flex gap-1 border-b p-2 bg-background/95 backdrop-blur">
      <Button
        type="button"
        size="icon"
        variant={editorState.isBold ? "default" : "ghost"}
        disabled={!editorState.canBold}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="size-4" />
      </Button>

      <Button
        type="button"
        size="icon"
        variant={editorState.isItalic ? "default" : "ghost"}
        disabled={!editorState.canItalic}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="size-4" />
      </Button>

      <Button
        type="button"
        size="icon"
        variant={editorState.isUnderline ? "default" : "ghost"}
        disabled={!editorState.canUnderline}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline className="size-4" />
      </Button>

      <Button
        type="button"
        size="icon"
        variant={editorState.isStrike ? "default" : "ghost"}
        disabled={!editorState.canStrike}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="size-4" />
      </Button>

      <div className="w-px bg-border mx-2" />

      <Button
        type="button"
        size="icon"
        variant={editorState.isBulletList ? "default" : "ghost"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="size-4" />
      </Button>

      <Button
        type="button"
        size="icon"
        variant={editorState.isOrderedList ? "default" : "ghost"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="size-4" />
      </Button>
    </div>
  );
}
