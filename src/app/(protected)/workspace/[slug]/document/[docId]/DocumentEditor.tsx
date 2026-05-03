"use client";
import CustomInput from "@/components/CustomInput/CustomInput";
import Tiptap from "@/components/Editor/Tiptap";
import { workspaceDocumentService } from "@/lib/services";
import { getClientSupabase } from "@/lib/supabase/client";
import { Documents } from "@/lib/supabase/models";
import { useEffect, useState } from "react";

export default function DocumentEditor({ document }: { document: Documents }) {
  const [title, setTitle] = useState(document.title);
  const [content, setContent] = useState(document.content);
  const supabase = getClientSupabase();
  console.log("DOCUMENT CLIENT ", document);

  const saveDocument = async () => {
  try {
    await workspaceDocumentService.updateDocument(
      supabase,
      document.id,
      {
        title,
        content,
      },
      document.workspace_id
    );
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
  const timeout = setTimeout(() => {
    saveDocument();
  }, 1000);

  return () => clearTimeout(timeout);
}, [title, content]);

  return (
    <div>
      <CustomInput value={title} onChange={setTitle} />

      <Tiptap content={content} onChange={setContent} />
    </div>
  );
}
