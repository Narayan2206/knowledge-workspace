import { ROLES } from "./constants/roles";

export const PERMISSIONS = {
  canCreateDocuments: (role?: string) =>
    role === ROLES.OWNER || role === ROLES.EDITOR,

  canEditDocuments: (role?: string) =>
    role === ROLES.OWNER || role === ROLES.EDITOR,

  canDeleteDocuments: (role?: string) => role === ROLES.OWNER,

  canManageWorkspace: (role?: string) => role === ROLES.OWNER,
};
