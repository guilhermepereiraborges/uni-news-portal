import { AnimatePresence, motion } from 'motion/react';
import { KanbanCard } from './KanbanCard';
import type { PostStatus, PostWithRelations } from '@uni-news/types';

export interface StatusConfig {
  label: string;
  color: string;
  bg: string;
  icon: any;
}

interface KanbanColumnProps {
  status: PostStatus;
  posts: Array<PostWithRelations>;
  config: StatusConfig;
  index: number;
}

export function KanbanColumn({ posts, config, index }: KanbanColumnProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="w-85 flex flex-col gap-4 shrink-0"
    >
      <div className={`flex items-center justify-between p-3 rounded-xl border border-transparent ${config.bg} bg-opacity-50`}>
         <div className="flex items-center gap-2">
             <config.icon className={`size-4 ${config.color}`} />
             <span className={`font-semibold text-sm ${config.color}`}>{config.label}</span>
         </div>
         <span className="bg-white/60 px-2 py-0.5 rounded-md text-xs font-bold text-slate-600 shadow-sm">
             {posts.length}
         </span>
      </div>

      <div className="flex flex-col gap-3 pb-4">
         <AnimatePresence mode="popLayout">
             {posts.length === 0 ? (
                 <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl text-slate-300"
                 >
                     <p className="text-sm font-medium">Vazio</p>
                 </motion.div>
             ) : (
                 posts.map((post) => (
                     <KanbanCard key={post.id} post={post} />
                 ))
             )}
         </AnimatePresence>
      </div>
    </motion.div>
  );
}