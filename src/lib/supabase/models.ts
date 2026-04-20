import { Content } from "@tiptap/react";
export interface Users {
    id: string;
    name: string;
    email: string;
    avatar: null | string;
    created_at: string;
}

export interface Workspaces {
    id: string;
    name: string;
    slug: string;
    created_by: string;
    created_at: string;
}

export interface WorkspaceMembers {
    id: string;
    workspace_id: string;
    user_id: string;
    joined_at: string;
    role: 'owner' | 'admin' | 'editor' | 'viewer';
}

export interface Documents {
    id: string;
    workspace_id: string;
    title: string;
    content: Content;
    created_by: string;
    updated_at: string;
    created_at: string;
    is_archived: boolean;
}

export interface DocumentVersions {
    id: string;
    document_id: string;
    content: string;
    created_by: string;
    created_at: string;
}

