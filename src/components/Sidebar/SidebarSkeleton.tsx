
export default function SidebarSkeleton() {
  return (
    <aside className="w-64 border-r p-4">
      <div className="h-8 w-28 rounded bg-muted animate-pulse mb-6"/>

      {Array.from({ length: 8 }).map((_,i)=>(
        <div
          key={i}
          className="h-6 rounded bg-muted animate-pulse mb-3"
        />
      ))}
    </aside>
  );
}