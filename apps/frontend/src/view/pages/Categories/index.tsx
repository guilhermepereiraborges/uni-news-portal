import { useState } from 'react';
import { 
  Calendar, 
  Check, 
  Copy, 
  FolderOpen, 
  Hash, 
  Layers, 
  MoreHorizontal,
  Search,
  Sparkles
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { toast } from 'sonner';
import { CreateCategoryDialog } from './components/CreateCategoryDialog';
import { useCategories } from '@/services/queries/category';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Categories() {
  const { data: categories } = useCategories();
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopySlug = (slug: string) => {
    navigator.clipboard.writeText(slug);
    setCopiedSlug(slug);
    toast.success("Slug copiado!");
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div className="space-y-8 p-1">      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">    
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center justify-center size-12 rounded-2xl bg-white border border-slate-100 shadow-sm text-blue-600">
              <Layers className="size-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
                  Categorias
              </h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                  {filteredCategories.length}
              </span>
            </div>
            <p className="text-slate-500 text-sm flex items-center gap-1">
              Gerencie suas seções
              <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-300 mx-1" />
              <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
                  <Sparkles className="size-3" />
                  Visualização em Cards
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="relative group w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="size-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <Input 
                placeholder="Buscar categoria..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 rounded-xl bg-white border-slate-200 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 hover:border-slate-300" 
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <kbd className="hidden sm:inline-flex items-center h-5 rounded border border-slate-200 bg-slate-50 px-1.5 font-mono text-[10px] font-medium text-slate-500">
                  ⌘K
              </kbd>
            </div>
          </div>
          <div className="hidden sm:block w-px h-8 bg-slate-200 mx-1" />
          <div className="shrink-0">
              <CreateCategoryDialog />
          </div>
        </div>
    </div>
      <motion.div 
        layout 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode='popLayout'>
          {filteredCategories.length === 0 ? (
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               className="col-span-full h-64 flex flex-col items-center justify-center text-slate-400 gap-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50"
             >
                <div className="size-16 rounded-full bg-white shadow-sm flex items-center justify-center">
                   <FolderOpen className="size-8 opacity-30" />
                </div>
                <p>Nenhuma categoria encontrada.</p>
             </motion.div>
          ) : (
            filteredCategories.map((category) => (
              <motion.div
                layout
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                transition={{ 
                    duration: 0.3, 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 25 
                }}
                whileHover={{ 
                    y: -5, 
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" 
                }}
                className="group relative flex flex-col justify-between h-48 rounded-2xl border border-slate-100 bg-white/60 backdrop-blur-xl p-5 shadow-sm transition-colors hover:border-slate-300/50 overflow-hidden"
              >
                <div 
                   className="absolute -right-6 -top-6 size-32 rounded-full opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
                   style={{ backgroundColor: category.colorCode || '#cbd5e1' }}
                />                
                <div className="flex justify-between items-start z-10">
                    <div 
                        className="size-12 rounded-xl flex items-center justify-center shadow-inner border border-white/50"
                        style={{ 
                            backgroundColor: category.colorCode 
                                ? `${category.colorCode}20` 
                                : '#f1f5f9',
                            color: category.colorCode || '#64748b'
                        }}
                    >
                        <Hash className="size-6" />
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8 -mr-2 text-slate-400 hover:text-slate-700">
                                <MoreHorizontal className="size-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Excluir</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="space-y-1 z-10">
                    <h3 className="font-bold text-lg text-slate-900 truncate" title={category.name}>
                        {category.name}
                    </h3>                    
                    <div 
                        className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer hover:text-blue-600 transition-colors w-fit"
                        onClick={() => handleCopySlug(category.slug)}
                    >
                        <span className="truncate max-w-37.5">/{category.slug}</span>
                        {copiedSlug === category.slug ? (
                             <Check className="size-3 text-green-500" />
                        ) : (
                             <Copy className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                    </div>
                </div>
                <div className="pt-4 border-t border-slate-100/60 flex items-center gap-2 text-xs text-slate-400 z-10 mt-auto">
                    <Calendar className="size-3.5" />
                    <span>
                        {new Date(category.createdAt).toLocaleDateString('pt-BR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        })}
                    </span>
                </div>
                <div 
                    className="absolute bottom-0 left-0 h-1 w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ backgroundColor: category.colorCode || '#cbd5e1' }}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}