import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, LogOut, User as UserIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";

export function AdminHeader() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter()
  const navigate = useNavigate()

  const out = () => {
    logout();
    router.invalidate().finally(() => {
      navigate({ to: '/login' });
    });
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40">      
      <div className="flex items-center text-slate-400 text-sm">
        <span className="hover:text-slate-800 cursor-pointer transition-colors">Admin</span>
        <span className="mx-2">/</span>
        <span className="font-medium text-slate-800">Dashboard</span>
      </div>
      <div className="flex items-center gap-6">        
        <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="size-5" />
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        <div className="h-6 w-px bg-slate-200" />

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 hover:bg-slate-50 p-1.5 pr-3 rounded-full transition-colors group"
          >
            <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm ring-2 ring-transparent group-hover:ring-blue-100 transition-all">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            
            <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium text-slate-700 leading-none">
                    {user?.name.split(' ')[0]}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">
                    {user?.role}
                </span>
            </div>
            
            <ChevronDown className={`size-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 origin-top-right"
              >
                <div className="p-4 border-b border-slate-50 bg-slate-50/50">
                    <p className="text-sm font-medium text-slate-900 truncate">{user?.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </div>
                
                <div className="p-1">
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                        <UserIcon className="size-4" />
                        Meu Perfil
                    </button>
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                        <Bell className="size-4" />
                        Notificações
                    </button>
                </div>

                <div className="h-px bg-slate-100 my-1 mx-1" />

                <div className="p-1 pb-2">
                    <button 
                        onClick={out}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                    >
                        <LogOut className="size-4" />
                        Sair
                    </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}