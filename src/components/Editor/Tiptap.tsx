"use client";

import { useEditor, EditorContent, Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Toolbar from "./Toolbar";

const Tiptap = ({
  content,
  onChange,
  editable = true,
}: {
  content: Content | null;
  onChange: (content: Content) => void;
  editable?: boolean;
}) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editable,
    content: content ?? undefined,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onChange(json);
    },
  });

  return (
    <div className="flex flex-col w-full gap-1">
      { editable && (<Toolbar editor={editor} />)}
      <EditorContent editor={editor} className="flex-1" />
    </div>
  );
};

export default Tiptap;
