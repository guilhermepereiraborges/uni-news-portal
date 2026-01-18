import { motion } from 'motion/react';
import { GraduationCap, TrendingUp } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { LoginForm } from './components/LoginForm';

export function Login() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-8 bg-white relative">
        <div className="w-full max-w-sm flex flex-col gap-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-2"
            >
                <div className="size-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4 shadow-xl shadow-slate-200">
                    <TrendingUp className="size-6 text-white" />
                </div>
                <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
                    Bem-vindo de volta
                </h1>
                <p className="text-slate-500">
                    Insira suas credenciais para acessar o portal.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <LoginForm />
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center text-sm text-slate-500"
            >
                Não tem uma conta?{' '}
                <Link 
                    to="/" 
                    className="font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                    Criar conta agora
                </Link>
            </motion.div>
        </div>

        <div className="absolute bottom-6 text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Portal Universitário.
        </div>
      </div>

      <div className="hidden lg:flex relative bg-slate-900 items-center justify-center overflow-hidden">        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-blue-900 via-slate-950 to-slate-950 opacity-80" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 mix-blend-overlay" />
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 p-12 text-white max-w-lg"
        >
            <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                <GraduationCap className="size-4" />
                Portal do Aluno v2.0
            </div>
            
            <h2 className="text-5xl font-serif font-bold leading-tight mb-6">
                Conectando mentes,<br />
                <span className="text-blue-500">criando o futuro.</span>
            </h2>
            
            <p className="text-lg text-slate-400 leading-relaxed">
                Acompanhe as últimas notícias, pesquisas e eventos do campus em tempo real. Sua jornada acadêmica começa aqui.
            </p>
            <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
            >
                <div className="flex items-center gap-4 mb-3">
                    <div className="size-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                        <TrendingUp className="size-5" />
                    </div>
                    <div>
                        <p className="font-bold text-sm">Novas Pesquisas Publicadas</p>
                        <p className="text-xs text-slate-400">+12% em relação ao mês passado</p>
                    </div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-green-500 rounded-full" 
                    />
                </div>
            </motion.div>
        </motion.div>
      </div>
    </div>
  );
}