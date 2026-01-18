import { Link, useLocation } from "@tanstack/react-router";
import { FileText, FolderTree, LayoutDashboard, Settings, Users } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const MENU_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/_authenticated/dashboard" }, 
  { label: "Postagens", icon: FileText, to: "/_authenticated/posts" },
  { label: "Categorias", icon: FolderTree, to: "/_authenticated/categories" },
  { label: "Usuários", icon: Users, to: "/_authenticated/users" },
  { label: "Configurações", icon: Settings, to: "/_authenticated/settings" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-slate-200 sticky top-0">     
      <div className="p-6 border-b border-slate-100">
        <h1 className="font-serif text-xl font-bold text-slate-900 tracking-tight">
          Portal Admin
        </h1>
        <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">
          CMS v1.0
        </p>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1">
        {MENU_ITEMS.map((item) => {
          const isActive = location.pathname.startsWith(item.to);

          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors z-10",
                isActive ? "text-blue-700" : "text-slate-600 hover:text-slate-900"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-indicator"
                  className="absolute inset-0 bg-blue-50 border border-blue-100 rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              <item.icon className="size-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-500">
           <p>Precisa de ajuda?</p>
           <a href="#" className="text-blue-600 hover:underline">Ver documentação</a>
        </div>
      </div>
    </aside>
  );
}