import { useMemo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { 
  AlertCircle, 
  Archive, 
  CheckCircle2, 
  Clock,
  FileText,
  Plus,
  Search
} from 'lucide-react';
import { KanbanColumn  } from './components/KanbanColumn';
import type {StatusConfig} from './components/KanbanColumn';
import type { PostStatus, PostWithRelations } from '@uni-news/types';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePosts } from '@/services/queries/post';

const statusConfig: Record<PostStatus, StatusConfig> = {
  DRAFT: { 
    label: 'Rascunhos', 
    color: 'text-slate-600', 
    bg: 'bg-slate-100',
    icon: FileText 
  },
  PENDING: {
    label: 'Em Revisão',
    color: 'text-amber-600', 
    bg: 'bg-amber-100',
    icon: AlertCircle 
  },
  SCHEDULED: { 
    label: 'Agendados', 
    color: 'text-blue-600', 
    bg: 'bg-blue-100',
    icon: Clock 
  },
  PUBLISHED: { 
    label: 'Publicados', 
    color: 'text-emerald-600', 
    bg: 'bg-emerald-100',
    icon: CheckCircle2 
  },
  ARCHIVED: { 
    label: 'Arquivados', 
    color: 'text-gray-500', 
    bg: 'bg-gray-100',
    icon: Archive 
  }
};

const COLUMNS: Array<PostStatus> = ['DRAFT', 'PENDING', 'SCHEDULED', 'PUBLISHED']; 

export function Posts() {
  const { data: posts } = usePosts();
  const [searchTerm, setSearchTerm] = useState('');

  const groupedPosts = useMemo(() => {
    const filtered = posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groups: Partial<Record<PostStatus, Array<PostWithRelations>>> = {};
    
    COLUMNS.forEach(status => {
      groups[status] = filtered.filter(p => p.status === status);
    });

    return groups;
  }, [posts, searchTerm]);

  return (
    <div className="space-y-8 p-1 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center justify-center size-12 rounded-2xl bg-white border border-slate-100 shadow-sm text-pink-600">
                <FileText className="size-6" />
            </div>
            <div className="space-y-1">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
                        Postagens
                    </h1>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-50 text-pink-700 border border-pink-100">
                        {posts.length}
                    </span>
                </div>
                <p className="text-slate-500 text-sm">
                    Fluxo editorial e gestão de conteúdo.
                </p>
            </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <div className="relative group w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                <Input 
                    placeholder="Buscar postagem..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-11 rounded-xl bg-white border-slate-200 shadow-sm transition-all focus:ring-2 focus:ring-pink-100 focus:border-pink-400 hover:border-slate-300" 
                />
            </div>
            
            <Button 
                asChild 
                className="h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20 cursor-pointer"
            >
                <Link to="/posts/new">
                    <Plus className="mr-2 size-4" />
                    Novo Artigo
                </Link>
            </Button>
        </div>
      </div>
        <div className="flex-1 overflow-x-auto pb-4 no-scrollbar">
            <div className="flex gap-6 min-w-full w-max px-1">
                {COLUMNS.map((status, index) => (
                <KanbanColumn 
                    key={status}
                    status={status}
                    posts={groupedPosts[status] || []}
                    config={statusConfig[status]}
                    index={index}
                />
                ))}
            </div>
        </div>
    </div>
  );
}