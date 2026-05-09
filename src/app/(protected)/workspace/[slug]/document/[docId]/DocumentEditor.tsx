"use client";
import CustomInput from "@/components/CustomInput/CustomInput";
import Tiptap from "@/components/Editor/Tiptap";
import { workspaceDocumentService } from "@/lib/services";
import { getClientSupabase } from "@/lib/supabase/client";
import { Documents } from "@/lib/supabase/models";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Content } from "@tiptap/react";
import { debounce } from "@/lib/helpers/debounce";

export default function DocumentEditor({ document }: { document: Documents }) {
  const [title, setTitle] = useState(document.title);
  const [content, setContent] = useState(document.content);
  const supabase = getClientSupabase();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const debouncedSave = useMemo(
    () =>
      debounce(async (title, content) => {
        try {
          setIsSaving(true);
          console.log("SAVING DOCUMENT...", title, content);

          const payload = {
            title: title.trim().length === 0 ? "Untitled Document" : title,
            content,
          };
          await workspaceDocumentService.updateDocument(
            supabase,
            document.id,
            payload,
            document.workspace_id,
          );
          console.log("DOCUMENT SAVED");
          router.refresh();
        } catch (err) {
          console.error(err);
          toast.error("Error saving document", { position: "top-center" });
        } finally {
          setIsSaving(false);
        }
      }, 1000),
    [document.id, document.workspace_id, router, supabase],
  );

  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    debouncedSave(newTitle, content);
  };

  const handleContentChange = (newContent: Content) => {
    setContent(newContent);
    debouncedSave(title, newContent);
  };

  return (
    <div>
      <div className="mb-4">
        <CustomInput
          value={title}
          onChange={handleTitleChange}
          placeholder="Untitled Document"
        />
      </div>

      <div className="mb-2 text-sm text-muted-foreground">
        {isSaving ? "Saving..." : "Saved"}
      </div>

      <div className="min-h-[50vh] flex">
        <Tiptap content={content} onChange={handleContentChange} />
      </div>
    </div>
  );
}
