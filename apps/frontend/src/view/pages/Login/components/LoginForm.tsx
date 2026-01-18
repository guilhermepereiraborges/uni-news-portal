import { z } from 'zod';
import { useRouter, useSearch } from '@tanstack/react-router';
import { ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/services/mutations/auth';
import { useAuth } from '@/hooks/useAuth';

const loginSchema = z.object({
  email: z.email('Insira um e-mail válido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

type LoginFormSchema = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();
  
  const search = useSearch({ from: '/login' });
  
  const { mutateAsync, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormSchema) => {
    try {
      const response = await mutateAsync(data);
      
      login(response.accessToken, response.user);
      
      toast.success('Login realizado com sucesso!');

      await router.invalidate();

      if (search.redirect) {
        await router.navigate({ to: search.redirect });
      } else {
        await router.navigate({ to: '/dashboard' });
      }
    } catch (error) {
      toast.error('Credenciais inválidas. Verifique seu e-mail e senha.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-sm">      
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          E-mail
        </label>
        <input
          {...register('email')}
          id="email"
          type="email"
          placeholder="seu@email.edu.br"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400 text-slate-900"
        />
        {errors.email && (
          <span className="text-xs text-red-500 font-medium">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">
            Senha
            </label>
            <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors">
                Esqueceu a senha?
            </a>
        </div>
        
        <div className="relative group">
          <input
            {...register('password')}
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400 text-slate-900 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        </div>
        {errors.password && (
          <span className="text-xs text-red-500 font-medium">
            {errors.password.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20"
      >
        {isPending ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          <>
            Entrar
            <ArrowRight className="size-4" />
          </>
        )}
      </button>
    </form>
  );
}