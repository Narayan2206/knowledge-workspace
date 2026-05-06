"use client";
import CustomInput from "@/components/CustomInput/CustomInput";
import Tiptap from "@/components/Editor/Tiptap";
import { workspaceDocumentService } from "@/lib/services";
import { getClientSupabase } from "@/lib/supabase/client";
import { Documents } from "@/lib/supabase/models";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DocumentEditor({ document }: { document: Documents }) {
  const [title, setTitle] = useState(document.title);
  const [content, setContent] = useState(document.content);
  const supabase = getClientSupabase();
  const router = useRouter();
  console.log("DOCUMENT CLIENT ", document);

  const saveDocument = async () => {
    try {
      const payload = {
        title: title.length === 0 ? "Untitled Document" : title,
        content,
      };
      await workspaceDocumentService.updateDocument(
        supabase,
        document.id,
        payload,
        document.workspace_id,
      );
      router.refresh();
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
      <div className="mb-4">
        <CustomInput
          value={title}
          onChange={setTitle}
          placeholder="Untitled Document"
        />
      </div>

      <div className="min-h-[50vh] flex">
        <Tiptap content={content} onChange={setContent} />
      </div>
    </div>
  );
}
