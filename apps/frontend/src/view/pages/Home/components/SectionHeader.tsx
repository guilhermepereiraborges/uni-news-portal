interface SectionHeaderProps {
  title: string;
}

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="w-full mb-10 flex flex-col gap-4">
       <div className="flex items-center gap-3">
          <span className="block w-2 h-2 bg-blue-600 rounded-full" />
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 tracking-tight">
            {title}
          </h2>
       </div>
       <div className="w-full h-px bg-linear-to-r from-slate-200 via-slate-100 to-transparent" />
    </div>
  );
}