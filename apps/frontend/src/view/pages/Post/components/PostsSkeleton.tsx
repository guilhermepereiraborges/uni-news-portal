import { Skeleton } from "@/components/ui/skeleton";

export function PostsSkeleton() {
  return (
    <div className="space-y-8 p-1">
       <div className="flex justify-between items-center mb-8">
            <div className="flex gap-4">
                <Skeleton className="size-12 rounded-2xl" />
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>
            </div>
            <Skeleton className="h-11 w-32 rounded-xl" />
       </div>
       <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6">
            <Skeleton className="h-8 w-full bg-slate-100" />
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center gap-4">
                    <Skeleton className="size-12 rounded-lg" />
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                </div>
            ))}
       </div>
    </div>
  )
}