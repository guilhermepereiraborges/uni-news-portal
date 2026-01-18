import { ArrowRight, Calendar, User } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { PostProps } from "./FeaturedPost";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: PostProps;
  className?: string;
}

export function PostCard({ post, className }: PostCardProps) {
  return (
    <Link 
      to="/" 
      className={cn(
        "group flex flex-col h-full relative overflow-hidden",
        "bg-white rounded-2xl p-6",
        "border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)]",
        "hover:border-blue-100",
        className
      )}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
      <div className="flex items-center gap-3 text-xs font-medium text-slate-400 uppercase tracking-widest mb-4">
        <div className="flex items-center gap-1.5">
          <Calendar className="size-3.5" />
            <time
            className="whitespace-nowrap"
            dateTime={post.publishedAt}
            >
            {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
            </time>
        </div>
        <span className="text-slate-200">•</span>
        <div className="flex items-center gap-1.5">
          <User className="size-3.5" />
          <span className="truncate max-w-30 text-slate-500">{post.author.name}</span>
        </div>
      </div>

      <h3 className="mb-3">
        <span className="font-serif text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-700 transition-colors">
          {post.title}
        </span>
      </h3>

      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6 grow font-light">
        {post.excerpt}
      </p>

      <div className="mt-auto flex items-center text-sm font-bold text-blue-700 uppercase tracking-widest">
        Ler mais
        <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
      
    </Link>
  );
}