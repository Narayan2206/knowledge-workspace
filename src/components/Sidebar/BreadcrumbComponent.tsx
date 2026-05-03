import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useWorkspaceStore } from "@/store/workspace.store";
import { Skeleton } from "../ui/skeleton";
import { useWorkspace } from "../workspaces/workspace-provider";

const BreadcrumbComponent = () => {
  // const activeWorkspaceName = useWorkspaceStore((s) => s.activeWorkspace?.name);
  const {workspace: activeWorkspace} = useWorkspace();
  const isLoading = useWorkspaceStore((s) => s.isLoadingActiveWorkspace);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {isLoading ? (
            <Skeleton className="h-4 w-24" />
          ) : (
            <BreadcrumbPage className="line-clamp-1 font-semibold text-foreground">
              {activeWorkspace?.name || "Select Workspace"}
            </BreadcrumbPage>
          )}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
