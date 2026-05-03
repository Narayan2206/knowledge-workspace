import { workspaceDocumentService } from "@/lib/services";
import { getServerSupabase } from "@/lib/supabase/server";

export default async function Document({ params }: { params: Promise<{slug: string, docId: string}> }) {
  const {docId} = await params; 
  const supabase = await getServerSupabase();
  const document = await workspaceDocumentService.getDocumentById(supabase, docId);
  
  return (
    <>
      <p>document</p>
    </>
  );
}
