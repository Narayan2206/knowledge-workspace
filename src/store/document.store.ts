import { create } from "zustand";
import { Documents } from "@/lib/supabase/models";


interface DocumentState {
  documents: Partial<Pick<Documents, "id" | "title" | "workspace_id" | "updated_at">>[];
  activeDocument: Documents | null;
  isLoadingDocuments: boolean;

  setDocuments: (docs: Partial<Pick<Documents, "id" | "title" | "workspace_id" | "updated_at">>[]) => void;
  setActiveDocument: (doc: Documents | null) => void;
  setIsLoadingDocuments: (loading: boolean) => void;

  updateDocumentTitleLocally: (id: string, title: string) => void;

  resetDocumentState: () => void;
}

const initialState = {
  documents: [],
  activeDocument: null,
  isLoadingDocuments: true,
};
export const useDocumentStore = create<DocumentState>((set) => ({
  ...initialState,

  setDocuments: (documents) => set({ documents }),
  setActiveDocument: (activeDocument) => set({ activeDocument }),
  setIsLoadingDocuments: (isLoadingDocuments) => set({ isLoadingDocuments }),

  updateDocumentTitleLocally: (id, title) =>
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === id ? { ...doc, title } : doc,
      ),
    })),

   resetDocumentState: () => set(initialState),
}));
