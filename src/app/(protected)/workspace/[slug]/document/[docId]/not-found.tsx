import { FileQuestionIcon } from "lucide-react";

export default function DocumentNotFound() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-background">
      <div className="flex size-12 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800/50 mb-4 shadow-sm">
        <FileQuestionIcon className="size-6 text-zinc-400" />
      </div>
      <h3 className="font-semibold text-lg text-foreground">Document Not Found</h3>
      <p className="text-sm text-muted-foreground max-w-sm mt-1">
        The document you are trying to access doesn't exist or you don't have permission to view it.
      </p>
    </div>
  );
}