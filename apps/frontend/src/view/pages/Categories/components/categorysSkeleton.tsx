import { Skeleton } from "@/components/ui/skeleton";

export function CategoriesSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-4">
        <Skeleton className="h-8 w-full bg-slate-100" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-4">
             <Skeleton className="h-12 w-12 rounded-full" />
             <Skeleton className="h-12 flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}