import { TrendingUp } from "lucide-react";
import { Container } from "@/components/container";

export interface BreakingNewsBannerProps {
  message: string;
}

export function BreakingNewsBanner({ message }: BreakingNewsBannerProps) {
  return (
    <div className="w-full bg-slate-900 text-white border-b border-slate-800">    
        <Container>
            <div className="container mx-auto flex items-center py-2 gap-4">        
                <div className="flex items-center gap-2 bg-red-600 px-3 py-1 rounded-sm shadow-sm shrink-0">
                    <TrendingUp className="size-4 text-white" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white whitespace-nowrap">
                        Breaking News
                    </span>
                </div>
                <p className="text-sm font-medium truncate text-slate-100">
                    {message}
                </p>
            </div>
        </Container>  
    </div>
  );
}