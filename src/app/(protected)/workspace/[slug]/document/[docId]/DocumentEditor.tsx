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
import { Loader2Icon } from "lucide-react";
import { useWorkspace } from "@/components/workspaces/workspace-provider";
import { PERMISSIONS } from "@/lib/permissions";

export default function DocumentEditor({ document }: { document: Documents }) {
  const [title, setTitle] = useState(document.title);
  const [content, setContent] = useState(document.content);
  const supabase = getClientSupabase();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const {role: memberRole} = useWorkspace();
  const canEdit = PERMISSIONS.canEditDocuments(memberRole);

  const debouncedSave = useMemo(
    () =>
      debounce(async (title, content) => {
        if (!navigator.onLine) {
          return;
        }
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
        } catch (err:any) {
          console.error(err);
          toast.error(err?.message || "Error saving document", { position: "top-center" });
        } finally {
          setIsSaving(false);
        }
      }, 1000),
    [document.id, document.workspace_id, router],
  );

  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+S or Cmd+S
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();

        toast.info("Changes are saved automatically!", {
          position: "top-center",
          duration: 2000,
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      toast.success("Back online", { position: "top-center" });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error("You're offline", { position: "top-center" });
    };

    window.addEventListener("online", handleOnline);

    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);

      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    debouncedSave(newTitle, content);
  };

  const handleContentChange = (newContent: Content) => {
    setContent(newContent);
    debouncedSave(title, newContent);
  };

  let saveStatus;

  if (!isOnline) {
    saveStatus = <p className="flex items-center gap-2">Offline</p>;
  } else if (isSaving) {
    saveStatus = (
      <p className="flex items-center gap-2">
        <Loader2Icon className="size-4 animate-spin" />
        Saving...
      </p>
    );
  } else {
    saveStatus = "Saved";
  }

  return (
    <div>
      <div className="mb-4">
        <CustomInput
          value={title}
          onChange={handleTitleChange}
          placeholder="Untitled Document"
          disabled={!canEdit}
        />
      </div>

      <div className="mb-2 text-sm text-muted-foreground">
        {saveStatus}
      </div>

      <div className="min-h-[50vh] flex">
        <Tiptap content={content} onChange={handleContentChange} editable={canEdit}/>
      </div>
    </div>
  );
}
