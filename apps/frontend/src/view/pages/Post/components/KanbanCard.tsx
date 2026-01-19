import { Link } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, 
  Calendar, 
  Eye,
  MoreHorizontal,
  PenSquare 
} from 'lucide-react';
import type { PostWithRelations } from '@uni-news/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


interface KanbanCardProps {
  post: PostWithRelations;
}

export function KanbanCard({ post }: KanbanCardProps) {
  return (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="group relative bg-white rounded-2xl p-3 shadow-sm border border-slate-200/60 hover:shadow-md hover:border-pink-100 transition-all cursor-default overflow-hidden"
    >
        <div 
            className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-transparent to-current opacity-10 blur-2xl -mr-10 -mt-10 pointer-events-none"
            style={{ color: post.category.colorCode || '#ccc' }}
        />
        {post.featuredImageUrl && (
            <div className="h-32 w-full rounded-xl bg-slate-100 mb-3 overflow-hidden relative">
                <img src={post.featuredImageUrl} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-60" />
                <Badge 
                    className="absolute bottom-2 left-2 bg-white/90 text-slate-800 hover:bg-white backdrop-blur-sm border-0 text-[10px] h-5 px-1.5 font-normal"
                >
                    {post.category.name}
                </Badge>
            </div>
        )}
        <div className="space-y-2 relative z-10">
            {!post.featuredImageUrl && (
                <div className="flex items-center gap-2 mb-1">
                    <div className="size-2 rounded-full" style={{ backgroundColor: post.category.colorCode || '#ccc' }} />
                    <span className="text-xs text-slate-500 font-medium">{post.category.name}</span>
                </div>
            )}
            <Link 
                to="/posts/new"
                className="block font-bold text-slate-800 leading-snug hover:text-pink-600 transition-colors line-clamp-2"
                title={post.title}
            >
                {post.title}
            </Link>
            <div className="flex items-center justify-between pt-2 border-t border-slate-50 mt-2">
                <div className="flex items-center gap-2">
                    <Avatar className="size-5 border border-white shadow-sm">
                        <AvatarImage src={post.author.avatarUrl || undefined} />
                        <AvatarFallback className="text-[8px] bg-pink-50 text-pink-700">
                            {post.author.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-slate-500 truncate max-w-20">
                        {post.author.name.split(' ')[0]}
                    </span>
                </div>

                <div className="flex items-center gap-3 text-slate-400">
                    <div className="flex items-center gap-1 text-[10px]">
                        <Eye className="size-3" />
                        {new Intl.NumberFormat('pt-BR', { notation: 'compact' }).format(post.currentViewsCount)}
                    </div>
                </div>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="size-7 bg-white/90 backdrop-blur-sm shadow-sm h-7 w-7">
                            <MoreHorizontal className="size-3.5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <PenSquare className="mr-2 size-3.5" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <ArrowUpRight className="mr-2 size-3.5" /> Ver Online
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                 </DropdownMenu>
            </div>
        </div>
        {!post.featuredImageUrl && (
             <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1">
                <Calendar className="size-3" />
                {new Date(post.updatedAt).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })}
             </div>
        )}
    </motion.div>
  )
}