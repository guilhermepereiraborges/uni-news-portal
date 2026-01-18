import { createFileRoute } from '@tanstack/react-router'
import { Activity, Eye, FileText, TrendingUp, Users } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
          Dashboard
        </h2>
        <p className="text-slate-500 mt-1">
          Visão geral do desempenho do portal.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total de Visitas" 
          value="124.5k" 
          change="+12%" 
          icon={Eye} 
        />
        <StatCard 
          title="Novos Usuários" 
          value="8.2k" 
          change="+4.5%" 
          icon={Users} 
        />
        <StatCard 
          title="Artigos Publicados" 
          value="432" 
          change="+18%" 
          icon={FileText} 
        />
        <StatCard 
          title="Engajamento" 
          value="24%" 
          change="-2%" 
          isNegative 
          icon={Activity} 
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-slate-900">Visitas nos últimos 30 dias</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Ver relatório</button>
            </div>
            <div className="h-64 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400">
                <TrendingUp className="size-8 mb-2 opacity-50" />
                <span className="text-sm">Gráfico de área será renderizado aqui</span>
            </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-6">Atividade Recente</h3>
            <div className="space-y-6">
                {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex gap-4">
                        <div className="size-2 w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                        <div>
                            <p className="text-sm text-slate-800 font-medium">Novo artigo publicado</p>
                            <p className="text-xs text-slate-500">"Avanços na tecnologia Quantum..."</p>
                            <span className="text-[10px] text-slate-400">Há 2 horas</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  )
}

function StatCard({ title, value, change, isNegative, icon: Icon }: any) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                    <Icon className="size-5" />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${isNegative ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {change}
                </span>
            </div>
            <div>
                <p className="text-sm text-slate-500 font-medium">{title}</p>
                <h4 className="text-2xl font-bold text-slate-900 mt-1">{value}</h4>
            </div>
        </div>
    )
}