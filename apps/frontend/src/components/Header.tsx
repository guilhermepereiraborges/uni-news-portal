import { Bell, LayoutDashboard, Menu } from "lucide-react";
import { Link } from "@tanstack/react-router"; 
import { Container } from "@/components/container";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md transition-all">
      <Container className="flex h-20 items-center justify-between">
        <div className="flex flex-col">
          <Link to="/" className="group">
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 tracking-tight group-hover:opacity-80 transition-opacity">
              Portal Universitário
            </h1>
          </Link>
          <p className="hidden md:block text-xs font-medium text-slate-500 tracking-wide uppercase mt-0.5">
            Informação • Inovação • Campus
          </p>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all duration-300">
            <LayoutDashboard className="size-4" />
            <span>Login</span>
          </Link>
          <button className="group relative flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-slate-900 rounded-lg shadow-md hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            <Bell className="size-4 transition-transform group-hover:rotate-12" />
            <span>Inscreva-se</span>            
            <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/20" />
          </button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
            <button className="p-2 text-slate-900 hover:bg-slate-100 rounded-md">
                <Menu className="size-6" />
            </button>
        </div>
      </Container>
    </header>
  );
}