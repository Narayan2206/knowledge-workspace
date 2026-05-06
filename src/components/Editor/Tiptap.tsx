"use client";

import { useEditor, EditorContent, Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Tiptap = ({content, onChange}: {content:Content | null; onChange: (content: Content) => void;}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content ?? undefined,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onChange(json);
    },
  });

  return <EditorContent editor={editor} className="flex-1" />;
};

export default Tiptap;
