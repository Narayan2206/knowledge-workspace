"use client";

import { useEditor, EditorContent, Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Tiptap = ({content, onChange, editable=true}: {content:Content | null; onChange: (content: Content) => void; editable?: boolean;}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editable,
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
