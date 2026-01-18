import { TrendingUp } from "lucide-react";

interface ILaunchScreenProps {
	isLoading: boolean;
}

export function LaunchScreen({ isLoading }: ILaunchScreenProps) {
  return (
    isLoading && (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center animate-fade-in-up">
        <div className="mb-6 p-4 bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50">
            <TrendingUp className="size-10 text-blue-500" />
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
          Portal Universitário
        </h1>
        <p className="text-sm font-medium text-blue-700 uppercase tracking-widest animate-pulse-slow">
          Carregando sua experiência...
        </p>
      </div>
      <div className="absolute bottom-12 flex flex-col items-center gap-4 animate-fade-in-up [animation-delay:0.3s] opacity-0 forwards">
        <div className="size-8 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
        <span className="text-xs text-slate-400 font-medium tracking-wide">
            Versão 1.0.0
        </span>
      </div>
    </div>
  )
  );
}