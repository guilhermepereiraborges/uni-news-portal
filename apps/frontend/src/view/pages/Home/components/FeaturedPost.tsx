import { ArrowRight, Calendar, User } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Container } from "@/components/container";

export interface PostProps {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author: {
    name: string;
  };
  slug: string;
  imageUrl?: string;
}

interface FeaturedPostProps {
  post: PostProps;
  className?: string;
}

export function FeaturedPost({ post, className }: FeaturedPostProps) {
  return (
    <Container>
        <article 
        className={cn(
            "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center", 
            className
        )}
        >
            <div className="lg:col-span-7 relative group overflow-hidden rounded-2xl bg-slate-100 aspect-4/3 lg:aspect-auto lg:h-120 shadow-sm">
            
            <span className="absolute top-6 left-6 z-10 bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-bold px-4 py-1.5 uppercase tracking-widest rounded-full shadow-sm">
            Destaque
            </span>

            <Link 
                to="/" 
                className="block w-full h-full"
            >
                {post.imageUrl ? (
                <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" 
                />
                ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <span className="text-sm">Sem imagem disponível</span>
                </div>
                )}
            </Link>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-center gap-6">        
            <div className="flex items-center gap-3 text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                    <span className="bg-blue-50 text-blue-600 p-1.5 rounded-full ring-1 ring-blue-100">
                        <Calendar className="size-3.5" />
                    </span>
                    <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </time>
                </div>
                <span className="text-slate-300">•</span>

                <div className="flex items-center gap-2">
                    <span className="bg-slate-50 text-slate-600 p-1.5 rounded-full ring-1 ring-slate-100">
                        <User className="size-3.5" />
                    </span>
                    <span className="text-slate-700">{post.author.name}</span>
                </div>
            </div>
            <h2 className="group/title">
                <Link 
                    to="/" 
                    className="block text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-[1.1] tracking-tight text-balance hover:text-blue-900 transition-colors duration-300"
                >
                    {post.title}
                </Link>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed line-clamp-3 md:line-clamp-4 font-light">
                {post.excerpt}
            </p>
            <div className="mt-2 pt-6 border-t border-slate-100">
                <Link 
                    to="/" 
                    className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-slate-900 hover:text-blue-700 transition-colors"
                >
                    Ler artigo completo
                    <span className="bg-slate-100 p-2 rounded-full group-hover:bg-blue-100 transition-all duration-300">
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:-rotate-45" />
                    </span>
                </Link>
            </div>

        </div>
        </article>
    </Container>
  );
}